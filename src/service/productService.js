import api from "../config/axios";
import Cookies from "js-cookie";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getListProducts = () => {
    return api.get("products", { headers: headers });
};
const getListProductsActive = () => {
    return api.get("products-true", { headers: headers });
};
const getListProductsActiveTrue = () => {
    return api.get("/mana-products-true", { headers: headers });
};
const getProductById = ({ id }) => {
    return api.get(`products/id/${id}`, { headers: headers });
};
const getProductByName = (search) => {
    return api.get(`/search/name?name=${search}`, { headers: headers });
};
const getProductStaffByName = (search) => {
    return api.get(`/staff-search/name?name=${search}`, { headers: headers });
};
const getProductByMetal = (search) => {
    return api.get(`/search/metaltype?metalType=${search}`, {
        headers: headers,
    });
};
const getProductByGem = (search) => {
    return api.get(`/search/gemstone`, {
        params: { ...search },
        headers: headers,
    });
};
const getProductByCategory = ({ category }) => {
    return api.get(`category?category=${category}`, {
        headers: headers,
    });
};
const getProductByBarcode = ({ barcode }) => {
    return api.get(`products/barcode/${barcode}`, {
        headers: headers,
    });
};
const getProductAllByBarcode = ({ barcode }) => {
    return api.get(`/product-all/${barcode}`, {
        headers: headers,
    });
};
const getProductByPrice = (searchData) => {
    return api.get(
        `/search/min-max?minPrice=${searchData.minPrice}&maxPrice=${searchData.maxPrice}`,
        {
            headers: headers,
        }
    );
};
const createProduct = (formData) => {
    return api.post(`products`, { ...formData }, { headers: headers });
};
const updateProduct = ({ formData, barcode }) => {
    return api.put(`${barcode}`, { ...formData }, { headers: headers });
};
const deleteProduct = ({ barcode }) => {
    return api.delete(`${barcode}`, { headers: headers });
};
const unLinkGems = (barcode) => {
    return api.post(
        `${barcode}/unlink-gems-promotion`,
        {},
        { headers: headers }
    );
};

const getStallById = (stallId) => {
    return api.get(`/by-stall/${stallId}`, { headers: headers });
};
export {
    createProduct,
    deleteProduct,
    getListProducts,
    updateProduct,
    getProductByName,
    getListProductsActive,
    getProductByMetal,
    getProductByPrice,
    getProductByGem,
    getProductByCategory,
    getProductById,
    getProductByBarcode,
    unLinkGems,
    getProductAllByBarcode,
    getListProductsActiveTrue,
    getProductStaffByName,
    getStallById,
};
