import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import DashboardLayout from '../components/DashboardLayout';
import { authService } from '../services/authService';

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (values.newPassword !== values.confirmNewPassword) {
            message.error("New passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await authService.changePassword(values.oldPassword, values.newPassword);
            message.success(response.message);
            form.resetFields();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex-1 h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-10 text-gray-900">Change Password</h2>

                <div className="max-w-2xl mx-auto w-full mt-10">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                    >
                        <Form.Item
                            label={<span className="font-medium text-gray-700"><span className="text-red-500 mr-1">*</span>Old Password</span>}
                            name="oldPassword"
                            rules={[{ required: true, message: 'Please input your old password!' }]}
                        >
                            <Input.Password
                                placeholder=""
                                size="large"
                                className="rounded-md"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-medium text-gray-700"><span className="text-red-500 mr-1">*</span>New Password</span>}
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password
                                placeholder=""
                                size="large"
                                className="rounded-md"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-medium text-gray-700"><span className="text-red-500 mr-1">*</span>Confirm New Password</span>}
                            name="confirmNewPassword"
                            rules={[{ required: true, message: 'Please confirm your new password!' }]}
                        >
                            <Input.Password
                                placeholder=""
                                size="large"
                                className="rounded-md"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <div className="flex justify-end mt-8">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="bg-blue-500 hover:bg-blue-600 border-none text-white font-medium h-10 px-8 rounded text-base"
                                style={{ backgroundColor: '#2b7fff', borderColor: '#2b7fff', color: '#fff' }}
                            >
                                Confirm
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChangePassword;
