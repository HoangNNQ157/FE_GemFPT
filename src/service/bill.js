import api from "../config/axios";
import Cookies from "js-cookie";
import { parseParams } from "../utils/funUtils";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const createBill = (formData) => {
    return api.post(`api/bill`, formData, { headers: headers });
};
const createBillVNPay = ({ amount, orderInfo }) => {
    return api.post(
        `submitOrder?amount=${amount}&orderInfo=${orderInfo}`,
        {},
        {
            headers: headers,
        }
    );
};
const getBillForPhone = ({ phoneNumber }) => {
    return api.get(`/api/bill/customer/${phoneNumber}`, {
        headers: headers,
    });
};
const getBillForId = ({ id }) => {
    return api.get(`/api/bill/{billId}?id=${id}`, {
        headers: headers,
    });
};
const getAllBill = () => {
    return api.get(`/api/bill/all`, {
        headers: headers,
    });
};
const DelteteBill = ({ id }) => {
    return api.delete(`api/bill/{billId}?billId=${id}`, {
        headers: headers,
    });
};
export {
    createBill,
    getBillForPhone,
    getBillForId,
    createBillVNPay,
    getAllBill,
    DelteteBill,
};
