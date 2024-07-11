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
const getProductByName = (search) => {
    return api.get(`/search/name?name=${search}`, { headers: headers });
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
};
