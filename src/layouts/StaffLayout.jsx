import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { expand, sideBar } from "../data/data";
import icon from "../assets/trangsucdaquy.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function StaffLayout() {
  const location = useLocation()
  return (
    <div className="flex bg-neutral-200 min-h-screen">
      <div className="w-1/6 mr-3 flex flex-col bg-white justify-between pb-40">
        
        <div>
        <img className="w-full" src={icon} />
          {sideBar.map((data) => (
            <Link to={`/${data.link}`} className={`pl-14 mb-3 text-lg font-light flex items-center ${location.pathname.includes(data.link)?`text-blue-500 pl-16`:``}`}><Icon icon={data.icon} className="mr-2"/>{data.content}</Link>
          ))}
        </div>

        <div>
          {expand.map((data) => (
            <Link className="flex items-center pl-14 mb-3 text-xl font-light"><Icon icon={data.icon} className="mr-5"/>{data.content}</Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
