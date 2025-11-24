import React from "react";
import { Button } from "antd";
import DashboardLayout from "../components/DashboardLayout";

const MyAccount = () => {
    return (
        <DashboardLayout>
            <div className="flex-1 h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-10">Profile</h2>

                <div className="flex gap-x-16 items-start">
                    {/* Profile Image Placeholder */}
                    <div className="w-80 h-80 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm flex-shrink-0">
                        <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                            <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                            </svg>
                            <div className="absolute top-2 right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 pt-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-12">silinh66@gmail.com - Platinum</h3>

                        <div className="grid grid-cols-3 gap-12 mb-12">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Order</p>
                                <p className="text-2xl font-medium">100</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Accumulated</p>
                                <p className="text-2xl font-medium">112,893 $</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Pending payment</p>
                                <p className="text-2xl font-medium">9,999 $</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="font-bold text-gray-900 mb-4">Contact information</h4>
                            <div className="flex items-center gap-x-2">
                                <span className="text-gray-400">Email :</span>
                                <span className="font-medium">silinh66@gmail.com</span>
                            </div>
                        </div>

                        <Button className="bg-yellow-400 hover:bg-yellow-500 border-none text-white font-medium h-10 px-8 rounded">
                            Edit profile
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyAccount;
