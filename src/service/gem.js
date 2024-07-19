import Cookies from "js-cookie";
import api from "../config/axios";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getAllGem = () => {
    return api.get("/api/Gem", {
        headers: headers,
    });
};
const getGemByBarcode = ({ barcode }) => {
    return api.get(`/api/Gem/${barcode}`, {
        headers: headers,
    });
};
const getGemByFilter = ({ userSelect }) => {
    return api.get(`/api/Gem/filter?status=${userSelect}`, {
        headers: headers,
    });
};
const createGem = ({ formData }) => {
    return api.post("/api/Gem", formData, { headers });
};
const updateGem = ({ formData, gemBarcode, userStatus }) => {
    return api.put(
        `/api/Gem/${gemBarcode}?userStatus=${userStatus}`,
        formData,
        {
            headers,
        }
    );
};
export { getAllGem, createGem, updateGem, getGemByBarcode, getGemByFilter };
