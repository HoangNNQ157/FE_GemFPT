import React from "react";
import { Card, Col, Divider, Row, Table, Typography } from "antd";
import { formatVND } from "../../utils/funUtils";

const PrintableBill = React.forwardRef((props, ref) => {
    const { billData, id, columns, warrantyColumns } = props;
    return (
        <div ref={ref}>
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
                        <Typography.Text strong>SHIP TO</Typography.Text>
                        <br />
                        <Typography.Text>
                            {billData?.customerName}
                        </Typography.Text>
                        <br />
                        <Typography.Text>
                            {billData?.customerPhone}
                        </Typography.Text>
                    </Col>
                    <Col>
                        <Typography.Text strong>INVOICE #</Typography.Text>
                        <br />
                        <Typography.Text>{id}</Typography.Text>
                        <br />
                        <Typography.Text strong>INVOICE DATE</Typography.Text>
                        <br />
                        <Typography.Text>
                            {billData?.createTime}
                        </Typography.Text>
                    </Col>
                </Row>
                <Divider />
                <Row align="center" justify="space-between">
                    <span style={{ fontSize: "24px", fontWeight: "700" }}>
                        Invoice Total
                    </span>
                    <span style={{ fontSize: "24px", fontWeight: "700" }}>
                        {billData?.totalAmount}₫
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
                    <Typography.Text>Routing: 098765432</Typography.Text>
                </Row>
            </Card>
        </div>
    );
});

export default PrintableBill;
