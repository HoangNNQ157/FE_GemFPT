import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Space, Table } from "antd";
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
import { getChangeMoney } from "../../service/ChangeMoney";

const { Option } = Select;

const HistotyMoneyStallForm = ({ isModalVisible, setIsModalVisible }) => {
    const [form] = Form.useForm();
    const [stallData, setStallData] = useState();
    const [allStall, setAllStall] = useState();

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setStallData();
    };

    const handleSearch = async () => {
        try {
            const values = await form.validateFields();
            const res = await getChangeMoney({
                stallsSellId: values.stallId,
            });
            setStallData(res.data);
            toast.success("Search money successfully");
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

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Stall ID",
            dataIndex: ["stallsSell", "stallsSellId"],
            key: "stallsSellId",
        },
        {
            title: "Stall Name",
            dataIndex: ["stallsSell", "stallsSellName"],
            key: "stallsSellName",
        },
        {
            title: "Stall Create Time",
            dataIndex: ["stallsSell", "stallsSellCreateTime"],
            key: "stallsSellCreateTime",
        },
        {
            title: "Stall Status",
            dataIndex: ["stallsSell", "stallsSellStatus"],
            key: "stallsSellStatus",
            render: (status) => (status ? "Active" : "Inactive"),
        },
        {
            title: "Money",
            dataIndex: ["stallsSell", "money"],
            key: "money",
        },
        {
            title: "Old Total In Stall",
            dataIndex: "oldTotalInStall",
            key: "oldTotalInStall",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Change DateTime",
            dataIndex: "changeDateTime",
            key: "changeDateTime",
        },
        {
            title: "Bill ID",
            dataIndex: "billId",
            key: "billId",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Type Change",
            dataIndex: "typeChange",
            key: "typeChange",
        },
    ];
    console.log(stallData);
    return (
        <Modal
            title="HISTORY CHANGE MONEY"
            visible={isModalVisible}
            onCancel={handleCancel}
            width={"80%"}
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
                    <Button key="search" type="primary" onClick={handleSearch}>
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
            </Form>
            {stallData && <Table columns={columns} dataSource={stallData} />}
        </Modal>
    );
};

export default HistotyMoneyStallForm;
