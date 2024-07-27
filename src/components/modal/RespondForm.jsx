import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

const RespondForm = ({ visible, onCancel, onSave, idResponse }) => {
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
            title={"Custom Form Modal"}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
        >
            <Form form={form} layout="vertical" name="custom_form_modal">
                <Form.Item
                    name="managerResponse"
                    label="Manager Response"
                    rules={[
                        {
                            required: true,
                            message: "Please input the manager response!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="approved"
                    label="Approved"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select whether it's approved or not!",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value={true}>Agree</Select.Option>
                        <Select.Option value={false}>Disagree</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="discountRequestId" label="Discount Request ID">
                    <Input
                        defaultValue={idResponse}
                        value={idResponse}
                        disabled
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RespondForm;
