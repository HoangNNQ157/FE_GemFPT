import { Button, Dropdown, Menu } from "antd";
import { BiLogOut, BiUser } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/trangsucdaquy.jpg";
import Cookies from "js-cookie";
import { getInitials } from "../../../utils/funUtils";
import { logout } from "../../../redux/features/counterSlice";
import { CgArrowLeft } from "react-icons/cg";

const HeaderDefault = ({ backPage }) => {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("token");
        localStorage.clear();
        navigator("/");
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="profile"
                icon={<BiUser />}
                onClick={() => navigator(`/profile/${userData?.id}`)}
            >
                PROFILE
            </Menu.Item>
            <Menu.Item
                key="home"
                icon={<MdDashboard />}
                onClick={() => navigator("/staff-product")}
            >
                DASHBOARD
            </Menu.Item>
            <Menu.Item key="logout" icon={<BiLogOut />} onClick={handleLogout}>
                LOGOUT
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="header__price">
            {!backPage ? (
                <img
                    src={logo}
                    className="img__logo"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigator("/")}
                />
            ) : (
                <Button
                    onClick={() => navigator(-1)}
                    style={{ border: "none", boxShadow: "none" }}
                >
                    BACK PAGE <CgArrowLeft />
                </Button>
            )}
            {userData ? (
                <div className="headerlayout-profile">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Button
                            shape="circle"
                            style={{
                                fontWeight: "700",
                                borderColor: "#333",
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
            ) : (
                <Button onClick={() => navigator("/login")}>Login</Button>
            )}
        </div>
    );
};

export default HeaderDefault;
