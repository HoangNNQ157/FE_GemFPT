import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { expand, sideBar } from "../data/data";
import icon from "../assets/trangsucdaquy.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import './StaffLayout.css';

export default function StaffLayout() {
  const location = useLocation();
  return (
    <div className="staff-layout-container">
      <div className="sidebar-container">
        <div>
          <img className="sidebar-icon" src={icon} alt="Icon" />
          {sideBar.map((data) => (
            <Link 
              key={data.link} 
              to={`/${data.link}`} 
              className={`sidebar-link ${location.pathname.includes(data.link) ? 'active-link' : ''}`}>
              <Icon icon={data.icon} className="sidebar-icon-inline"/>
              {data.content}
            </Link>
          ))}
        </div>
        <div>
          {expand.map((data) => (
            <Link 
              key={data.content} 
              to="#" 
              className="expand-link">
              <Icon icon={data.icon} className="expand-icon-inline"/>
              {data.content}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
