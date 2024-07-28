import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { requestDiscount } from "../../service/discount";
import { toast } from "react-toastify";

const { Option } = Select;

const RequestModal = ({
    isModalVisible,
    setIsModalVisible,
    customerName,
    customerPhone,
}) => {
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                const data = await requestDiscount({
                    customerName,
                    customerPhone,
                    discountReason: values.description,
                    requestedDiscount: values.discount,
                    expirationTime: values.expirationTime,
                });
                if (data.data) {
                    toast.success("Create request discount success!");
                }
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Modal
                title="DISCOUNT REQUEST"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="cancel"
                        danger
                        type="default"
                        onClick={handleCancel}
                    >
                        CANCEL
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        SUBMIT
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="discount"
                        label="Discount:"
                        rules={[
                            {
                                required: true,
                                message: "Please input the discount!",
                            },
                        ]}
                    >
                        <Input placeholder="Discount" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description:"
                        rules={[
                            {
                                required: true,
                                message: "Please input the description!",
                            },
                        ]}
                    >
                        <Input placeholder="Description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RequestModal;
