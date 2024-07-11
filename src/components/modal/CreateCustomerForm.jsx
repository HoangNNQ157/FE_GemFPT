import { Button, Form, Input, Modal } from "antd";
import React from "react";

const CreateCustomerForm = ({ visible, onCancel, onSave }) => {
    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onSave(values);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            title="Create New Customer"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="stall_form">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name!!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input the phone!",
                        },
                        {
                            pattern: /^\d{10}$/,
                            message: "Phone number must be 10 digits!",
                        },
                        {
                            validator: (_, value) => {
                                const phoneRegex = /^((\+|00)\d{1,3})?\d{10}$/; // Adjust regex for international formats if needed
                                if (value && !phoneRegex.test(value)) {
                                    return Promise.reject(
                                        "Invalid phone number format!"
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => form.resetFields()}
                    >
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateCustomerForm;
