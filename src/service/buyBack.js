import api from "../config/axios";
import Cookies from "js-cookie";
import { parseParams } from "../utils/funUtils";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getAllBuyBack = () => {
    return api.get(`api/Test/+Staff-get-all-bill-buy-back`, {
        headers: headers,
    });
};

const createBuyBack = ({ formData, customerName, customerPhone }) => {
    return api.post(
        `api/Test/Staff-create-bill-buy-back?customerName=${customerName}&customerPhone=${customerPhone}`,
        formData,
        {
            headers: headers,
        }
    );
};

const updateBuyBack = ({ formData, barcode }) => {
    return api.put(
        `api/Test/update-product-buyback-to-sell${barcode}`,
        formData,
        {
            headers: headers,
        }
    );
};
export { getAllBuyBack, createBuyBack, updateBuyBack };
