import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import api from '../services/api';

const PayPalModal = ({ isOpen, onClose, order, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    // Replace with your actual Client ID
    // For sandbox testing, use a sandbox client ID.
    // For production, use your live client ID.
    const initialOptions = {
        "client-id": "AZYeBBCsUijp6-j8WQvt8vNBADbhyvbM-ZGMl2WMvp0y6lAENfylMvF1Ag57EsPI9f0K4AtI0c6ndy7V", // Placeholder: User needs to replace this
        currency: "USD",
        intent: "capture",
    };

    const handleApprove = async (data, actions) => {
        setIsProcessing(true);
        try {
            const details = await actions.order.capture();
            console.log("Payment successful:", details);
            message.success("Payment successful!");

            // Call backend to update order status
            // Assuming endpoint: POST /api/orders/:id/pay
            // You might need to adjust this based on your actual backend implementation
            try {
                await api.post(`/orders/${order.id}/pay`, {
                    paymentId: details.id,
                    payerId: details.payer.payer_id,
                    status: details.status,
                    amount: details.purchase_units[0].amount.value
                });
                if (onSuccess) onSuccess();
            } catch (backendError) {
                console.error("Backend update failed:", backendError);
                message.warning("Payment successful at PayPal, but failed to update order status on server. Please contact support.");
            }

            onClose();
        } catch (error) {
            console.error("Payment failed:", error);
            message.error("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleError = (err) => {
        console.error("PayPal Error:", err);
        message.error("An error occurred with PayPal.");
    };

    return (
        <Modal
            title={`Pay for Order #${order?.order_number}`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <div className="p-4">
                <p className="mb-4 text-gray-600">
                    Total Amount: <span className="font-bold text-lg">${order?.amount}</span>
                </p>

                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: order?.amount?.toString() || "0.00",
                                        },
                                        description: `Payment for Order #${order?.order_number}`
                                    },
                                ],
                            });
                        }}
                        onApprove={handleApprove}
                        onError={handleError}
                    />
                </PayPalScriptProvider>
            </div>
        </Modal>
    );
};

export default PayPalModal;
