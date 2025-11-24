
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const MyOrder = () => {
    const [orders, setOrders] = useState([
        {
            id: "4345",
            submitted: "27-09-2025 19:40",
            status: [
                { label: "Deposit", completed: true },
                { label: "Expert", completed: true },
                { label: "Editing", completed: true },
                { label: "Review", completed: true },
                { label: "Payment Pending", completed: true },
                { label: "Complete", completed: true },
            ],
            total: "$1.50",
            name: "Linh",
            type: "Twilight - $1.50",
            variation: "N/A",
            description: "Creating a simulated sunset effect on daytime photos.",
            productUrl: "https://share.google/5iGnduq5uRIJ9JAbB",
            instructions: "Create image effect",
            subtotal: "$1.50"
        },
    ]);

    return (
        <DashboardLayout>
            <div className="flex-1 h-full flex flex-col font-sans text-gray-800 p-6">
                <h2 className="text-3xl font-bold mb-8 text-black">Order List</h2>

                {/* Filter Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white w-full max-w-4xl shadow-sm h-10">
                        <div className="relative h-full border-r border-gray-300">
                            <select
                                className="appearance-none bg-transparent border-none pl-4 pr-10 py-2 text-gray-700 font-medium focus:outline-none cursor-pointer h-full text-sm"
                                defaultValue="Order ID"
                            >
                                <option value="Order ID">Order ID</option>
                                <option value="Order Name">Order Name</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <span className="text-[10px]">▼</span>
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Search order"
                            className="flex-1 px-4 py-2 text-gray-700 border-none focus:outline-none h-full text-sm"
                        />

                        <button className="px-4 text-gray-400 hover:text-gray-600 h-full flex items-center justify-center">
                            <SearchOutlined className="text-lg" />
                        </button>
                    </div>

                    <button
                        className="ml-4 border border-gray-300 bg-white text-gray-700 hover:text-black hover:border-gray-400 rounded-md flex items-center gap-2 font-medium h-10 px-4 text-sm transition-colors shadow-sm"
                    >
                        <ReloadOutlined />
                        <span>REFRESH</span>
                    </button>
                </div>

                {/* Order List Header */}
                <div className="grid grid-cols-12 gap-4 text-gray-500 font-medium mb-4 px-8 text-sm">
                    <div className="col-span-2">Order ID</div>
                    <div className="col-span-3">Order Submitted</div>
                    <div className="col-span-5">Status</div>
                    <div className="col-span-2">Total</div>
                </div>

                {/* Order Items */}
                <div className="flex flex-col gap-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                            {/* Top Row */}
                            <div className="grid grid-cols-12 gap-4 mb-8">
                                <div className="col-span-2">
                                    <a href="#" className="text-blue-500 font-medium hover:underline text-base">
                                        {order.id}
                                    </a>
                                </div>
                                <div className="col-span-3 font-medium text-gray-900 text-base">{order.submitted}</div>
                                <div className="col-span-5">
                                    <div className="flex flex-col gap-y-3">
                                        {order.status.map((step, index) => (
                                            <div key={index} className="flex items-center gap-x-3">
                                                <div className="relative flex items-center justify-center w-4 h-4">
                                                    {step.completed ? (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-green-500"></div>
                                                    ) : (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-gray-300"></div>
                                                    )}
                                                </div>
                                                <span className={`text-sm font-medium ${step.completed ? "text-green-600" : "text-gray-400"}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 font-bold text-lg text-gray-900">{order.total}</div>
                            </div>

                            {/* Details Section */}
                            <div className="grid grid-cols-12 gap-8 pt-6 border-t border-gray-100">
                                {/* Left Column Details */}
                                <div className="col-span-8 space-y-5">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-3 text-gray-500 font-medium text-sm">Order Name</div>
                                        <div className="col-span-9 font-medium text-gray-900 text-sm">{order.name}</div>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-3 text-gray-500 font-medium text-sm">Order Type</div>
                                        <div className="col-span-9 font-medium text-gray-900 text-sm">{order.type}</div>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-3 text-gray-500 font-medium text-sm">Variation</div>
                                        <div className="col-span-9 font-medium text-gray-900 text-sm">{order.variation}</div>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-3 text-gray-500 font-medium text-sm">Description</div>
                                        <div className="col-span-9 text-gray-800 leading-relaxed text-sm">{order.description}</div>
                                    </div>
                                </div>

                                {/* Right Column Price & Button */}
                                <div className="col-span-4 flex flex-col items-start pl-8 border-l border-gray-100">
                                    <div className="font-bold text-base mb-6 text-gray-900">Twilight: {order.subtotal}</div>
                                    <button
                                        className="bg-[#FFC107] hover:bg-[#FFB300] text-black font-bold w-full py-2.5 rounded shadow-sm uppercase tracking-wide text-xs transition-colors"
                                    >
                                        View invoices
                                    </button>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h4 className="text-gray-500 font-medium mb-4 text-sm">Additional Information</h4>
                                <div className="space-y-3">
                                    <div className="flex gap-x-2 text-sm">
                                        <span className="text-gray-400 font-medium min-w-[100px]">Product URL :</span>
                                        <a href={order.productUrl} className="text-blue-500 hover:underline font-medium truncate">{order.productUrl}</a>
                                    </div>
                                    <div className="flex gap-x-2 text-sm">
                                        <span className="text-gray-400 font-medium min-w-[100px]">Instructions :</span>
                                        <span className="text-gray-900 font-medium">{order.instructions}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyOrder;
