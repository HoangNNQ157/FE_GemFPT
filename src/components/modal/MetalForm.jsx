import { Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";

const MetalForm = ({ visible, onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(initialData);
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
            title="Edit Metal"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="metal_form">
                <Form.List name="typeOfMetals">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "metalType"]}
                                        fieldKey={[field.fieldKey, "metalType"]}
                                        label={`Metal Type ${index + 1}`}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the metal type!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            disabled={
                                                fields.length <=
                                                initialData.typeOfMetals.length
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "sellPrice"]}
                                        fieldKey={[field.fieldKey, "sellPrice"]}
                                        label={`Sell Price ${index + 1}`}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the sell price!",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            min={0}
                                            formatter={(value) =>
                                                `${value}`.replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                            }
                                            parser={(value) =>
                                                value.replace(/\$\s?|(,*)/g, "")
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "buyPrice"]}
                                        fieldKey={[field.fieldKey, "buyPrice"]}
                                        label={`Buy Price ${index + 1}`}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the buy price!",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            min={0}
                                            formatter={(value) =>
                                                `${value}`.replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                            }
                                            parser={(value) =>
                                                value.replace(/\$\s?|(,*)/g, "")
                                            }
                                        />
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
                                    Add Metal Type
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default MetalForm;
