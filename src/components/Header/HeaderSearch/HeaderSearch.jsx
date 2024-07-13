import { Button, Dropdown, Menu } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { BiLogOut, BiUser } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/features/counterSlice";
import AntdDropdown from "../../AntdDropdown/AntdDropdown";
import "./HeaderSearch.css";

const HeaderSearch = ({ role, searchValue, onChange, placeholder }) => {
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getInitials = (name) => {
        if (!name) return "";
        const initials = name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
        return initials.slice(0, 2);
    };

    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("token");
        localStorage.clear();
        navigate("/");
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="profile"
                icon={<BiUser />}
                onClick={() => navigate(`/profile/${userData?.id}`)}
            >
                Profile
            </Menu.Item>
            <Menu.Item key="logout" icon={<BiLogOut />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="headerlayout-container">
            <div className="headerlayout-wrapper">
                <div className="headerlayout-search-sort">
                    <div className="headerlayout-search-input">
                        <CiSearch className="search-icon" />
                        <input
                            placeholder={placeholder || "SEARCH..."}
                            className="input-search"
                            type="search"
                            value={searchValue}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="headerlayout-profile">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Button
                            shape="circle"
                            style={{ fontWeight: "700", borderColor: "#333" }}
                        >
                            {getInitials(userData.name)}
                        </Button>
                    </Dropdown>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "space-between",
                            color: "#000",
                        }}
                    >
                        <span>{userData.name}</span>
                        <span>{userData.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSearch;
