import { EditOutlined } from "@ant-design/icons";
import { Button, Flex, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    createBuyBack,
    getAllBuyBack,
    updateBuyBack,
} from "../../../service/buyBack";
import CarouselImg from "../../../components/Carousel/Carousel";
import { formatVND } from "../../../utils/funUtils";
import BuybackForm from "../../../components/modal/BuybackForm";
import { CgClose } from "react-icons/cg";

const StaffBuyBack = () => {
    const [visible, setVisible] = useState(false);
    const [dataBuyback, setDataBuyback] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [indexView, setIndexView] = useState(0);

    useEffect(() => {
        const fetchMetal = async () => {
            try {
                console.log("Fetching buyback data...");
                const response = await getAllBuyBack();
                console.log("Fetch response: ", response);
                if (response.data.length === 0) {
                    throw new Error("Customer not found");
                }
                setDataBuyback(response.data);
            } catch (error) {
                console.error("Error fetching buyback data: ", error);
                if (error.message === "Customer not found") {
                    toast.error("Customer not found");
                } else {
                    toast.error("Error fetching buyback data");
                }
            }
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

    const handleSave = async ({ values, userData, type }) => {
        try {
            console.log("Saving buyback data...");
            if (type === "create") {
                const response = await createBuyBack({
                    formData: [values],
                    customerName: userData.name,
                    customerPhone: userData.phone,
                });
                console.log("Create response: ", response);
                if (response.data) {
                    toast.success("Create buy back successfully");
                    const newBuyback = await getAllBuyBack();
                    setDataBuyback(newBuyback.data);
                }
            } else {
                const response = await updateBuyBack({
                    formData: values,
                    barcode: values.barcode,
                });
                console.log("Update response: ", response);
                if (response.data) {
                    toast.success("Update buy back successfully");
                    const newBuyback = await getAllBuyBack();
                    setDataBuyback(newBuyback.data);
                }
            }
        } catch (error) {
            console.error("Error saving buyback data: ", error);
            if (error.response && error.response.data) {
                // Hiển thị tất cả các lỗi trả về từ response
                const errorMessages = Object.values(error.response.data).join('');
                toast.error(`Error: ${errorMessages}`);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setVisible(false);
        }
    };

    const handleDeleteProduct = (product) => {};

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Type Bill",
            dataIndex: "typeBill",
            key: "typeBill",
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Customer Phone",
            dataIndex: "customerPhone",
            key: "customerPhone",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (text, record) => (
                <span>{formatVND(record.totalAmount)}</span>
            ),
        },
        {
            title: "Create Time",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => <span> {text ? "Active" : "Inactive"}</span>,
        },
        {
            title: "Cashier",
            dataIndex: "cashier",
            key: "cashier",
        },
        {
            title: "Stalls",
            dataIndex: "stalls",
            key: "stalls",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <span
                    className="status"
                    style={{ color: record.status ? "green" : "red" }}
                >
                    {record.status ? "ON" : "Action"}
                </span>
            ),
        },
        {
            title: "Action",
            key: "actions",
            render: (text, record) => (
                <Flex align="center" gap={10}>
                    <Button
                        style={{
                            border: "none",
                            textDecoration: "underline",
                            padding: 0,
                        }}
                        type="link"
                        onClick={() => {
                            setIndexView(record.products);
                            toast.info("Viewing buyback details");
                        }}
                    >
                        Detail
                    </Button>
                </Flex>
            ),
        },
    ];

    const productColumns = [
        {
            title: "ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Barcode",
            dataIndex: "barcode",
            key: "barcode",
        },
        {
            title: "Images",
            dataIndex: "urls",
            key: "urls",
            render: (urls) =>
                urls.length > 0 ? (
                    <div
                        style={{
                            width: "200px",
                            margin: "0 auto",
                        }}
                    >
                        <CarouselImg listImg={urls} />
                    </div>
                ) : (
                    "No Image"
                ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => (
                <span
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Quantity",
            dataIndex: "stock",
            key: "stock",
            render: (text, record) => (
                <span> {record.stock > 0 ? record.stock : "Hết hàng"}</span>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text, record) => <span>{formatVND(record.price)}</span>,
        },
        {
            title: "Processing Status",
            dataIndex: "typeWhenBuyBack",
            key: "typeWhenBuyBack",
        },
    ];

    return (
        <>
            {indexView.length ? (
                <>
                    <button
                        className="btn-add"
                        onClick={() => {
                            setIndexView([]);
                            toast.info("You just returned to see the list");
                        }}
                    >
                        Back
                    </button>
                    <Table
                        Headers={"Chi tiết"}
                        dataSource={indexView}
                        columns={productColumns}
                    />
                </>
            ) : (
                <>
                    <button
                        className="btn-add"
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        Buy Back
                    </button>
                    <Table
                        dataSource={dataBuyback.reverse()}
                        columns={columns}
                        pagination={{ defaultPageSize: 6 }}
                    />
                </>
            )}

            <BuybackForm
                onCancel={handleCancel}
                onSave={handleSave}
                visible={visible}
                initialData={dataUpdate?.products[0]}
                type={dataUpdate ? "update" : "create"}
            />
        </>
    );
};

export default StaffBuyBack;
