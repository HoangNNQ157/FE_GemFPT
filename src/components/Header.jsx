import React from "react";
import { blankAvatar } from "../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Header({ page }) {
  return (
    <div>
      <div className="flex mb-5 pt-5">
        <div className="w-4/5 border-r-4 border-neutral-400">
          <div className="border-l-2 border-blue-500 text-blue-500 pl-3 text-lg font-medium mb-3">
            {page}
          </div>
          <div className="flex">
            <input
              className="px-5 py-3 text-lg font-medium bg-neutral-100 w-2/3 text-neutral-500 rounded-xl"
              placeholder="SEARCH"
            />
            <div className="w-1/3 text-neutral-500 font-medium flex justify-center items-center"><div>SORT BY</div> <Icon className="text-2xl ml-2" icon="teenyicons:down-solid" /></div>
            <div className="w-1/3 text-neutral-500 font-medium flex justify-center items-center"><div>VOUCHER</div> <Icon className="text-2xl ml-2" icon="teenyicons:down-solid" /></div>
          </div>
        </div>
        <div className="w-1/5 p-3">
          <div className="flex pl-5">
            <div className="w-1/4 mr-2"><img src={blankAvatar} className=" rounded-full" /></div>
            
            <div className="w-3/4">
              <div className="tracking-wide text-neutral-700 font-medium">KEVIN BRUNO</div>
              <div className="uppercase text-sm italic font-extralight">counter : 5</div>
              <div className=" font-light flex items-center justify-between pr-10"><span>STAFF</span> <Icon className="text-xl" icon="mingcute:exit-line" /></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
