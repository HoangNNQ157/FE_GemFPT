import api from "../config/axios";
import Cookies from "js-cookie";

const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getRevenueDataMonth = () => {
    return api.get("monthly-revenue-data", { headers: headers });
};
const getRevenueDataYear = () => {
    return api.get("yearly-revenue-data", { headers: headers });
};
const getRevenueStall = () => {
    return api.get("revenue/stalls", { headers: headers });
};
const getRevenueCashiers = () => {
    return api.get("revenue/cashiers", { headers: headers });
};
const getRevenueYearCashiersById = ({ cashierId, year }) => {
    return api.get(`yearly-revenue/staff/${cashierId}?year=${year}`, {
        headers: headers,
    });
};
const getRevenueMothCashiersById = ({ cashierId, yearMonth }) => {
    return api.get(
        `monthly-revenue/staff/${cashierId}?yearMonth=${yearMonth}`,
        {
            headers: headers,
        }
    );
};
const getRevenueYearStallById = ({ stallId, year }) => {
    return api.get(`yearly-revenue/${stallId}?year=${year}`, {
        headers: headers,
    });
};
const getRevenueMothStallById = ({ stallId, yearMonth }) => {
    return api.get(`monthly-revenue/${stallId}?yearMonth=${yearMonth}`, {
        headers: headers,
    });
};
const getRevenueMonthStallCashierById = ({ stallId, cashier, yearMonth }) => {
    return api.get(`monthly-revenue/stall/${stallId}/cashier/${cashier}?yearMonth=${yearMonth}`, {
        headers: headers,
    });
};

const getRevenueYearStallCashierById = ({ stallId, cashier, year }) => {
    return api.get(`yearly-revenue/stall/${stallId}/cashier/${cashier}?year=${year}`, {
        headers: headers,
    });
};

export {
    getRevenueDataMonth,
    getRevenueDataYear,
    getRevenueCashiers,
    getRevenueStall,
    getRevenueYearStallById,
    getRevenueMothStallById,
    getRevenueMothCashiersById,
    getRevenueYearCashiersById,
    getRevenueYearStallCashierById,
    getRevenueMonthStallCashierById,
};
