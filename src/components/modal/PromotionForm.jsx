import { Button, Form, Input, Modal, DatePicker } from "antd";
import React, { useEffect } from "react";

const PromotionForm = ({ visible, onCancel, onSave, dataProduct }) => {
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
                <Form.List name="barcode">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <Form.Item
                                        {...field}
                                        name={[field.name]}
                                        fieldKey={[field.fieldKey]}
                                        label={`ProductName - Barcode ${
                                            index + 1
                                        }`}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the barcode!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => remove(field.name)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    Add Barcode
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default PromotionForm;
