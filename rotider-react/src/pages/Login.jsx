import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import logoWhite from '../assets/logo-white.png';

const CustomInput = ({ value, onChange, placeholder, type, icon }) => (
    <div className="flex gap-x-0 input-group">
        <div className="input-icon">
            {icon}
        </div>
        <input
            placeholder={placeholder}
            className="flex-1"
            type={type}
            value={value}
            onChange={onChange}
        />
    </div>
);

const CustomPasswordInput = ({ value, onChange, placeholder }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="flex gap-x-0 input-group relative">
            <div className="input-icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" className="svg-inline--fa fa-key fa-fw fa-lg w-5 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"></path>
                </svg>
            </div>
            <input
                placeholder={placeholder || "Password"}
                className="flex-1"
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
            />
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon={visible ? "eye" : "eye-slash"}
                className="svg-inline--fa fa-eye fa-fw absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 select-none w-5 h-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                onClick={() => setVisible(!visible)}
            >
                {visible ? (
                    <path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                ) : (
                    <path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path>
                )}
            </svg>
        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // Simulate login logic
        localStorage.setItem('user', JSON.stringify({ email: values.email }));
        navigate('/create-order');
    };

    return (
        <div className="auth-container flex items-center justify-center">
            <div className="w-full md:w-[600px] text-center">
                <img width="210px" alt="Logo" className="m-auto mb-8" src={logoWhite} />
                <div className="bg-white rounded-none md:rounded-[32px] p-6 md:p-12 shadow-lg text-left">
                    <h1 className="text-[32px] font-semibold text-center mb-8">Login Account</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <CustomInput
                                placeholder="Email"
                                type="email"
                                icon={
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-fw fa-lg w-5 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path>
                                    </svg>
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <CustomPasswordInput />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot float-right text-[#fcb900] hover:text-[#ff9d00]" href="https://orders.ZOOZOO.com/forgot-password">
                                Forgot password?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button w-full rounded-full h-12 text-lg font-semibold bg-[#fcb900] hover:!bg-[#ff9d00] border-none">
                                Log in
                            </Button>
                        </Form.Item>
                        <div className="text-center">
                            Don't have an account? <a href="https://orders.ZOOZOO.com/register" className="text-[#fcb900] hover:text-[#ff9d00]">Sign up here</a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
