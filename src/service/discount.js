import Cookies from "js-cookie";
import api from "../config/axios";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getAllDiscount = () => {
    return api.get("discount", {
        headers: headers,
    });
};
const requestDiscount = ({
    customerName,
    customerPhone,
    requestedDiscount,
    discountReason,
}) => {
    return api.post(
        `/discount/request?customerName=${customerName}&customerPhone=${customerPhone}&requestedDiscount=${requestedDiscount}&discountReason=${discountReason}`,
        {},
        {
            headers: headers,
        }
    );
};
const respondtDiscount = ({ discountRequestId, approved, managerResponse,expirationTime }) => {
    return api.post(
        `/discount/respond?discountRequestId=${discountRequestId}&approved=${approved}&managerResponse=${managerResponse}&expirationTime=${expirationTime}`,
        {},
        {
            headers: headers,
        }
    );
};
const getDiscountById = ({ discountId }) => {
    return api.get(`/discount/{id}?id=${discountId}`, { headers: headers });
};
export { getAllDiscount, requestDiscount, respondtDiscount, getDiscountById };
