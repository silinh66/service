import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Dropdown, Menu } from "antd";
import logoDark from "../assets/logo-dark.svg";
import DashboardLayout from "../components/DashboardLayout";

const { TextArea } = Input;
const { Option } = Select;

const CreateOrder = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Logout",
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <DashboardLayout>
      <div className="flex-1">
        <h2 className="ant-typography text-2xl font-semibold mb-6">
          Create Order
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          initialValues={{
            customerName: user?.email || "silinh66@gmail.com",
          }}
        >
          <Form.Item
            label="Customer name"
            name="customerName"
            rules={[{ required: true }]}
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="Order name"
            name="name"
            rules={[{ required: true, message: "Please enter order name" }]}
          >
            <Input placeholder="Enter order name" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="cat1">Category 1</Option>
              <Option value="cat2">Category 2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Product URL"
            name="url"
            rules={[{ required: true, message: "Please enter product URL" }]}
          >
            <Input placeholder="Enter product URL" />
          </Form.Item>

          <Form.Item label="Sample" name="sample">
            <Input placeholder="Sample" />
          </Form.Item>

          <Form.Item label="Instructions" name="instructions">
            <TextArea rows={4} placeholder="Please provide instructions" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Create Order
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default CreateOrder;
