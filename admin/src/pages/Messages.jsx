import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import AttachFileIcon from '@mui/icons-material/AttachFile';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize Socket.io
  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.on('new_conversation', (conversation) => {
      setConversations((prev) => [conversation, ...prev]);
    });

    return () => newSocket.close();
  }, []);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5001/api/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Join conversation room and fetch messages
  useEffect(() => {
    if (socket && activeConversationId) {
      socket.emit('join_conversation', activeConversationId);

      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await axios.get(`http://localhost:5001/api/messages/conversations/${activeConversationId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMessages(response.data);
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      const handleReceiveMessage = (message) => {
        if (message.conversation_id === activeConversationId) {
          setMessages((prev) => [...prev, message]);
          scrollToBottom();
        }
        // Update last message in conversation list
        setConversations(prev => prev.map(conv =>
          conv.conversation_id === message.conversation_id
            ? { ...conv, last_message: message.message, updated_at: new Date() }
            : conv
        ).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
      };

      socket.on('receive_message', handleReceiveMessage);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
      };
    }
  }, [socket, activeConversationId]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:5001/api/uploads/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.url) {
        await sendMessageWithAttachment(response.data.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const formData = new FormData();
          formData.append('image', file);

          try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.post('http://localhost:5001/api/uploads/images', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            });

            if (response.data.url) {
              await sendMessageWithAttachment(response.data.url);
            }
          } catch (error) {
            console.error("Error uploading pasted image:", error);
            alert("Failed to upload pasted image");
          }
        }
        e.preventDefault();
        return;
      }
    }
  };

  const sendMessageWithAttachment = async (imageUrl) => {
    if (!activeConversationId) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`http://localhost:5001/api/messages/conversations/${activeConversationId}`, {
        message: "Sent an image",
        attachment_url: imageUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      scrollToBottom();
    } catch (error) {
      console.error("Error sending image message:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversationId) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`http://localhost:5001/api/messages/conversations/${activeConversationId}`, {
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeConversation = conversations.find(c => c.conversation_id === activeConversationId);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 100px)', bgcolor: '#f5f5f5', p: 3 }}>
      <Paper sx={{ width: 360, display: 'flex', flexDirection: 'column', mr: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Tin nhắn</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm cuộc hội thoại..."
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Divider />
        <List sx={{ flex: 1, overflow: 'auto' }}>
          {filteredConversations.map((conv) => (
            <React.Fragment key={conv.conversation_id}>
              <ListItem
                button
                selected={activeConversationId === conv.conversation_id}
                onClick={() => setActiveConversationId(conv.conversation_id)}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#1976d2' }}>
                    {conv.customer_name?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2" noWrap>
                        {conv.customer_name}
                      </Typography>
                      {conv.unread_count > 0 && (
                        <Badge badgeContent={conv.unread_count} color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {conv.last_message}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeConversationId ? (
          <>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                {activeConversation?.customer_name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1">{activeConversation?.customer_name}</Typography>
                <Typography variant="caption" color="text.secondary">Đang hoạt động</Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#fafafa' }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.sender_type === 'admin' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: msg.sender_type === 'admin' ? '#1976d2' : '#fff',
                      color: msg.sender_type === 'admin' ? '#fff' : 'text.primary',
                      borderRadius: 2
                    }}
                  >
                    {msg.attachment_url && (
                      <Box
                        component="img"
                        src={`http://localhost:5001${msg.attachment_url}`}
                        alt="Attachment"
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          borderRadius: 1,
                          mb: 1,
                          display: 'block'
                        }}
                      />
                    )}
                    <Typography variant="body1">{msg.message}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        opacity: 0.7,
                        textAlign: 'right'
                      }}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <IconButton color="primary" onClick={() => fileInputRef.current?.click()} sx={{ mr: 1 }}>
                <AttachFileIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onPaste={handlePaste}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                size="small"
                sx={{ mr: 1 }}
              />
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Chọn một cuộc hội thoại để bắt đầu
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Messages;
