import React from "react";
import Header from "../../components/Header";
import Table, { OrderHeadTable } from "../../components/Table";
import { orderData } from "../../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Order() {
  return (
    <div>
      <Header page={"ORDER"} />
      <div className="flex">
        <div className="w-4/5 mr-3 bg-white min-h-[500px]">
          <Table headTable={OrderHeadTable} data={orderData} />
        </div>
        <div className="w-1/5 rounded-xl p-2 bg-white flex flex-col justify-between pb-10">
          <div>
            <div className="text-lg tracking-wide font-medium">
              TOTAL OF ORDER: <span className="font-light">4</span>
            </div>
            <div className="font-light mb-5">63.052.000Đ</div>
            <div className="font-light flex mb-3">
              DISCOUNT:
              <div className="w-full border-b"></div>
            </div>
            <div className="font-light flex mb-3">
              COUPON:
              <div className="w-full border-b"></div>
            </div>
            <div className="font-light mb-1">GUEST NEED TO PAY :</div>
            <div className="font-light text-lime-400">63.052.000Đ</div>
          </div>

          <div>
            <div className="font-medium flex mb-3">
              CASH:
              <div className="w-full border-b"></div>
            </div>

            <div className="font-medium flex mb-1">
              CARD:
              <div className="w-full border-b"></div>
            </div>
            <div className="font-light text-sm mb-1">
              OTHER FORMS TO PAYMENT
            </div>
            <div className="font-medium mb-1">PAY BACK TO GUEST</div>
            <div className="font-light text-red-400 mb-1">63.052.000Đ</div>
            <div className="font-medium flex mb-1">
              NOTE:
              <div className="w-full border-b"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-5">
        <div className="w-4/5 rounded-xl py-1 pl-20 pr-3 mr-3 bg-white">
          <div className="flex items-center mb-1">
            <div className="w-1/5 font-light">CUSTOMER NAME:</div>
            <input className="w-4/5 rounded-xl border-2 p-1" />
          </div>
          <div className="flex items-center">
            <div className="w-1/5 font-light">PHONE:</div>
            <input className="w-4/5 rounded-xl border-2 p-1" />
          </div>
          <hr className="my-3" />
          <div className="grid grid-cols-3 gap-3">
            <div className="font-light uppercase flex items-center"><Icon className="text-xl" icon="material-symbols:person" /> name: nguyễn minh hiếu</div>
            <div className="font-light uppercase flex items-center"><Icon className="text-xl" icon="ic:baseline-phone" /> phone: 0939393939</div>
            <div className="font-light uppercase flex items-center"><Icon className="text-xl" icon="mdi:dot" /> Loyalty Points: 149</div>
            <div className="font-light uppercase flex items-center"><Icon className="text-xl" icon="mdi:calendar" /> create date: 23/05/2024</div>
          </div>
          <div className="flex mt-5 justify-center">
            <button className="px-4 py-1 rounded-lg bg-blue-400 text-white font-bold mr-3 flex items-center">
            <Icon className="text-xl" icon="material-symbols:search" /> SEARCH 
            </button>
            <button className="px-4 py-1 rounded-lg bg-neutral-600 text-white font-bold">
              CREATE +
            </button>
          </div>
        </div>

        <div className="w-1/5 flex justify-center items-end pb-5">
        <button className="px-10 py-2 rounded-lg bg-blue-400 text-white mr-3">
              SUBMIT
            </button>
        </div>
      </div>
    </div>
  );
}
