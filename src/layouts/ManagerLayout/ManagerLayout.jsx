import React from "react";
import { Outlet } from "react-router-dom";
import "./ManagerLayout.css";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
import { expand } from "../../data/data";
import { MdDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbDiscount } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { GrInstall } from "react-icons/gr";
import { CiDiscount1 } from "react-icons/ci";
const sideBarManager = [
    {
        content: "PRODUCTS",
        link: "managerDashboard",
        icon: <MdOutlineProductionQuantityLimits />,
    },
    {
        content: "PROMOTION",
        link: "managerPromotion",
        icon: <TbDiscount />,
    },
    {
        content: "DISCOUNT",
        link: "manager-discount",
        icon: <CiDiscount1 />,
    },
    {
        content: "STALL",
        link: "manager-stall",
        icon: <GrInstall />,
    },
];
const ManagerLayout = () => {
    return (
        <div className="layout-wrapper">
            <SidebarLayout data={sideBarManager} bottonData={expand} />
            <div className="layout-content">
                <HeaderLayout role={"MANAGER"} />
                <Outlet />
            </div>
        </div>
    );
};

export default ManagerLayout;
