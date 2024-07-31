import api from "../config/axios";
import Cookies from "js-cookie";
import { parseParams } from "../utils/funUtils";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getAllHistory = () => {
    return api.get("/history-all", {
        headers: headers,
    });
};
const getHistoryByBarcode = ({ barcode }) => {
    return api.get(`/history/${barcode}`, {
        headers: headers,
    });
};
export { getAllHistory, getHistoryByBarcode };
