import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import "./AdminLayout.css";
import { expand, sideBarAdmin } from "../../data/data";
import { CiUser } from "react-icons/ci";
import { MdAccountBalance, MdDashboard } from "react-icons/md";
import { FaRegGem } from "react-icons/fa";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
const AdminLayout = () => {
    const sideBarAdmin = [
        {
            content: "DASHBOARD",
            link: "adminRevenue",
            icon: <MdDashboard />,
        },
        {
            content: "ACCOUNT",
            link: "adminAccount",
            icon: <MdAccountBalance />,
        },
        {
            content: "CUSTOMER",
            link: "adminCustomer",
            icon: <CiUser />,
        },
        {
            content: "METAL",
            link: "adminMetal",
            icon: <FaRegGem />,
        },
    ];

    return (
        <div className="layout-wrapper">
            <SidebarLayout data={sideBarAdmin} bottonData={expand} />
            <div className="layout-content">
                <HeaderLayout />
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
