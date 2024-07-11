import React from "react";
import { CiUser } from "react-icons/ci";
import { FaBuysellads, FaJediOrder } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import { expand } from "../../data/data";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import "./StaffLayout.css";
const sideBarManager = [
    {
        content: "ORDER",
        link: "staff-order",
        icon: <FaJediOrder />,
    },
    {
        content: "PRODUCTS",
        link: "staff-product",
        icon: <MdOutlineProductionQuantityLimits />,
    },
    {
        content: "CUSTOMER",
        link: "staff-customer",
        icon: <CiUser />,
    },
    {
        content: "BUYBACK",
        link: "staff-buy-back",
        icon: <FaBuysellads />,
    },
    {
        content: "BILL",
        link: "staff-bill",
        icon: <RiBillLine />,
    },
];
const StaffSidebarLayout = () => {
    return (
        <div className="layout-wrapper">
            <SidebarLayout data={sideBarManager} bottonData={expand} />
            <div className="layout-content">
                <Outlet />
            </div>
        </div>
    );
};

export default StaffSidebarLayout;
