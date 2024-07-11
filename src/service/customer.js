import Cookies from "js-cookie";
import api from "../config/axios";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getCustomerByPhone = ({ phone }) => {
    return api.get(`/customer/{phone}?phone=${phone}`, {
        headers: headers,
    });
};
const getAllCustomer = () => {
    return api.get("customer", {
        headers: headers,
    });
};
const createCustomer = (formData) => {
    return api.post(
        "create",
        {},
        {
            headers: headers,
            params: { ...formData },
        }
    );
};
export { getCustomerByPhone, getAllCustomer, createCustomer };
