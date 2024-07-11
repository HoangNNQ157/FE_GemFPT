import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";

const SearchGemstoneForm = ({ visible, onCancel, onSave }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
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
            <Form form={form} layout="vertical" name="metal_form">
                <Form.Item
                    name="color"
                    label="Color"
                    rules={[
                        {
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
                            message: "Please input the cut!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>{" "}
                <Form.Item
                    name="carat"
                    label="Carat"
                    rules={[
                        {
                            message: "Please input the carat!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SearchGemstoneForm;
