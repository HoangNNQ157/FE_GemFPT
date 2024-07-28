// src/components/modal/ModalGoogleRegister.jsx

import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { loginWithGoogleRegister } from "../../service/auth";
import { toast } from "react-toastify";

const ModalGoogleRegister = ({ visible, onCancel, onSave }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await loginWithGoogleRegister({ token: values.token });
            if (response.data) {
                toast.success("Google account registered successfully");
                onSave();
            }
        } catch (error) {
            toast.error("An error occurred during Google account registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            title="Register Account Google"
            onCancel={onCancel}
            footer={null}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="token"
                    rules={[{ required: true, message: "Please enter the token" }]}
                >
                    <Input placeholder="Enter Google token" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalGoogleRegister;
