import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Space } from "antd";
import { BiCalendar, BiUser } from "react-icons/bi";
import "./resuableFormStyle.css";
import {
    getRevenueMonthStallCashierById,
    getRevenueYearStallCashierById,
} from "../../service/revenue";
import { getAlllStalls } from "../../service/manager";
import { getAllAccout } from "../../service/account";
import { toast } from "react-toastify";
import { formatVND } from "../../utils/funUtils";

const { Option } = Select;

const RevevenueStallCashierForm = ({
    isModalVisible,
    setIsModalVisible,
    type = 1,
}) => {
    const [form] = Form.useForm();
    const [stallData, setStallData] = useState();
    const [allStall, setAllStall] = useState();
    const [allAccount, setAllAccount] = useState();

    const handleCancel = () => {
        setIsModalVisible({
            id: type,
            status: false,
        });
        form.resetFields();
        setStallData();
    };

    const handleSearch = async () => {
        try {
            const values = await form.validateFields();
            if (type === 1) {
                const res = await getRevenueMonthStallCashierById({
                    stallId: values.stallId,
                    cashier: values.cashier,
                    yearMonth: values.yearMonth,
                });
                setStallData(res.data);
                toast.success("Search Stall successfully");
            } else {
                const res = await getRevenueYearStallCashierById({
                    stallId: values.stallId,
                    cashier: values.cashier,
                    year: values.year,
                });
                setStallData(res.data);
                toast.success("Search Stall successfully");
            }
        } catch (error) {
            toast.error("Stall not found or validation failed");
        }
    };

    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const res = await getAlllStalls();
                setAllStall(res.data);
            } catch (error) {
                toast.error("Failed to fetch stalls");
            }
        };

        const fetchAccounts = async () => {
            try {
                const res = await getAllAccout();
                setAllAccount(res.data);
            } catch (error) {
                toast.error("Failed to fetch accounts");
            }
        };

        fetchStalls();
        fetchAccounts();
    }, []);

    return (
        <div>
            <Modal
                title="STALL"
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
                        name="stallId"
                        label="Stall"
                        rules={[
                            {
                                required: true,
                                message: "Please select a stall!",
                            },
                        ]}
                    >
                        <Select placeholder="Select Stall">
                            {allStall?.map((stall) => (
                                <Option
                                    key={stall.stallsSellId}
                                    value={stall.stallsSellId}
                                >
                                    {stall.stallsSellName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="cashier"
                        label="Cashier"
                        rules={[
                            {
                                required: true,
                                message: "Please select a cashier!",
                            },
                        ]}
                    >
                        <Select placeholder="Select cashier">
                            {allAccount?.map((account) => (
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
                {stallData?.stallId && (
                    <div className="customer__info">
                        <div className="customer__wrapper">
                            <div>
                                <BiUser color="black" /> STALL ID:{" "}
                                {stallData.stallId}
                            </div>
                            <div>
                                <BiUser color="black" /> CASHIER:{" "}
                                {stallData.cashier}
                            </div>
                            {/* <div>
                                <BiCalendar color="black" /> YEAR & MONTH:{" "}
                                {stallData.yearMonth}
                            </div> */}
                        </div>
                        <div className="customer__wrapper">
                            <div>
                                TOTAL REVENUE:{" "}
                                {formatVND(stallData.totalRevenue)}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RevevenueStallCashierForm;
