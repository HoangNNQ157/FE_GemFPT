import React, { useState, useEffect } from "react";
import {
    Button,
    DatePicker,
    Form,
    Modal,
    Select,
    Switch,
    Flex,
    Input,
} from "antd";
import { getAllAccout } from "../../service/account";
const { Option } = Select;

const CreateStallForm = ({ visible, onCancel, onSave }) => {
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
            title="Create New Stall"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="stall_form">
                <Form.Item
                    name="stallsSellName"
                    label="Stall Name"
                    rules={[
                        {
                            required: true,
                            message: "Please select a stall name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Flex gap={20}>
                    <Form.Item
                        style={{ flex: 1 }}
                        name="stallsSellCreateTime"
                        label="Create Time"
                        rules={[
                            {
                                required: true,
                                message: "Please select a create time!",
                            },
                        ]}
                    >
                        <DatePicker showTime style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="stallsSellStatus"
                        label="Status"
                        valuePropName="checked"
                    >
                        <Switch defaultChecked={false} />
                    </Form.Item>
                </Flex>
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

export default CreateStallForm;
