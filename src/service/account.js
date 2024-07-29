import api from "../config/axios";
import Cookies from "js-cookie";
const TOKEN = Cookies.get("token");
const headers = {
  "Content-Type": "application/json",
  accept: "*/*",
  Authorization: `Bearer ${TOKEN}`,
};
const getAllAccout = () => {
  return api.get("getAll", { headers: headers });
};
const getAccoutByEmail = ({ email }) => {
  return api.get(`/email/${email}`, { headers: headers });
};
const updateAccountAdmin = ({ fromData, email }) => {
  return api.put(`/admin_edit_account/${email}`, fromData, {
    headers: headers,
  });
};
const deleteAccountAdmin = ({ email }) => {
  return api.delete(`delete_account/${email}`, {
    headers: headers,
  });
};
const updateAccountStaff = ({ email, formData }) => {
  return api.put(`/staff_edit_account/${email}`, formData, { headers });
};
export {
  getAllAccout,
  updateAccountAdmin,
  deleteAccountAdmin,
  updateAccountStaff,
  getAccoutByEmail,
};
