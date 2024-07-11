import Cookies from "js-cookie";
import api from "../config/axios";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getChangeMoney = ({ stallsSellId }) => {
    return api.get(`/api/MoneyChange/${stallsSellId}/change-history`, {
        headers: headers,
    });
};
const changeMoneyStall = ({ typeChange, formData }) => {
    return api.post(
        `/api/MoneyChange/change-money?typeChange=${typeChange}`,
        formData,
        {
            headers: headers,
        }
    );
};
export { getChangeMoney, changeMoneyStall };
