import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import "./PriceTable.css"; // Import custom CSS
import { getAllMetal, getMetalActive } from "../../service/metalPriceService";
import logo from "../../assets/trangsucdaquy.jpg";
import { useNavigate } from "react-router-dom";
const columns = [
    {
        title: "Loại vàng | ĐVT: 1.000đ/Chỉ",
        dataIndex: "metalType",
        key: "metalType",
        className: "gold-type-column", // Custom class
    },
    {
        title: "Giá mua",
        dataIndex: "buyPrice",
        key: "buyPrice",
        className: "gold-price-column", // Custom class
    },
    {
        title: "Giá bán",
        dataIndex: "sellPrice",
        key: "sellPrice",
        className: "gold-price-column", // Custom class
    },
];

const PriceTable = () => {
    const navigator = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        getMetalActive()
            .then((res) => res.data)
            .then((data) => setData(data));
    }, []);
    return (
        <div className="gold-prices-container">
            <div className="header__price">
                <img src={logo} className="img__logo" />
                <Button onClick={() => navigator("/login")}>Login</Button>
            </div>
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
