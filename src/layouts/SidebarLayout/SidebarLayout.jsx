import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/trangsucdaquy.jpg";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminLinks = [
        { path: "/adminRevenue", label: "Dashboard" },
        { path: "/adminAccount", label: "Account" },
        /* { path: "/adminCustomer", label: "Customer" }, */
        { path: "/adminMetal", label: "Metal" },
        { path: "/adminStall", label: "Stall" },
    ];

    const managerLinks = [
        { path: "/manager-revenue", label: "Dashboard" },
        { path: "/manager-product", label: "Product" },
        { path: "/managerPromotion", label: "Promotion" },
        { path: "/manager-stall", label: "Stall" },
        { path: "/manager-discount", label: "Discount" },
        /* { path: "/manager-customer", label: "Customer" }, */
       /*  { path: "/manager-bill", label: "Bill" }, */
        { path: "/manager-gem", label: "Gem" },
        { path: "/manager-history", label: "History" },
    ];

    const staffLinks = [
        { path: "/staff-order", label: "Order" },
        { path: "/staff-product", label: "Product" },
        { path: "/staff-customer", label: "Customer" },
        { path: "/staff-buy-back", label: "Buy Back" },
        { path: "/staff-bill", label: "Bill" },
        { path: "/staff-discount", label: "Discount" },
        { path: "/staff-gem", label: "Gem" },
        { path: "/policy", label: "Policy" },
    ];

    const getLinks = (role) => {
        switch (role) {
            case "ADMIN":
                return [...adminLinks, ...managerLinks, ...staffLinks];
            case "MANAGER":
                return [...managerLinks, ...staffLinks];
            case "STAFF":
                return staffLinks;
            default:
                return [];
        }
    };
    return (
        <Layout
            style={{
                flex: "none",
                paddingTop: "10px",
                borderRight: "1px solid #000",
                marginRight: "10px",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
            >
                <div className="logo" />
                <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item
                        key="1"
                        style={{
                            height: "200px",
                            background: "white",
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: "100%", objectFit: "contain" }}
                        />
                    </Menu.Item>

                    {userData.role === "ADMIN" && (
                        <SubMenu
                            key="sub1"
                            icon={<AppstoreOutlined />}
                            title="Admin"
                        >
                            {adminLinks.map((link, index) => (
                                <Menu.Item
                                    key={`admin-${index}`}
                                    onClick={() => navigate(link.path)}
                                >
                                    {link.label}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    )}

                    {(userData.role === "ADMIN" ||
                        userData.role === "MANAGER") && (
                        <SubMenu
                            key="sub2"
                            icon={<SettingOutlined />}
                            title="Manager"
                        >
                            {managerLinks.map((link, index) => (
                                <Menu.Item
                                    key={`manager-${index}`}
                                    onClick={() => navigate(link.path)}
                                >
                                    {link.label}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    )}

                    <SubMenu key="sub3" icon={<UserOutlined />} title="Staff">
                        {staffLinks.map((link, index) => (
                            <Menu.Item
                                key={`staff-${index}`}
                                onClick={() => navigate(link.path)}
                            >
                                {link.label}
                            </Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </Sider>
        </Layout>
    );
};

export default SidebarLayout;
