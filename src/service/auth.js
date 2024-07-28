import api from "../config/axios";
import Cookies from "js-cookie";
const TOKEN = Cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${TOKEN}`,
};

const registerApi = ({ formData }) => {
    return api.post("register", formData);
};
const loginWithEmail = ({ formData }) => {
    return api.post("login", formData);
};
const loginWithGoogle = ({ token }) => {
    return api.post("staff-login-google", { token });
};
const loginWithGoogleRegister = ({ token }) => {
    return api.post("login_google", { token });
};
const forgotPassword = ({ email }) => {
    return api.post("forgot_password", { email });
};
const getProfileById = ({ userId }) => {
    return api.get(`${userId}`, { headers });
};
export {
    registerApi,
    loginWithEmail,
    loginWithGoogle,
    forgotPassword,
    getProfileById,
    loginWithGoogleRegister,
};
