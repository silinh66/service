import React, { useState } from "react";
import { Input, Button, Select, Table } from "antd";
import DashboardLayout from "../components/DashboardLayout";

const { Option } = Select;

const Payments = () => {
    const [payments, setPayments] = useState([
        {
            key: "1",
            id: "1",
            order: "Linh",
            orderId: "4345",
            type: "Order",
            total: "$1.50",
            status: "Paid",
            createdAt: "27-09-2025 19:40",
        },
    ]);

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Order",
            dataIndex: "order",
            key: "order",
        },
        {
            title: "Order ID",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <a href="#" className="text-blue-500 hover:underline">
                    View invoice
                </a>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="flex-1 h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-6">Payment List</h2>

                {/* Filter Bar */}
                <div className="flex items-center gap-x-4 mb-8">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-3xl">
                        <Select
                            defaultValue="Order ID"
                            className="w-32 border-none"
                            bordered={false}
                            size="large"
                        >
                            <Option value="Order ID">Order ID</Option>
                        </Select>
                        <div className="w-[1px] h-6 bg-gray-300"></div>
                        <Input
                            placeholder="Search order"
                            bordered={false}
                            className="flex-1"
                            size="large"
                        />
                        <Button
                            type="text"
                            icon={
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="magnifying-glass"
                                    className="svg-inline--fa fa-magnifying-glass w-4 h-4 text-gray-400"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                    ></path>
                                </svg>
                            }
                            size="large"
                        />
                    </div>
                    <Button
                        className="bg-yellow-400 hover:bg-yellow-500 border-none text-white font-medium h-10 px-6"
                    >
                        Refresh
                    </Button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                    <Table
                        dataSource={payments}
                        columns={columns}
                        pagination={{
                            position: ['bottomRight'],
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: false,
                            total: 1,
                            itemRender: (page, type, originalElement) => {
                                if (type === 'prev') {
                                    return <a className="ant-pagination-item-link">‹</a>;
                                }
                                if (type === 'next') {
                                    return <a className="ant-pagination-item-link">›</a>;
                                }
                                return originalElement;
                            }
                        }}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Payments;
