import api from "../config/axios";
import Cookies from "js-cookie";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const getPolicyActive = () => {
    return api.get("api/Policy/active", { headers: headers });
};
const CreatePolicy = ({ description }) => {
    return api.post("api/Policy", { description }, { headers: headers });
};
export { getPolicyActive, CreatePolicy };
