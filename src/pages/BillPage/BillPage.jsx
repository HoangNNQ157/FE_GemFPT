import { Card, Col, Divider, Flex, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBillForId } from "../../service/bill";
import { formatVND } from "../../utils/funUtils";

const BillPage = () => {
    const param = useParams();
    const { id } = param;
    const [billData, setBillData] = useState();
    useEffect(() => {
        getBillForId({ id })
            .then((res) => res.data)
            .then((data) => setBillData(data));
    }, [param]);
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
            dataIndex: "price",
            key: "price",
            render: (text) => `${formatVND(Math.floor(text))}`,
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            render: (text) => `${text}%`,
        },
        {
            title: "New Price",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text) => `${formatVND(Math.floor(text))}`,
        },
    ];

    return (
        <Card
            bordered={false}
            style={{
                width: 800,
                margin: "20px auto",
                border: "2px dashed #ddd",
            }}
        >
            <Row justify="space-between">
                <Col>
                    <Typography.Text strong>BILL TO</Typography.Text>
                    <br />
                    <Typography.Text>{billData?.customerName}</Typography.Text>
                    <br />
                    <Typography.Text>{billData?.customerPhone}</Typography.Text>
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between">
                <Col>
                    <Typography.Text strong>SHIP TO</Typography.Text>
                    <br />
                    <Typography.Text>{billData?.customerName}</Typography.Text>
                    <br />
                    <Typography.Text>{billData?.customerPhone}</Typography.Text>
                </Col>
                <Col>
                    <Typography.Text strong>INVOICE #</Typography.Text>
                    <br />
                    <Typography.Text>{id}</Typography.Text>
                    <br />
                    <Typography.Text strong>INVOICE DATE</Typography.Text>
                    <br />
                    <Typography.Text>{billData?.createTime}</Typography.Text>
                </Col>
            </Row>
            <Divider />
            <Flex align="center" justify="space-between">
                <span style={{ fontSize: "24px", fontWeight: "700" }}>
                    Invoice Total
                </span>
                <span style={{ fontSize: "24px", fontWeight: "700" }}>
                    {billData?.totalAmount}₫
                </span>
            </Flex>

            <Divider />
            <Table
                dataSource={billData?.items}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
            <Divider />

            <Divider />
            <Row justify="center">
                <Typography.Text strong>Terms & Conditions</Typography.Text>
                <br />
                <Typography.Text>Payment is due within 15 days</Typography.Text>
                <br />
                <Typography.Text>Name of Bank</Typography.Text>
                <br />
                <Typography.Text>Account number: 1234567890</Typography.Text>
                <br />
                <Typography.Text>Routing: 098765432</Typography.Text>
            </Row>
        </Card>
    );
};
export default BillPage;
