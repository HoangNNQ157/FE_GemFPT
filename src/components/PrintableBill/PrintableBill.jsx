import React from "react";
import { Card, Col, Divider, Row, Table, Typography } from "antd";
import { formatVND } from "../../utils/funUtils";
import moment from "moment-timezone";

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
                <Row justify="center">
                    <Typography.Title level={2}>GEM VIETNAM</Typography.Title>
                </Row>
                <Row justify="center">
                    <Typography.Text>40 Lê Văn Việt, Dist 9, HCM</Typography.Text>
                </Row>
                <Divider />
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
        </div>
    );
});

export default PrintableBill;
