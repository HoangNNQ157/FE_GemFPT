import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getMetalActive } from "../../service/metalPriceService";

import "./PriceTable.css";
import HeaderDefault from "../../components/Header/HeaderDefault/HeaderDefault";
import { formatVND } from "../../utils/funUtils";
const columns = [
    {
        title: "Loại vàng | ĐVT: 1.000đ/Chỉ",
        dataIndex: "metalType",
        key: "metalType",
        className: "gold-type-column",
    },
    {
        title: "Giá mua",
        dataIndex: "buyPrice",
        key: "buyPrice",
        className: "gold-price-column",
        render: (text) => formatVND(text),
    },
    {
        title: "Giá bán",
        dataIndex: "sellPrice",
        key: "sellPrice",
        className: "gold-price-column",
        render: (text) => formatVND(text),
    },
];

const PriceTable = () => {
    const [data, setData] = useState();
    useEffect(() => {
        getMetalActive()
            .then((res) => res.data)
            .then((data) => setData(data));
    }, []);
    return (
        <div className="gold-prices-container">
            <HeaderDefault />
            {data?.length ? (
                <h2 className="table-title">
                    CẬP NHẬT NGÀY:{" "}
                    {new Date(data[0].updateDate).toLocaleString("vi-VN")}
                </h2>
            ) : null}
            <div className="table__container">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="gold-prices-table"
                    bordered
                />
            </div>
        </div>
    );
};

export default PriceTable;
