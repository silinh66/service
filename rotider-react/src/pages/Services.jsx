import React, { useState } from "react";
import { Button } from "antd";
import DashboardLayout from "../components/DashboardLayout";

const Services = () => {
    const [activeTab, setActiveTab] = useState("VIDEO EDITING");

    const allServices = [


        {
            id: 3,
            title: "Standard",
            subtitle: "VIDEO EDITING",
            price: "$39.00",
            description: "Instagram reels, Youtube shorts and Tiktoks Video duration: 60s.",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
            tag: "STANDARD PACKAGE EDITING SERVICE",
            category: "VIDEO EDITING",
        },
        {
            id: 4,
            title: "Personal Website",
            subtitle: "WEBSITE DESIGN",
            price: "$80 - $150",
            description: "Professional photo retouching and enhancement.",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
            tag: "PHOTO RETOUCHING SERVICE",
            category: "WEBSITE DESIGN",
        },
        {
            id: 5,
            title: "Advanced",
            subtitle: "VIRTUAL SERVICE",
            price: "$55.00",
            description: "Professional Video Editing for Viral YouTube Content, Instagram reels, Youtube shorts and Tiktoks - Video duration: 60s.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
            tag: "VIDEO EDITING SERVICE",
            category: "VIDEO EDITING",
        },
        {
            id: 1,
            title: "High-End",
            subtitle: "VIDEO EDITING",
            price: "$250.00",
            description: "Ads for tik tok instagram meta youtube - Video duration: 60s",
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop", // Cinematic/Mountain
            tag: "HIGH-END PACKAGE EDITING SERVICE",
            category: "VIDEO EDITING",
        },
        {
            id: 6,
            title: "Business Website",
            subtitle: "WEBSITE DESIGN",
            price: "$150 - $650",
            description: "Professional photo retouching and enhancement.",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
            tag: "WEBSITE DESIGN SERVICE",
            category: "WEBSITE DESIGN",
        },
    ];

    const tabs = ["VIDEO EDITING", "WEBSITE DESIGN"];

    const filteredServices = activeTab === "VIDEO EDITING"
        ? allServices.filter(service => service.category === "VIDEO EDITING")
        : allServices.filter(service => service.category === "WEBSITE DESIGN");

    return (
        <DashboardLayout>
            <div className="flex-1 h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-4">Our Services</h2>

                {/* Tabs */}
                <div className="flex flex-wrap gap-8 mt-0" style={{ marginBottom: "20px" }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-bold tracking-wide transition-all uppercase px-6 py-3 rounded-full ${activeTab === tab
                                ? "text-white shadow-md"
                                : "text-gray-600 hover:text-black hover:bg-gray-100"
                                }`}
                            style={{
                                backgroundColor: activeTab === tab ? "#4081f7ff" : "transparent",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden group">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4 text-center">
                                    <div>
                                        <h3 className="text-white font-bold text-xl uppercase drop-shadow-md leading-tight">{service.tag}</h3>
                                        <span className="inline-block mt-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Stable Skills - Great Results</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">{service.subtitle}</p>
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">{service.price}</span>
                                </div>

                                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                                    {service.description}
                                </p>
                                <Button
                                    type="primary"
                                    className="w-full bg-blue-500 hover:bg-blue-600 border-none text-white font-bold h-10 rounded-md uppercase tracking-wide"
                                >
                                    Order now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Services;
