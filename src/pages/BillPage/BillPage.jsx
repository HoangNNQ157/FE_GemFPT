import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Row, Col, Typography, Divider, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getBillForId } from "../../service/bill";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import PrintableBill from "../../components/PrintableBill/PrintableBill";
import { FaPrint } from "react-icons/fa";
import { formatVND } from "../../utils/funUtils";
import moment from "moment-timezone";

const BillPage = () => {
    const param = useParams();
    const { id } = param;
    const [billData, setBillData] = useState();
    useEffect(() => {
        getBillForId({ id })
            .then((res) => res.data)
            .then((data) => {
                // Add discount from the main bill data to each warranty card
                const warrantyCards = data.warrantyCards.map(card => {
                    return {
                        ...card,
                        discount: data.discount,
                    };
                });
                setBillData({ ...data, warrantyCards });
            });
    }, [param]);
    const navigator = useNavigate();
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const columns = [
        {
            title: "Product Barcode",
            dataIndex: "product_barcode",
            key: "product_barcode",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text) => (
                <span
                    style={{
                        maxWidth: "100px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                    }}
                >
                    {formatVND(Math.floor(text))}
                </span>
            ),
        },
    ];

    const warrantyColumns = [
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
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            render: (text) => `${text}%`,
        },
        {
            title: "Purchase Date",
            dataIndex: "purchaseDate",
            key: "purchaseDate",
            render: (text) => moment(text).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "Warranty Expiry Date",
            dataIndex: "warrantyExpiryDate",
            key: "warrantyExpiryDate",
            render: (text) => moment(text).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm"),
        },
    ];

    return (
        <>
            <div
                style={{
                    height: "40px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 40px",
                }}
            >
                <Button
                    style={{ border: "none" }}
                    onClick={() => navigator(-1)}
                >
                    <IoIosArrowRoundBack size={30} /> PAGE BACK
                </Button>
                <Button style={{ marginLeft: "auto" }} onClick={handlePrint}>
                    Print Invoice
                    <FaPrint />
                </Button>
            </div>
            <div style={{ display: "none" }}>
                <PrintableBill
                    ref={printRef}
                    billData={billData}
                    id={id}
                    columns={columns}
                    warrantyColumns={warrantyColumns}
                />
            </div>
            <Card
                bordered={false}
                style={{
                    width: 800,
                    margin: "20px auto",
                    border: "2px dashed #ddd",
                }}
            >
                <Row justify="center">
                    <Typography.Title level={2}>GEM VIETNAM</Typography.Title>
                </Row>
                <Row justify="center">
                    <Typography.Text>40 Lê Văn Việt, Dist 9, HCM</Typography.Text>
                </Row>
                <Row justify="space-between">
                    <Col>
                        <Typography.Text strong>BILL TO</Typography.Text>
                        <br />
                        <Typography.Text>
                            {billData?.customerName}
                        </Typography.Text>
                        <br />
                        <Typography.Text>
                            {billData?.customerPhone}
                        </Typography.Text>
                    </Col>
                </Row>
                <Divider />
                <Row justify="space-between">
                    <Col>
                        <Typography.Text strong>DATE: {billData?.createTime ? moment(billData.createTime).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm") : ""}</Typography.Text>
                        <br />
                        <Typography.Text strong>CASHIER: {billData?.cashier}</Typography.Text>
                    </Col>
                </Row>
                <Divider />
                <Row align="center" justify="space-between">
                    <span style={{ fontSize: "24px", fontWeight: "700" }}>
                        Invoice Total
                    </span>
                    <span style={{ fontSize: "24px", fontWeight: "700" }}>
                        {billData?.totalAmount
                            ? formatVND(billData.totalAmount)
                            : 0}
                    </span>
                </Row>
                <Divider />
                <Table
                    dataSource={billData?.items}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                />
                <Divider />
                <Table
                    dataSource={billData?.warrantyCards}
                    columns={warrantyColumns}
                    pagination={false}
                    rowKey="id"
                />
                <Divider />
                <Row justify="center">
                    <Typography.Text strong>Terms & Conditions</Typography.Text>
                    <br />
                    <Typography.Text>
                        Payment is due within 15 days
                    </Typography.Text>
                    <br />
                    <Typography.Text>Name of Bank</Typography.Text>
                    <br />
                    <Typography.Text>
                        Account number: 1234567890
                    </Typography.Text>
                    <br />
                    <Typography.Text>Routing: 0961815703</Typography.Text>
                </Row>
            </Card>
        </>
    );
};

export default BillPage;
