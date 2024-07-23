import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Space } from "antd";
import {
    UserOutlined,
    PhoneOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import "./resuableFormStyle.css";
import { BiCalendar, BiPhone, BiUser } from "react-icons/bi";
import { getCustomerByPhone } from "../../service/customer";
import {
    getRevenueMothStallById,
    getRevenueYearStallById,
} from "../../service/revenue";
import { getAlllStalls } from "../../service/manager";
import { toast } from "react-toastify";
import { formatVND } from "../../utils/funUtils";

const { Option } = Select;

const RevevenueStallForm = ({
    isModalVisible,
    setIsModalVisible,
    type = 1,
}) => {
    const [form] = Form.useForm();
    const [stallData, setStallData] = useState();
    const [allStall, setAllStall] = useState();

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
                const res = await getRevenueMothStallById({
                    stallId: values.stallId,
                    yearMonth: values.yearMonth,
                });
                setStallData(res.data);
                toast.success("Search Stall successfully");
            } else {
                const res = await getRevenueYearStallById({
                    stallId: values.stallId,
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

        fetchStalls();
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
                                <BiCalendar color="black" /> YEAR & MONTH:{" "}
                                {stallData.yearMonth}
                            </div>
                        </div>
                        <div className="customer__wrapper">
                            {/* <div>
                                <BiPhone color="black" /> STAFF ORDER COUNT:{" "}
                                {stallData.staffOrderCount.string}
                            </div> */}
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

export default RevevenueStallForm;
