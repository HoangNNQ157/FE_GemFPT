import { Button, Flex, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdPublishedWithChanges } from "react-icons/md";
import { toast } from "react-toastify";
import { getAllDiscount, respondtDiscount } from "../../../service/discount";
import { formatVND } from "../../../utils/funUtils";
import RespondForm from "../../../components/modal/RespondForm";
import { useResolvedPath } from "react-router-dom";

const ManagerDiscount = () => {
    const pathName = useResolvedPath();
    const [stallData, setStallData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [idResponse, setIdResponse] = useState(null);

    useEffect(() => {
        getAllDiscount()
            .then((data) => data.data)
            .then((data) => {
                // Update the statusUse field based on some condition
                const updatedData = data.map(item => ({
                    ...item,
                    statusUse: item.statusUse ? "Đã Sử Dụng" : "Chưa Sử Dụng"
                }));
                setStallData(updatedData);
            });
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Discount",
            dataIndex: "requestedDiscount",
            key: "requestedDiscount",
            render: (text) => <span>{text}%</span>,
        },
        {
            title: "Create Time",
            dataIndex: "requestTime",
            key: "requestTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Verification",
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
            title: "Customer Name",
            dataIndex: ["customer", "name"],
            key: "customerName",
        },
        {
            title: "Duration",
            dataIndex: "expirationTime",
            key: "expirationTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Customer Phone",
            dataIndex: ["customer", "phone"],
            key: "customerPhone",
        },
        {
            title: "Comments",
            dataIndex: ["managerResponse"],
            key: "managerResponse",
        },
        {
            title: "Status Use",
            dataIndex: "statusUse",
            key: "statusUse",
            render: (text) => <span>{text}</span>,
        },
    ];

    if (!pathName.pathname.startsWith("/staff")) {
        columns.push({
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
        });
    }

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
                expirationTime: values.expirationTime,
            });
            getAllDiscount()
                .then((data) => data.data)
                .then((data) => {
                    const updatedData = data.map(item => ({
                        ...item,
                        statusUse: item.statusUse ? "Đã Sử Dụng" : "Chưa Sử Dụng"
                    }));
                    setStallData(updatedData);
                });
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
                pagination={{ defaultPageSize: 7 }}
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
