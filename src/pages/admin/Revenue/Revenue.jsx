import React, { useEffect, useState } from "react";
import { Button, Flex, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CashChart from "../../../components/Chart/CashChart";
import RevenueChart from "../../../components/Chart/RevenueChart";
import StallsChart from "../../../components/Chart/StallsChart";
import {
    getRevenueCashiers,
    getRevenueDataMonth,
    getRevenueDataYear,
    getRevenueStall,
} from "../../../service/revenue";
import "./Revenue.css";
import RevevenueStallForm from "../../../components/modal/RevevenueStallForm";
import RevevenueCashierForm from "../../../components/modal/RevevenueCashierForm";
import HistotyMoneyStallForm from "../../../components/modal/HistotyMoneyStallForm";
import RevevenueStallCashierForm from "../../../components/modal/RevevenueStallCashierForm";

const convertData = (data) => {
    const result = [];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    months.forEach((month, index) => {
        const entry = { month };
        Object.keys(data).forEach((stall) => {
            entry[`stall_${stall}`] = data[stall][index];
        });
        result.push(entry);
    });

    return result;
};

const Revenue = () => {
    const [data, setData] = useState({
        revenueData: [],
        stallData: [],
        cashiers: [],
    });
    const [revenueStall, setRevenueStall] = useState({
        status: false,
        id: 1,
    });
    const [revenueCashier, setRevenueCashier] = useState({
        status: false,
        id: 1,
    });
    const [revenueStallCashier, setRevenueStallCashier] = useState({
        status: false,
        id: 1,
    });
    const [historyChangeMoney, setHistoryChangeMoney] = useState(false);
    const [formChart, setFormChart] = useState({
        revenue: 2,
    });

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                let res;
                if (formChart.revenue === 2) {
                    res = await getRevenueDataYear();
                } else if (formChart.revenue === 1) {
                    res = await getRevenueDataMonth();
                }
                const newData = convertData(res.data);
                setData((prevData) => ({
                    ...prevData,
                    revenueData: newData,
                }));
            } catch (error) {
                console.error("Failed to fetch revenue data", error);
            }
        };

        fetchRevenueData();
    }, [formChart]);

    useEffect(() => {
        const fetchStallData = async () => {
            try {
                const res = await getRevenueStall();
                setData((prevData) => ({
                    ...prevData,
                    stallData: res.data,
                }));
            } catch (error) {
                console.error("Failed to fetch stall data", error);
            }
        };

        const fetchCashiersData = async () => {
            try {
                const res = await getRevenueCashiers();
                setData((prevData) => ({
                    ...prevData,
                    cashiers: res.data,
                }));
            } catch (error) {
                console.error("Failed to fetch cashiers data", error);
            }
        };

        fetchStallData();
        fetchCashiersData();
    }, []);

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => setHistoryChangeMoney(true)}>
                HISTORY CHANGE MONEY
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setRevenueStall({ status: true, id: 1 })}>
                REVENUE STALL MONTH
            </Menu.Item>
            <Menu.Item key="3" onClick={() => setRevenueStall({ status: true, id: 2 })}>
                REVENUE STALL YEAR
            </Menu.Item>
            <Menu.Item key="4" onClick={() => setRevenueCashier({ status: true, id: 1 })}>
                REVENUE CASHIER MONTH
            </Menu.Item>
            <Menu.Item key="5" onClick={() => setRevenueCashier({ status: true, id: 2 })}>
                REVENUE CASHIER YEAR
            </Menu.Item>
            <Menu.Item key="6" onClick={() => setRevenueStallCashier({ status: true, id: 1 })}>
                REVENUE STALL & CASHIER MONTH
            </Menu.Item>
            <Menu.Item key="7" onClick={() => setRevenueStallCashier({ status: true, id: 2 })}>
                REVENUE STALL & CASHIER YEAR
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="revenue__container">
            <p className="title">DASHBOARD</p>
            <div className="recenue__chart">
                <Flex justify="space-between" style={{ width: "100%" }}>
                    <p className="chart__title">Revenue of All Stalls</p>
                    <Flex gap={6}>
                        <Button
                            onClick={() => setFormChart({ revenue: 1 })}
                            type={formChart.revenue === 1 ? "primary" : "default"}
                        >
                            Month
                        </Button>
                        <Button
                            onClick={() => setFormChart({ revenue: 2 })}
                            type={formChart.revenue === 2 ? "primary" : "default"}
                        >
                            Year
                        </Button>
                    </Flex>
                </Flex>
                {data.revenueData?.length ? (
                    <RevenueChart data={data.revenueData} />
                ) : null}
            </div>
            <div className="revenue__btn-wrapper">
                <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                    <Button>
                    REVENUE REPORTS <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div style={{ marginTop: "20px" }}>
                <Flex gap={10} style={{ marginTop: "20px" }}>
                    {data.stallData?.length ? (
                        <div className="recenue__chart">
                            <StallsChart data={data.stallData} />
                        </div>
                    ) : null}
                    {data.cashiers?.length ? (
                        <div className="recenue__chart">
                            <CashChart data={data.cashiers} />
                        </div>
                    ) : null}
                </Flex>
            </div>
            <RevevenueStallForm
                isModalVisible={revenueStall.status}
                setIsModalVisible={setRevenueStall}
                type={revenueStall.id}
            />
            {revenueCashier.status ? (
                <RevevenueCashierForm
                    isModalVisible={revenueCashier.status}
                    setIsModalVisible={setRevenueCashier}
                    type={revenueCashier.id}
                />
            ) : null}
            {revenueStallCashier.status ? (
                <RevevenueStallCashierForm
                    isModalVisible={revenueStallCashier.status}
                    setIsModalVisible={setRevenueStallCashier}
                    type={revenueStallCashier.id}
                />
            ) : null}
            {historyChangeMoney ? (
                <HistotyMoneyStallForm
                    isModalVisible={historyChangeMoney}
                    setIsModalVisible={setHistoryChangeMoney}
                />
            ) : null}
        </div>
    );
};

export default Revenue;