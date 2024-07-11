import React from "react";
import { FaRocketchat } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import icon from "../../assets/trangsucdaquy.jpg";
import "./SidebarLayout.css";
import { TbPageBreak, TbTruckReturn } from "react-icons/tb";

const SidebarLayout = ({ data, bottonData }) => {
    return (
        <div className="sidebar-wrapper">
            <div className="slidebar-content">
                <div>
                    <Link to="/home">
                        <img className="sidebar-icon" src={icon} alt="Icon" />
                    </Link>
                    <div className="sidebar-nav">
                        {data?.length
                            ? data.map((item, index) => (
                                  <NavLink
                                      key={index}
                                      to={`/${item.link}`} // Use the correct path here
                                      className={({ isActive }) =>
                                          isActive
                                              ? "nav-link active"
                                              : "nav-link"
                                      }
                                  >
                                      {item.icon}
                                      <span style={{ marginLeft: "8px" }}>
                                          {item.content}
                                      </span>
                                  </NavLink>
                              ))
                            : null}
                    </div>
                </div>
                <div className="sidebar-footer">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <TbTruckReturn className="nav-icon" />
                        <span>PAGE BACK</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;
