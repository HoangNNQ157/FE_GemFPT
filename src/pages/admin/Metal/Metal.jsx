import { EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BiBookReader } from "react-icons/bi";
import { toast } from "react-toastify";
import MetalForm from "../../../components/modal/MetalForm";
import { getAllMetal, updateMetal } from "../../../service/metalPriceService";
import "./metal.css";

const Metal = () => {
    const [visible, setVisible] = useState(false);
    const [dataMetal, setDataMetal] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [indexView, setIndexView] = useState(0);
    useEffect(() => {
        const fetchMetal = async () => {
            const response = await getAllMetal();
            setDataMetal(response.data);
        };
        fetchMetal();
    }, []);
    const showModal = (record) => {
        setVisible(true);
        setDataUpdate(record);
    };

    const handleCancel = () => {
        setDataUpdate(null);
        setVisible(false);
    };

    const handleSave = async (values) => {
        try {
            const response = await updateMetal({ formData: values });
            if (response.data) {
                toast.success("Update successful");
                const newMetal = await getAllMetal();
                setDataMetal(newMetal.data);
            }
        } catch (err) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setVisible(false);
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "metalPriceId",
            key: "metalPriceId",
        },
        {
            title: "Update Date",
            dataIndex: "updateDate",
            key: "updateDate",
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => (
                <span> {text ? "Hoạt động" : "Ngưng hoạt động"}</span>
            ),
        },
        {
            title: "Type Of Metals",
            dataIndex: "typeOfMetals",
            key: "typeOfMetals",
            render: (text) => <span> {text.length} metal</span>,
        },
        {
            title: "Action",
            key: "actions",
            render: (text, record) => (
                <>
                    <Button
                        onClick={() => showModal(record)}
                        type="link"
                        icon={<EditOutlined />}
                    />
                    <Button
                        style={{
                            border: "none",
                            textDecoration: "underline",
                            padding: 0,
                        }}
                        type="link"
                        onClick={() => {
                            setIndexView(record);
                            toast.info("You have just moved on to metal details");
                        }}
                    >
                        Chi tiết
                    </Button>
                </>
            ),
        },
    ];
    const columnsTypeOfMetals = [
        {
            title: "ID",
            dataIndex: "metalPriceId",
            key: "metalPriceId",
        },
        {
            title: "Update Date",
            dataIndex: "updateDate",
            key: "updateDate",
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => (
                <span> {text ? "Hoạt động" : "Ngưng hoạt động"}</span>
            ),
        },
        {
            title: "metalType",
            dataIndex: "metalType",
            key: "metalType",
        },
        {
            title: "sellPrice",
            dataIndex: "sellPrice",
            key: "sellPrice",
        },
        {
            title: "buyPrice",
            dataIndex: "buyPrice",
            key: "buyPrice",
        },
    ];
    return (
        <>
            {indexView.typeOfMetals ? (
                <>
                    <button
                        className="btn-add"
                        onClick={() => {
                            setIndexView([]);
                            toast.info("You just returned to see the list");
                        }}
                    >
                        trở lại
                    </button>
                    <Table
                        Headers={"Detail"}
                        dataSource={indexView.typeOfMetals}
                        columns={columnsTypeOfMetals}
                    />
                </>
            ) : (
                <Table
                    dataSource={dataMetal.reverse()}
                    columns={columns}
                    pagination={{ defaultPageSize: 8 }}
                />
            )}

            <MetalForm
                onCancel={handleCancel}
                onSave={handleSave}
                visible={visible}
                initialData={dataUpdate}
            />
        </>
    );
};

export default Metal;
