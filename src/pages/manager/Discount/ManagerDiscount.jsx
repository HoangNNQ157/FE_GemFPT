// src/components/CustomTable/CustomTable.js

import { Button, Flex, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdPublishedWithChanges } from "react-icons/md";
import { toast } from "react-toastify";
import { getAllDiscount, respondtDiscount } from "../../../service/discount";
import { formatVND } from "../../../utils/funUtils";
import RespondForm from "../../../components/modal/RespondForm";
const ManagerDiscount = () => {
    const [stallData, setStallData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [idResponse, setIdResponse] = useState(null);
    useEffect(() => {
        getAllDiscount()
            .then((data) => data.data)
            .then((data) => setStallData(data));
    }, []);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "PERCENT",
            dataIndex: "requestedDiscount",
            key: "requestedDiscount",
        },
        {
            title: "CREATE TIME",
            dataIndex: "requestTime",
            key: "requestTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "STATUS",
            dataIndex: "approved",
            key: "approved",
            render: (text, record) => (
                <Flex align="center" gap={6} justify="center">
                    <span
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: text ? "green" : "red",
                        }}
                    >
                        {record.approved ? "Approved" : "Pending"}
                    </span>
                </Flex>
            ),
        },
        {
            title: "CUSTOMER NAME",
            dataIndex: ["customer", "name"],
            key: "customerName",
        },
        {
            title: "CUSTOMER PHONE",
            dataIndex: ["customer", "phone"],
            key: "customerPhone",
        },
        {
            title: "CUSTOMER POINTS",
            dataIndex: ["customer", "points"],
            key: "customerPoints",
        },
        {
            title: "CUSTOMER RANK",
            dataIndex: ["customer", "rankCus"],
            key: "customerRank",
        },
        {
            title: "CUSTOMER CREATE TIME",
            dataIndex: ["customer", "createTime"],
            key: "customerCreateTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },

        {
            title: "Action",
            key: "actions",
            render: (text, record) => (
                <Flex justify="center" align="center" gap={4}>
                    <Tooltip title="Create Respond Discount">
                        <Button
                            ghost
                            type="primary"
                            icon={<MdModeEditOutline />}
                            onClick={() => {
                                setVisible(true);
                                setIdResponse(record.id);
                            }}
                        />
                    </Tooltip>
                </Flex>
            ),
        },
    ];

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const handleSave = async (values) => {
        try {
            const res = await respondtDiscount({
                approved: values.approved,
                discountRequestId: idResponse,
                managerResponse: values.managerResponse,
            });
            getAllDiscount()
                .then((data) => data.data)
                .then((data) => setStallData(data));
            if (res) {
                toast.success("Respond discount successfully");
            }
        } catch (error) {
            toast.error("Respond discount failed");
        } finally {
            setVisible(false);
        }
    };
    return (
        <>
            <Table
                dataSource={stallData.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
            <RespondForm
                visible={visible}
                onSave={handleSave}
                onCancel={handleCancel}
                idResponse={idResponse}
            />
        </>
    );
};

export default ManagerDiscount;
