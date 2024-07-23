import { Button, Form, Input, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiPhone, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";
import { getAllAccout } from "../../service/account";
import {
    getRevenueMothCashiersById,
    getRevenueYearCashiersById,
} from "../../service/revenue";
import { formatVND } from "../../utils/funUtils";
import "./resuableFormStyle.css";

const { Option } = Select;

const RevevenueCashierForm = ({
    isModalVisible,
    setIsModalVisible,
    type = 1,
}) => {
    const [form] = Form.useForm();
    const [cashierData, setcashierData] = useState();
    const [allAcount, setAllAcount] = useState();

    const handleCancel = () => {
        setIsModalVisible({
            id: type,
            status: false,
        });
        form.resetFields();
        setcashierData();
    };

    const handleSearch = async () => {
        try {
            const values = await form.validateFields();
            if (type === 1) {
                const res = await getRevenueMothCashiersById({
                    cashierId: values.cashierId,
                    yearMonth: values.yearMonth,
                });
                setcashierData(res.data);
                toast.success("Search Stall successfully");
            } else {
                const res = await getRevenueYearCashiersById({
                    cashierId: values.cashierId,
                    year: values.year,
                });
                setcashierData(res.data);
                toast.success("Search Stall successfully");
            }
        } catch (error) {
            toast.error("Stall not found or validation failed");
        }
    };

    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const res = await getAllAccout();
                setAllAcount(res.data);
            } catch (error) {
                toast.error("Failed to fetch stalls");
            }
        };

        fetchStalls();
    }, []);
    console.log(cashierData);
    return (
        <div>
            <Modal
                title="CASHIER"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Space style={{ marginTop: "12px" }} align="end">
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
                    </Space>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="cashierId"
                        label="Cashier"
                        rules={[
                            {
                                required: true,
                                message: "Please select a cashier!",
                            },
                        ]}
                    >
                        <Select placeholder="Select cashier">
                            {allAcount?.map((account) => (
                                <Option key={account.name} value={account.name}>
                                    {account.email}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {type === 1 ? (
                        <Form.Item
                            name="yearMonth"
                            label="Year and Month"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the year and month!",
                                },
                            ]}
                        >
                            <Input placeholder="YYYY-MM" />
                        </Form.Item>
                    ) : (
                        <Form.Item
                            name="year"
                            label="Year"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the year!",
                                },
                            ]}
                        >
                            <Input placeholder="YYYY" />
                        </Form.Item>
                    )}
                </Form>
                {cashierData && (
                    <div className="customer__info">
                        <div className="customer__wrapper">
                            <div>
                                <BiUser color="black" /> ORDERCOUNT:{" "}
                                {cashierData.orderCount}
                            </div>
                            <div>
                                <BiCalendar color="black" /> TOTAL REVENUE:{" "}
                                {formatVND(cashierData.totalRevenue)}
                            </div>
                        </div>
                        <div className="customer__wrapper">
                            <div>
                                <BiPhone color="black" />
                                YEARMONTH: {cashierData.yearMonth}
                            </div>
                            <div>CASHIER: {cashierData.cashier}</div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RevevenueCashierForm;
