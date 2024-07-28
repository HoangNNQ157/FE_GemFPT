import api from "../config/axios";
import Cookies from "js-cookie";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getListPromotion = () => {
    return api.get("api/promotion", { headers: headers });
};
const createPromotion = ({ formData }) => {
    return api.post("api/promotion", formData, { headers: headers });
};
const createAllPromotion = ({ formData }) => {
    return api.post("all-products", formData, { headers: headers });
};
const createCatePromotion = ({ formData, category }) => {
    return api.post(`api/promotion/cate?category=${category}`, formData, {
        headers: headers,
    });
};
const updatePromotion = ({ formData }) => {
    return api.put("api/promotion", formData, { headers: headers });
};
const deletePromotion = ({ id }) => {
    return api.delete(`api/promotion/${id}`, { headers: headers });
};
const getPromotionDetails = (id) => {
    return api.get(`/api/promotion/${id}`, {
        headers: headers,
    });
};

export {
    getListPromotion,
    createPromotion,
    deletePromotion,
    updatePromotion,
    createAllPromotion,
    createCatePromotion,
    getPromotionDetails
};
