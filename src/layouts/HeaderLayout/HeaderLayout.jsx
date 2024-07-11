import { Button, Dropdown, Menu } from "antd";
import Cookies from "js-cookie";
import { BiLogOut, BiUser } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import AntdDropdown from "../../components/AntdDropdown/AntdDropdown";
import { logout } from "../../redux/features/counterSlice";
import "./HeaderLayout.css";
import { useNavigate } from "react-router-dom";
const HeaderLayout = ({ role }) => {
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();

    const getInitials = (name) => {
        if (!name) return "";
        const initials = name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
        return initials.slice(0, 2);
    };
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("token");
        navigate("/");
    };
    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<BiUser />}>
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
                            placeholder="SEARCH"
                            className="input-search"
                            type="search"
                        />
                    </div>
                </div>
                <div className="headerlayout-profile">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Button
                            shape="circle"
                            style={{
                                fontWeight: "700",
                                borderColor: "#333",
                                fontSize: "20px",
                                padding: "22px 16px",
                            }}
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
export default HeaderLayout;
