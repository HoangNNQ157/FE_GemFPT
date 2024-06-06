import React from "react";
import Header from "../../components/Header";
import Table, { ProductHeadTable } from "../../components/Table";
import { productData } from "../../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Product() {
  return (
    <div>
      <Header page={"PRODUCT"} />

      <div className=" mr-3 bg-white min-h-[500px]">
        <Table headTable={ProductHeadTable} data={productData} />
        <div className=" flex items-center justify-center text-xl">
          <Icon icon="teenyicons:left-solid" />{" "}
          <select className="px-5 bg-white mx-5">
            <option>1</option>
          </select>{" "}
          <span className="mx-5">1 OF 10</span>{" "}
          <Icon icon="teenyicons:right-solid" />
        </div>
      </div>

      <div className="flex mt-5 justify-center">
        <div className="flex mt-5 justify-center">
          <button className="px-10 py-3 rounded-lg  bg-neutral-600 text-white mr-3 flex items-center">
             CANCEL
          </button>
          <button className="px-7 py-3 rounded-lg bg-blue-400 text-white ">
            ADD TO ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
