import { Table } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { getMetalActive } from "../../service/metalPriceService";

import "./PriceTable.css";
import HeaderDefault from "../../components/Header/HeaderDefault/HeaderDefault";
import { formatVND } from "../../utils/funUtils";
import { FullscreenOutlined } from "@ant-design/icons";

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
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      getMetalActive()
        .then((res) => {
          console.log("Fetched data:", res.data);
          return res.data;
        })
        .then((data) => setData(data));
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000); // Fetch data every 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const toggleFullscreen = () => {
    if (tableRef.current) {
      if (!document.fullscreenElement) {
        tableRef.current.requestFullscreen().catch((err) => {
          console.log(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const getTitle = () => {
    if (data.length) {
      return (
        <h2 className="table-title">
          CẬP NHẬT NGÀY:{" "}
          {new Date(data[0].updateDate).toLocaleDateString("vi-VN")} -{" "}
          {new Date(data[0].updateDate).toLocaleTimeString("vi-VN")}
        </h2>
      );
    }
    return <h2 className="table-title">Đang tải dữ liệu...</h2>;
  };

  return (
    <div className="gold-prices-container">
      <HeaderDefault />
      <div className="table__container" ref={tableRef}>
        <Table
          title={getTitle}
          columns={columns}
          dataSource={data}
          pagination={false}
          className="gold-prices-table"
          bordered
        />
      </div>
      <div className="fullscreen-icon" onClick={toggleFullscreen}>
        <FullscreenOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default PriceTable;

