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
import { toast } from "react-toastify";
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
                        .then((res) => {
                            if (res.data) {
                                setCustomerData(res.data);
                                toast.success("Customer found");
                            } else {
                                toast.error("Customer not found");
                            }
                        })
                        .catch((error) => {
                            toast.error("Customer not found");
                        });
                }
            })
            .catch((info) => {
                toast.error("Please enter a valid phone number");
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
                            OK
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
                                <BiUser color="black" /> Name:{" "}
                                {customerData.name}
                            </div>
                            <div>
                                <BiPhone color="black" /> Phone:{" "}
                                {customerData.phone}
                            </div>
                            <div>Rank: {customerData.rankCus}</div>
                        </div>
                        <div className="customer__wrapper">
                            {/* <div>
                                <BiCalendar color="black" /> CREATE DATE:{" "}
                                {new Date(
                                    customerData.createTime
                                ).toLocaleString("vi-VN")}
                            </div> */}
                            <div>Loyalty Point: {Math.floor(customerData.points)}</div>


                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
};

export default CustomerInfoModal;
