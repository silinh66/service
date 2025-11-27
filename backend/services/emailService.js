import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"ZOOZOOSTUDIO" <no-reply@zoozoostudio.com>',
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export const sendOrderCreatedEmails = async (order) => {
    const { customer_email, customer_name, order_number, order_name, created_at, category, instructions, amount } = order;

    // Format date
    const date = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' }); // Or use created_at if available and formatted

    // 1. Order Confirmation Email
    const confirmationSubject = `Order ID ${order_number} Has Been Successfully Created`;
    const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Dear <a href="mailto:${customer_email}" style="color: #0056b3;">${customer_email}</a>,</p>
            
            <p>Thank you for placing your order with ZOOZOOSTUDIO! We're pleased to inform you that your order has been successfully created and is now being processed. Below are the details of your order for your reference:</p>
            
            <ul style="list-style-type: disc; margin-left: 20px;">
                <li><strong>Order Name:</strong> ${order_name}</li>
                <li><strong>Order Code:</strong> ${order_number}</li>
                <li><strong>Order Date:</strong> ${date}</li>
                <li><strong>Order Type:</strong> ${category}</li>
                <li><strong>Instructions:</strong> ${instructions || 'N/A'}</li>
            </ul>
            
            <p>We truly appreciate the opportunity to serve you and are committed to delivering excellent results.</p>
            
            <p>If you have any questions, need to make changes to your order, or require further assistance, please don't hesitate to contact us at <a href="mailto:zoozoostudio.com@gmail.com" style="color: #0056b3;">zoozoostudio.com@gmail.com</a>. We're here to help!</p>
            
            <p>Thank you once again for choosing ZOOZOOSTUDIO.</p>
            
            <p>Kind Regards,</p>
            
            <p><strong>ZOOZOOSTUDIO</strong></p>
        </div>
    `;

    // 2. Payment Request Email
    const paymentSubject = `ZOOZOOSTUDIO has sent a request to pay via Paypal. Please, check your Paypal account`;
    const paymentHtml = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Dear <a href="mailto:${customer_email}" style="color: #0056b3;">${customer_email}</a>,</p>
            
            <p>ZOOZOOSTUDIO has sent you a payment request via PayPal. Please check your PayPal account to proceed with the payment.</p>
            
            <p><a href="${process.env.NODE_ENV === 'production' ? 'https://zoozoostudio.com' : (process.env.FRONTEND_URL || 'http://localhost:5173')}/my-order?openPaymentFor=${order.id}" style="color: #0056b3;">Check your Paypal Invoice here</a></p>
            
            <p><strong>Here are the details of your order for your reference:</strong></p>
            
            <ul style="list-style-type: disc; margin-left: 20px;">
                <li><strong>Order Name:</strong> ${order_name}</li>
                <li><strong>Order Code:</strong> ${order_number}</li>
                <li><strong>Order Date:</strong> ${date}</li>
                <li><strong>Order Type:</strong> ${category}</li>
            </ul>
            
            <p>If you have any questions or encounter any issues, contact us at <a href="mailto:zoozoostudio.com@gmail.com" style="color: #0056b3;">zoozoostudio.com@gmail.com</a>.</p>
            
            <p>Thank you for choosing ZOOZOOSTUDIO. We truly appreciate your support!</p>
            
            <p>Kind Regards,</p>
            
            <p><strong>ZOOZOOSTUDIO</strong></p>
        </div>
    `;

    try {
        await sendEmail(customer_email, confirmationSubject, confirmationHtml);
        await sendEmail(customer_email, paymentSubject, paymentHtml);
        console.log(`Emails sent successfully for order ${order_number}`);
    } catch (error) {
        console.error(`Failed to send emails for order ${order_number}:`, error);
        // Don't throw error to prevent blocking the response, just log it
    }
};

export const sendPaymentSuccessEmail = async (order) => {
    const { customer_email, order_number, order_name, amount } = order;
    const date = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });

    const subject = `Payment Received - Order #${order_number}`;
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>Dear <a href="mailto:${customer_email}" style="color: #0056b3;">${customer_email}</a>,</p>
            
            <p>We have successfully received your payment for Order <strong>#${order_number}</strong>.</p>
            
            <p><strong>Payment Details:</strong></p>
            <ul style="list-style-type: disc; margin-left: 20px;">
                <li><strong>Order Name:</strong> ${order_name}</li>
                <li><strong>Amount Paid:</strong> $${amount}</li>
                <li><strong>Payment Date:</strong> ${date}</li>
                <li><strong>Status:</strong> <span style="color: green; font-weight: bold;">Paid</span></li>
            </ul>
            
            <p>We will now proceed with your order according to the timeline. You can track the progress in your "My Order" section.</p>
            
            <p>If you have any questions, please contact us at <a href="mailto:zoozoostudio.com@gmail.com" style="color: #0056b3;">zoozoostudio.com@gmail.com</a>.</p>
            
            <p>Thank you for your business!</p>
            
            <p>Kind Regards,</p>
            
            <p><strong>ZOOZOOSTUDIO</strong></p>
        </div>
    `;

    try {
        await sendEmail(customer_email, subject, html);
        console.log(`Payment success email sent for order ${order_number}`);
    } catch (error) {
        console.error(`Failed to send payment success email for order ${order_number}:`, error);
    }
};

export const sendPaymentNotificationToAdmin = async (order) => {
    const { order_number, order_name, amount, customer_email } = order;
    const date = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
    const adminEmail = process.env.ADMIN_EMAIL || "zoozoostudio.com@gmail.com"; // Fallback or env

    const subject = `[Admin] Payment Received - Order #${order_number}`;
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p><strong>Payment Received</strong></p>
            <ul style="list-style-type: disc; margin-left: 20px;">
                <li><strong>Order Code:</strong> ${order_number}</li>
                <li><strong>Order Name:</strong> ${order_name}</li>
                <li><strong>Customer:</strong> ${customer_email}</li>
                <li><strong>Amount:</strong> $${amount}</li>
                <li><strong>Date:</strong> ${date}</li>
                <li><strong>Status:</strong> <span style="color: green; font-weight: bold;">Paid</span></li>
            </ul>
            <p>Please check the Admin Panel for more details.</p>
        </div>
    `;

    try {
        await sendEmail(adminEmail, subject, html);
        console.log(`Admin payment notification sent for order ${order_number}`);
    } catch (error) {
        console.error(`Failed to send admin notification for order ${order_number}:`, error);
    }
};
