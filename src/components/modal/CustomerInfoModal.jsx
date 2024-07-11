import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Flex } from "antd";
import {
    UserOutlined,
    PhoneOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import "./resuableFormStyle.css";
import { BiCalendar, BiPhone, BiUser } from "react-icons/bi";
import { getCustomerByPhone } from "../../service/customer";
const CustomerInfoModal = ({
    isModalVisible,
    setIsModalVisible,
    setCustomerData,
    customerData,
}) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSearch = () => {
        form.validateFields()
            .then((values) => {
                if (values.phone) {
                    getCustomerByPhone({ phone: values.phone })
                        .then((res) => res.data)
                        .then((data) => setCustomerData(data));
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    return (
        <div>
            <Modal
                title="CUSTOMER"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Flex gap={6} justify="end" style={{ marginTop: "12px" }}>
                        <Button
                            key="cancel"
                            danger
                            type="default"
                            onClick={handleCancel}
                        >
                            CANCEL
                        </Button>
                        <Button
                            key="search"
                            type="primary"
                            onClick={handleSearch}
                        >
                            SEARCH
                        </Button>
                    </Flex>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="phone"
                        label={
                            <span>
                                <PhoneOutlined /> PHONE:
                            </span>
                        }
                    >
                        <Input placeholder="Phone Number" type="number" />
                    </Form.Item>
                </Form>
                {customerData?.id ? (
                    <div className="customer__info">
                        <div className="customer__wrapper">
                            <div>
                                <BiUser color="black" /> CUSTOMER NAME:{" "}
                                {customerData.name}
                            </div>
                            <div>
                                <BiPhone color="black" /> PHONE:{" "}
                                {customerData.phone}
                            </div>
                            <div>RANK: {customerData.rankCus}</div>
                        </div>
                        <div className="customer__wrapper">
                            <div>
                                <BiCalendar color="black" /> CREATE DATE:{" "}
                                {new Date(
                                    customerData.createTime
                                ).toLocaleString("vi-VN")}
                            </div>
                            <div>LOYALTY POINTS: {customerData.points}</div>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
};

export default CustomerInfoModal;
