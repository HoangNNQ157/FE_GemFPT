import { Modal } from "antd";
import React from "react";

const DetailStallModal = ({ visible, onCancel, onSave, id }) => {
    const handleOk = () => {};
    const columns = [
        {
            title: "ID",
            dataIndex: "stallsSellId",
            key: "stallsSellId",
        },
        {
            title: "NAME",
            dataIndex: "stallsSellName",
            key: "stallsSellName",
        },
        {
            title: "CREATE TIME",
            dataIndex: "stallsSellCreateTime",
            key: "stallsSellCreateTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "STATUS",
            dataIndex: "stallsSellStatus",
            key: "stallsSellStatus",
            render: (text, record) => (
                <span>
                    {record.stallsSellStatus ? "Hoạt động" : "Ngưng hoạt động"}
                </span>
            ),
        },
        {
            title: "MONEY",
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
                            onClick={() => setIsStaffWorking(true)}
                        />
                    </Tooltip>
                    <Tooltip title="Detail stall">
                        <Button
                            ghost
                            type="primary"
                            icon={<MdOutlineDetails />}
                            onClick={() =>
                                setDetailStall({
                                    status: true,
                                    id: record.stallsSellId,
                                })
                            }
                        />
                    </Tooltip>
                </Flex>
            ),
        },
    ];
    return (
        <Modal
            title="Edit Metal"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        ></Modal>
    );
};

export default DetailStallModal;
