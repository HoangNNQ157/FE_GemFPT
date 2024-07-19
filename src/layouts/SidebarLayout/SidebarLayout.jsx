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
        { path: "/adminRevenue", label: "Admin Dashboard" },
        { path: "/adminAccount", label: "Admin Account" },
        { path: "/adminCustomer", label: "Admin Customer" },
        { path: "/adminMetal", label: "Admin Metal" },
    ];

    const managerLinks = [
        { path: "/manager-revenue", label: "Manager Dashboard" },
        { path: "/manager-product", label: "Manager Product" },
        { path: "/managerPromotion", label: "Manager Promotion" },
        { path: "/manager-stall", label: "Manager Stall" },
        { path: "/manager-discount", label: "Manager Discount" },
        { path: "/manager-customer", label: "Manager Customer" },
        { path: "/manager-bill", label: "Manager Bill" },
        { path: "/manager-gem", label: "Manager Gem" },
    ];

    const staffLinks = [
        { path: "/staff-order", label: "Staff Order" },
        { path: "/staff-product", label: "Staff Product" },
        { path: "/staff-customer", label: "Staff Customer" },
        { path: "/staff-buy-back", label: "Staff Buy Back" },
        { path: "/staff-bill", label: "Staff Bill" },
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
