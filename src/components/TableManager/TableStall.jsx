import React, { useEffect, useState } from "react";
import { Button, Flex, Table, Tooltip } from "antd";
import {
    MdModeEditOutline,
    MdOutlineDetails,
    MdPublishedWithChanges,
    MdVisibility,
} from "react-icons/md";
import { toast } from "react-toastify";
import {
    createStalls,
    getAlllStalls,
    updateStaffWorking,
    updateStallStatus,
    getStallAccounts,
} from "../../service/manager";
import { formatVND } from "../../utils/funUtils";
import CreateStallForm from "../modal/CreateStallForm";
import StaffWorkingForm from "../modal/StaffWorkingForm";
import "./TableManager.css";
import StallChangeMoneyForm from "../modal/StallChangeMoneyForm";
import { BiMoney } from "react-icons/bi";
import { changeMoneyStall } from "../../service/ChangeMoney";
import { useResolvedPath } from "react-router-dom";
import ViewStallModal from "../modal/ViewStallModal";


const TableStall = () => {
    const [stallData, setStallData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isStaffWorking, setIsStaffWorking] = useState(false);
    const [changeMoney, setChangeMoney] = useState(false);
    const [stallId, setStallId] = useState(false);
    const [staffWorkingId, setStaffWorkingId] = useState();
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [currentStallAccounts, setCurrentStallAccounts] = useState([]);

    const prams = useResolvedPath();

    useEffect(() => {
        getAlllStalls()
            .then((data) => data.data)
            .then((data) => setStallData(data));
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "stallsSellId",
            key: "stallsSellId",
        },
        {
            title: "Name",
            dataIndex: "stallsSellName",
            key: "stallsSellName",
        },
        {
            title: "Create Time",
            dataIndex: "stallsSellCreateTime",
            key: "stallsSellCreateTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Status",
            dataIndex: "stallsSellStatus",
            key: "stallsSellStatus",
            render: (text, record) => (
                <Flex align="center" gap={6} justify="center">
                    <span
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: text ? "green" : "red",
                        }}
                    >
                        {record.stallsSellStatus ? "ON" : "OFF"}
                    </span>
                    <Button
                        icon={<MdPublishedWithChanges />}
                        type="default"
                        danger={!text ? true : false}
                        onClick={() =>
                            handleUpdateStatus(
                                record.stallsSellId,
                                record.stallsSellStatus
                            )
                        }
                    />
                </Flex>
            ),
        },
        {
            title: "Money",
            dataIndex: "money",
            key: "money",
            render: (text) => <span>{formatVND(text)}</span>,
        },
        {
            title: "Action",
            key: "actions",
            render: (text, record) => (
                <Flex justify="center" align="center" gap={4}>
                    <Tooltip title="Add staff working">
                        <Button
                            ghost
                            type="primary"
                            icon={<MdModeEditOutline />}
                            onClick={() => {
                                setIsStaffWorking(true);
                                setStaffWorkingId(record.stallsSellId);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="View stall">
                        <Button
                            ghost
                            type="primary"
                            icon={<MdVisibility />}
                            onClick={async () => {
                                try {
                                    const response = await getStallAccounts(record.stallsSellId);
                                    setCurrentStallAccounts(response.data);
                                    setViewModalVisible(true);
                                } catch (error) {
                                    toast.error("Failed to fetch stall accounts");
                                }
                            }}
                        />
                    </Tooltip>
                    {prams.pathname.startsWith("/admin") ? (
                        <Tooltip title="Detail stall">
                            <Button
                                ghost
                                type="primary"
                                icon={<BiMoney />}
                                onClick={() => {
                                    setStallId(record.stallsSellId);
                                    setChangeMoney(true);
                                }}
                            />
                        </Tooltip>
                    ) : null}
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
    const handleCancelStaffWorking = () => {
        setIsStaffWorking(false);
    };
    const handleSave = async (values) => {
        const formData = {
            stallsSellName: values.stallsSellName,
            stallsSellCreateTime: values.stallsSellCreateTime.toISOString(),
            stallsSellStatus: values.stallsSellStatus,
        };

        try {
            const res = await createStalls({ formData: formData });
            if (res) {
                toast.success("Create stall successfully");
                await getAlllStalls()
                    .then((data) => data.data)
                    .then((data) => setStallData(data));
            }
        } catch (error) {
            toast.success("Create stall failed");
        } finally {
            setVisible(false);
        }
    };
    const handleSaveStaffWorking = async (values) => {
        const formData = {
            stallsWorkingId: staffWorkingId,
            staffWorkingStatus: values.staffWorkingStatus,
            startWorkingDateTime: values.startWorkingDateTime.toISOString(),
            endWorkingDateTime: values.endWorkingDateTime.toISOString(),
        };

        try {
            const res = await updateStaffWorking({
                formData: formData,
                accountIds: values.accountIds,
            });
            if (res) {
                toast.success("Create stall working successfully");
                setStaffWorkingId(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Create stall failed");
        } finally {
            setIsStaffWorking(false);
        }
    };
    const handleSaveMoney = async (values) => {
        try {
            const data = await changeMoneyStall({
                typeChange: values.typeChange,
                formData: values,
            });
            if (data.data) {
                toast.success("Change money stall successfully");
                setChangeMoney(false);
                await getAlllStalls()
                    .then((data) => data.data)
                    .then((data) => setStallData(data));
            }
        } catch (error) {
            toast.error("Change money stall failed");
            toast.error(error.response.data.amount);
        }
    };
    const handleUpdateStatus = async (stallsSellId, status) => {
        try {
            const res = await updateStallStatus({
                stallsSellId,
                status: !status,
            });
            if (res.data) {
                toast.success("Update status stall successful");
                await getAlllStalls()
                    .then((data) => data.data)
                    .then((data) => setStallData(data));
            }
        } catch (error) {
            toast.error("Update status stall failed");
        }
    };

    return (
        <>
            <Flex align="center" gap={10}>
                <button className="btn-add" onClick={() => showModal()}>
                    Add New Stall
                </button>
            </Flex>
            <Table
                dataSource={stallData.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 6 }}
            />
            <CreateStallForm
                visible={visible}
                onCancel={handleCancel}
                onSave={handleSave}
            />
            <StaffWorkingForm
                onCancel={handleCancelStaffWorking}
                visible={isStaffWorking}
                onSave={handleSaveStaffWorking}
            />
            {stallId ? (
                <StallChangeMoneyForm
                    onCancel={() => setChangeMoney(false)}
                    visible={changeMoney}
                    onSave={handleSaveMoney}
                    stallId={stallId}
                />
            ) : null}
            <ViewStallModal
                visible={viewModalVisible}
                onCancel={() => setViewModalVisible(false)}
                stallAccounts={currentStallAccounts}
            />
        </>
    );
};

export default TableStall;
