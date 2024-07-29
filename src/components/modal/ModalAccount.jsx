import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import React, { useEffect } from "react";

const { Option } = Select;

const ModalAccount = ({ visible, onCancel, onSave, initialData, type }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && type === "create") {
            form.resetFields();
        } else {
            form.setFieldsValue(initialData);
        }
    }, [type, visible]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onSave(values)
                    .then(() => {
                        
                    })
                    .catch((error) => {
                        message.error(error.response?.data || "An error occurred. Please try again.");
                    });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            title={type === "update" ? "Edit Account" : "Add Account"}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="account_form">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Please input the email!",
                            type: "email",
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
                            message: "Please input the phone number!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {type === "update" ? (
                    <>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a role!",
                                },
                            ]}
                        >
                            <Select>
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="STAFF">STAFF</Option>
                                <Option value="MANAGER">MANAGER</Option>
                            </Select>
                        </Form.Item>
                    </>
                ) : (
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input the password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default ModalAccount;
