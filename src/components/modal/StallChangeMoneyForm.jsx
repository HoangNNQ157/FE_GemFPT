import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getAlllStalls } from "../../service/manager";

const { Option } = Select;

const StallChangeMoneyForm = ({ visible, onCancel, onSave, stallId }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [visible]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onSave({ ...values, stallsSellId: stallId });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            title="Stall Change Money"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="stall_change_money_form">
                <Form.Item
                    name="typeChange"
                    label="Type Change"
                    rules={[
                        {
                            required: true,
                            message: "Please select a type!",
                        },
                    ]}
                >
                    <Select placeholder="Select type">
                        <Option value="ADD">ADD</Option>
                        <Option value="WITHDRAW">WITHDRAW</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="stallsSellId" label="Stall">
                    <Input
                        defaultValue={stallId}
                        value={stallId}
                        disabled={true}
                    />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the amount!",
                        },
                    ]}
                >
                    <Input type="number" placeholder="Enter amount" />
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

export default StallChangeMoneyForm;
