import { Button, Form, Input, Modal, DatePicker, Select } from "antd";
import React, { useEffect } from "react";

const PromotionFormUpdate = ({ visible, onCancel, onSave, initialData }) => {
    console.log(initialData);
    const [form] = Form.useForm();
    useEffect(() => {
        if (!visible) {
            form.resetFields();
        } else {
            form.setFieldsValue({
                programName: initialData.programName,
                discountRate: initialData.discountRate,
                description: initialData.description,
                pointsCondition: initialData.pointsCondition,
            });
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
            title={"Update Promotion"}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
        >
            <Form form={form} layout="vertical" name="promotion_form">
                <Form.Item
                    name="programName"
                    label="Program Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the program name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="discountRate"
                    label="Discount Rate"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            message: "Please input the discount rate!",
                        },
                        {
                            validator: (_, value) =>
                                value > 100
                                    ? Promise.reject(
                                          "Discount rate must not exceed 100"
                                      )
                                    : Promise.resolve(),
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                {/* <Form.Item name="category" label="Category">
                    <Input
                        disabled={true}
                        value={"RING"}
                        defaultValue={"RING"}
                    />
                </Form.Item> */}
                <Form.Item name="applicableProducts" label="Applicable Products">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="endTime"
                    label="End Time"
                    rules={[
                        {
                            required: true,
                            message: "Please select the end time!",
                        },
                    ]}
                >
                    <DatePicker showTime />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PromotionFormUpdate;
