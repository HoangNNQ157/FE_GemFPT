import { Button, Form, Input, Modal, DatePicker, Select } from "antd";
import React, { useEffect } from "react";

const OPTIONCATE = ["RING", "BRACELET", "NECKLACE", "EARRINGS", "ANKLETS","GEMSTONE","METAL"];
const PromotionCreateCategoryForm = ({ visible, onCancel, onSave }) => {
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
            title={"Add Promotion"}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
        >
            <Form form={form} layout="vertical" name="promotion_form">
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                            message: "Please input the category!",
                        },
                    ]}
                >
                    <Select>
                        {OPTIONCATE.map((cate, index) => (
                            <Select.Option key={index} value={cate}>
                                {cate}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="programName"
                    label="Discount Program"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Discount Program!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="discountRate"
                    label="Discount"
                    rules={[
                        {
                            required: true,
                            type: "string",
                            message: "Please input the discount!",
                        },
                        {
                            validator: (_, value) =>
                                value > 100
                                    ? Promise.reject(
                                          "Discount must not exceed 100"
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

export default PromotionCreateCategoryForm;
