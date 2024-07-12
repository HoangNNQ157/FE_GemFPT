import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Card,
    Col,
    Row,
    Typography,
    Descriptions,
    Avatar,
    Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./home.css"; // Add this for custom CSS

const { Title, Text } = Typography;

const HomePage = () => {
    const userData = useSelector((state) => state.user);
    const navigator = useNavigate();
    const adminLinks = [
        { path: "/adminRevenue", label: "Dasboard" },
        { path: "/adminAccount", label: "Account" },
        { path: "/customer", label: "Customer" },
        { path: "/adminMetal", label: "Metal" },
    ];

    const managerLinks = [
        { path: "/managerDashboard", label: "Dashboard" },
        { path: "/managerPromotion", label: "Promotion" },
        { path: "/manager-stall", label: "Stall" },
        { path: "/manager-discount", label: "Discount" },
        { path: "/manager-customer", label: "Customer" },
    ];

    const staffLinks = [
        { path: "/staff-order", label: "Order" },
        { path: "/staff-product", label: "Product" },
        { path: "/staff-customer", label: "Customer" },
        { path: "/staff-buy-back", label: "buy back" },
        { path: "/staff-bill", label: "Bill" },
    ];

    const getLinks = () => {
        switch (userData.role) {
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
        <div className="homepage-container">
            <Title level={1}>Welcome to the Dashboard</Title>
            {userData ? (
                <div>
                    <Card
                        className="profile-card"
                        bordered={false}
                        style={{ marginBottom: "20px" }}
                    >
                        <Row align="middle">
                            <Col span={6} className="avatar-col">
                                <Avatar
                                    size={100}
                                    icon={<UserOutlined />}
                                    className="profile-avatar"
                                />
                            </Col>
                            <Col span={18}>
                                <Descriptions column={1} bordered>
                                    <Descriptions.Item label="Username">
                                        {userData.username}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Email">
                                        {userData.email}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Phone">
                                        {userData.phone}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Role">
                                        {userData.role}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    </Card>

                    <Title level={2}>Your Manage</Title>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        {getLinks().map((link, index) => (
                            <Col span={8} key={index}>
                                <Card
                                    hoverable
                                    className="link-card"
                                    onClick={() => {
                                        navigator(link.path);
                                    }}
                                >
                                    <Title level={4}>{link.label}</Title>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                <Text>Please log in to access the dashboard.</Text>
            )}
        </div>
    );
};

export default HomePage;
