import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { SearchOutlined, ReloadOutlined, DownOutlined } from "@ant-design/icons";
import { Table, Tag, Button, Input, Steps, Badge } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import PayPalModal from "../components/PayPalModal";

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPayPalModalOpen, setIsPayPalModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            const searchParams = new URLSearchParams(location.search);
            const openPaymentFor = searchParams.get("openPaymentFor");

            if (openPaymentFor) {
                const orderToPay = orders.find(o => o.id === parseInt(openPaymentFor));
                if (orderToPay) {
                    handleViewInvoice(orderToPay);
                    // Optional: Clear the query param so it doesn't reopen on refresh if we wanted, 
                    // but keeping it might be fine for now. 
                    // To clear: navigate(location.pathname, { replace: true });
                }
            }
        }
    }, [orders, location.search]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewInvoice = (order) => {
        setSelectedOrder(order);
        setIsPayPalModalOpen(true);
    };

    const handlePaymentSuccess = () => {
        fetchOrders(); // Refresh orders to show updated status
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusStepCurrent = (status) => {
        const steps = ["Deposit", "Expert", "Editing", "Review", "Payment Pending", "Complete"];
        const index = steps.findIndex(s => s.toLowerCase() === status?.toLowerCase());
        return index === -1 ? 0 : index;
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'order_number',
            key: 'order_number',
            width: 100,
            fixed: 'left',
            render: (text) => <a className="text-blue-500 font-medium">{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 150,
        },
        {
            title: 'Main Service',
            dataIndex: 'main_service',
            key: 'main_service',
            width: 180,
        },
        {
            title: 'Details',
            dataIndex: 'service_details',
            key: 'service_details',
            width: 250,
            ellipsis: true,
        },
        {
            title: 'Product URL',
            dataIndex: 'product_url',
            key: 'product_url',
            width: 200,
            ellipsis: true,
            render: (text) => <a href={text} target="_blank" rel="noreferrer" className="text-blue-500">{text}</a>,
        },
        {
            title: 'Sample',
            dataIndex: 'sample',
            key: 'sample',
            width: 100,
            render: (text) => text ? <a href={text} target="_blank" rel="noreferrer" className="text-blue-500">View</a> : 'N/A',
        },
        {
            title: 'Instructions',
            dataIndex: 'instructions',
            key: 'instructions',
            width: 250,
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            render: (amount) => <span className="font-bold text-gray-900">${amount}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                let color = 'default';
                if (status === 'Complete') color = 'success';
                if (status === 'Review') color = 'warning';
                if (status === 'Editing') color = 'processing';
                return <Tag color={color}>{status || 'Deposit'}</Tag>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Button
                    size="small"
                    className="bg-[#4081f7ff] hover:bg-[#FFB300] text-white border-none font-bold uppercase text-[10px]"
                    onClick={() => handleViewInvoice(record)}
                >
                    View Invoice
                </Button>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        const currentStep = getStatusStepCurrent(record.status);

        return (
            <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Details */}
                    <div>
                        <h4 className="font-bold text-gray-800 mb-4">Order Details</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex">
                                <span className="text-gray-500 w-32">Main Service:</span>
                                <span className="font-medium">{record.main_service}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-500 w-32">Description:</span>
                                <span className="text-gray-800 flex-1">{record.service_details}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-500 w-32">Product URL:</span>
                                <a href={record.product_url} target="_blank" rel="noreferrer" className="text-blue-500 truncate flex-1">{record.product_url}</a>
                            </div>
                            <div className="flex">
                                <span className="text-gray-500 w-32">Instructions:</span>
                                <span className="text-gray-800 flex-1">{record.instructions}</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-bold text-gray-800 mb-2">Order Progress</h4>
                            <Steps
                                size="small"
                                current={currentStep}
                                items={[
                                    { title: 'Deposit' },
                                    { title: 'Expert' },
                                    { title: 'Editing' },
                                    { title: 'Review' },
                                    { title: 'Payment' },
                                    { title: 'Complete' },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Right Column: Revisions & Downloads */}
                    <div>
                        <div className="mb-6">
                            <h4 className="font-bold text-gray-800 mb-2">Download Product</h4>
                            <a href="https://www.dropbox.com/..." className="text-blue-500 text-sm break-all">
                                https://www.dropbox.com/scl/fo/8kOu8smovyndkx5peyrx7/ALVcDD8MyNU-Z-HD0GzUjSs
                            </a>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-2">Revisions (10 available)</h4>
                            <div className="flex gap-2 mb-4">
                                <Input.TextArea placeholder="Note revision..." rows={2} className="text-sm" />
                            </div>
                            <Button type="primary" className="bg-[#FFC107] hover:bg-[#FFB300] border-none text-black font-medium">
                                Submit Revision
                            </Button>

                            <div className="mt-4 p-4 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400">
                                <span className="text-xs">No revision submitted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <div className="flex-1 h-full flex flex-col font-sans text-gray-800 p-8 bg-white">
                <h2 className="text-[28px] font-bold mb-6 text-black">Order List</h2>

                {/* Filter Bar */}
                <div className="flex items-center justify-between mb-8 w-full">
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white w-full shadow-sm h-[38px]">
                        <div className="relative h-full border-r border-gray-200 min-w-[110px]">
                            <select
                                className="appearance-none bg-transparent border-none pl-4 pr-8 py-2 text-gray-600 font-medium focus:outline-none cursor-pointer h-full text-[13px] w-full"
                                defaultValue="Order ID"
                            >
                                <option value="Order ID">Order ID</option>
                                <option value="Order Name">Order Name</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                <DownOutlined className="text-[10px]" />
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Search order"
                            className="flex-1 px-4 py-2 text-gray-600 border-none focus:outline-none h-full text-[13px] placeholder-gray-300"
                        />

                        <button className="px-4 text-gray-400 hover:text-gray-600 h-full flex items-center justify-center border-l border-gray-200">
                            <SearchOutlined className="text-lg" />
                        </button>
                    </div>

                    <button
                        onClick={fetchOrders}
                        className="ml-4 border border-gray-200 bg-white text-gray-600 hover:text-black hover:border-gray-300 rounded-md flex items-center gap-2 font-medium h-[38px] px-4 text-[13px] transition-all shadow-sm whitespace-nowrap"
                    >
                        <ReloadOutlined />
                        <span>Refresh</span>
                    </button>
                </div>

                {/* Ant Design Table */}
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="id"
                    expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: orders.length > 0 ? [orders[0].id] : [],
                    }}
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                    scroll={{ x: 1500 }}
                    className="shadow-sm border border-gray-100 rounded-lg"
                />

                <PayPalModal
                    isOpen={isPayPalModalOpen}
                    onClose={() => setIsPayPalModalOpen(false)}
                    order={selectedOrder}
                    onSuccess={handlePaymentSuccess}
                />
            </div>
        </DashboardLayout>
    );
};

export default MyOrder;
