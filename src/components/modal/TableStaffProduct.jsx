import { Button, Table, Modal, Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import { getListProductsActive } from "../../service/productService";
import { formatVND } from "../../utils/funUtils";
import CarouselImg from "../Carousel/Carousel";
import "./TableStaffProduct.css";
import { createBill } from "../../service/bill";

const TableStaffProduct = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getListProductsActive();
            const products = response.data.map((product, index) => ({
                ...product,
                key: product.barcode, // Use barcode as key
            }));
            setDataProducts(products);
        };
        fetchProducts();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Ảnh",
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
            title: "Tên",
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
            title: "Bộ sư tập",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Số lượng",
            dataIndex: "stock",
            key: "stock",
            render: (text, record) => (
                <span> {record.stock > 0 ? record.stock : "Hết hàng"}</span>
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text, record) => <span>{formatVND(record.price)}</span>,
        },
        {
            title: "Giá mới",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text, record) => <span>{formatVND(record.newPrice)}</span>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <span> {record.status ? "Hoạt động" : "Ngưng hoạt động"}</span>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            console.log(selectedRowKeys);
            setSelectedRowKeys(selectedRowKeys);
        },
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
        getCheckboxProps: (record) => ({
            value: record.barcode, // Use barcode as the value
        }),
    };

    const handleAddBill = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleContinue = () => {
        form.validateFields()
            .then((values) => {
                const queryString = new URLSearchParams({
                    customerPhone: values.phoneNumber,
                    barcode: selectedRowKeys.join(","),
                }).toString();

                createBill(queryString);
                setIsModalVisible(false);
                form.resetFields();
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <>
            <Table
                rowSelection={rowSelection}
                dataSource={dataProducts.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
            <div
                style={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <Button
                    danger
                    className="btn-staff"
                    onClick={() => setSelectedRowKeys([])}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleAddBill}
                    type="primary"
                    className="btn-staff"
                    disabled={selectedRowKeys.length === 0}
                >
                    Add to order
                </Button>
            </div>

            <Modal
                title="Enter Phone Number"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone number!",
                            },
                            {
                                pattern: /^\d{10,11}$/,
                                message:
                                    "Phone number must be 10 or 11 digits!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TableStaffProduct;
