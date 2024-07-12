import api from "../config/axios";
import Cookies from "js-cookie";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getAllMetal = () => {
    return api.get("api/metalprices", { headers: headers });
};
const getMetalActive = () => {
    return api.get("/api/metalprices/active-types", { headers });
};
const updateMetal = ({ formData }) => {
    return api.post("api/metalprices", formData, { headers: headers });
};
export { getAllMetal, updateMetal, getMetalActive };
