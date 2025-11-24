import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { io } from 'socket.io-client';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const newSocket = io('http://localhost:5001');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket && activeConversation) {
            socket.emit('join_conversation', activeConversation.conversation_id);

            socket.on('receive_message', (message) => {
                setMessages((prev) => [...prev, message]);
                scrollToBottom();
            });

            return () => {
                socket.off('receive_message');
            };
        }
    }, [socket, activeConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch conversations on mount
    useEffect(() => {
        const fetchConversations = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`http://localhost:5001/api/messages/customer/${user.email}`);
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setConversations(data);
                        // Automatically select the most recent conversation
                        const mostRecent = data[0];
                        setActiveConversation(mostRecent);

                        // Fetch messages for the active conversation
                        const msgResponse = await fetch(`http://localhost:5001/api/messages/public/${mostRecent.conversation_id}`);
                        const msgData = await msgResponse.json();
                        setMessages(msgData);
                    }
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                }
            }
        };

        fetchConversations();
    }, []);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        // If no active conversation, create one
        if (!activeConversation) {
            try {
                console.log("Creating conversation...");
                const response = await fetch('http://localhost:5001/api/messages/conversations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customer_name: user?.full_name || user?.email || 'Guest',
                        customer_email: user?.email || 'guest@example.com',
                        message: newMessage
                    })
                });
                const data = await response.json();
                console.log("Create conversation response:", data);

                if (response.ok) {
                    const newConv = { conversation_id: data.conversationId };
                    setActiveConversation(newConv);
                    setConversations(prev => [newConv, ...prev]); // Add to list
                    setMessages([{
                        id: Date.now(),
                        message: newMessage,
                        sender_type: 'customer',
                        created_at: new Date()
                    }]);
                    setNewMessage('');
                } else {
                    console.error("Failed to create conversation:", data);
                }
            } catch (error) {
                console.error("Error creating conversation:", error);
            }
        } else {
            // Send to existing conversation
            try {
                const response = await fetch(`http://localhost:5001/api/messages/conversations/${activeConversation.conversation_id}/customer`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: newMessage,
                        customer_name: user?.full_name || user?.email || 'Guest'
                    })
                });

                if (response.ok) {
                    setNewMessage('');
                    scrollToBottom();
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-100px)] bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <button
                            className="w-full bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4"
                            onClick={() => setActiveConversation(null)}
                        >
                            START NEW CONVERSATION
                        </button>

                        {conversations.length === 0 && (
                            <p className="text-gray-500 text-center mt-4">No conversations.</p>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-gray-50">
                    {activeConversation ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender_type === 'customer' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            style={{ backgroundColor: msg.sender_type === 'customer' ? '#007bff' : '#fff', color: msg.sender_type === 'customer' ? '#fff' : '#000' }}
                                            className={`max-w-[70%] p-3 rounded-lg ${msg.sender_type === 'customer'
                                                ? 'bg-blue-600 text-black rounded-br-none'
                                                : 'bg-blue text-gray-800 border border-gray-200 rounded-bl-none'
                                                }`}
                                        >
                                            <p>{msg.message}</p>
                                            <span className={`text-xs block mt-1 ${msg.sender_type === 'customer' ? 'text-blue-100' : 'text-gray-400'
                                                }`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="p-4 bg-white border-t border-gray-200">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="bg-blue-600 text-black px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        SEND
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">How can we help you?</h3>
                            <div className="w-full max-w-md space-y-4">
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Click Start Conversation to begin"
                                    className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="w-full bg-blue-600 text-black py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
                                >
                                    START CONVERSATION
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Files Sidebar (Optional based on design) */}
                <div className="w-64 bg-white border-l border-gray-200 p-4 hidden lg:block">
                    <h3 className="font-bold text-gray-800 mb-4">Files</h3>
                    <p className="text-gray-500 text-sm">No files yet.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Messages;
