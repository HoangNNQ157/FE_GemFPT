import api from "../config/axios";
import Cookies from "js-cookie";
import { parseParams } from "../utils/funUtils";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const createStalls = ({ formData }) => {
    return api.post("api/Manager/create-Stalls", formData, {
        headers: headers,
    });
};
const updateStaffWorking = ({ formData, accountIds }) => {
    return api.patch("api/Manager/management-account-working", formData, {
        params: accountIds,
        paramsSerializer: (accountIds) => parseParams(accountIds, "accountIds"),
        headers: headers,
    });
};
const getManagerActiveAccount = () => {
    return api.get("api/Manager/active-accounts", {
        headers: headers,
    });
};
const updateStallStatus = ({ stallsSellId, status }) => {
    return api.put(
        `api/Manager/${stallsSellId}/status?status=${status}`,
        {},
        {
            headers: headers,
        }
    );
};
const getAlllStalls = () => {
    return api.get("api/Manager/all-Stalls", {
        headers: headers,
    });
};
const getStallAccounts = (stallsSellId) => {
    return api.get(`api/Manager/${stallsSellId}/accounts`, {
        headers: headers,
    });
};


export {
    createStalls,
    getManagerActiveAccount,
    getAlllStalls,
    updateStaffWorking,
    updateStallStatus,
    getStallAccounts,
    
};
