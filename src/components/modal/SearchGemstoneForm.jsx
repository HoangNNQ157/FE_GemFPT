import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";

const SearchGemstoneForm = ({ visible, onCancel, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible]);

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
            title="Search Gemstone"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="search_gemstone_form">
                <Form.Item
                    name="color"
                    label="Color"
                    rules={[
                        {
                            required: true,
                            message: "Please input the color!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="clarity"
                    label="Clarity"
                    rules={[
                        {
                            required: true,
                            message: "Please input the clarity!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="cut"
                    label="Cut"
                    rules={[
                        {
                            required: true,
                            message: "Please input the cut!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="carat"
                    label="Carat"
                    rules={[
                        {
                            required: true,
                            message: "Please input the carat!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SearchGemstoneForm;
