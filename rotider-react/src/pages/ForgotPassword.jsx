import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, message } from 'antd';
import { authService } from '../services/authService';
import './Login.css'; // Reuse Login styles

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authService.forgotPassword(values.email);
            message.success(response.message);
        } catch (error) {
            message.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-overlay"></div>
            <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
                alt="Background"
                className="login-bg-image"
            />
            <div className="login-content-wrapper">
                <span className="login-logo" style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>ZOOZOOSTUDIO</span>

                <div className="login-card">
                    <h1 className="login-title">Forgot Password</h1>
                    <p style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <Form
                        name="forgot_password_form"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <div className="custom-input-group">
                                <div className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                                    </svg>
                                </div>
                                <CustomFormInput placeholder="Email" type="email" />
                            </div>
                        </Form.Item>

                        <button type="submit" className="login-submit-btn" disabled={loading}>
                            {loading ? 'SENDING...' : 'SEND RESET LINK'}
                        </button>

                        <div className="login-links" style={{ justifyContent: 'center', marginTop: 20 }}>
                            <Link to="/login" className="login-link-text">Back to Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

// Helper component (copied from Login.jsx)
const CustomFormInput = ({ value, onChange, placeholder, type }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="custom-input"
    />
);

export default ForgotPassword;
