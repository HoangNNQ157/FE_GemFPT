import React, { useState } from "react";
import Header from '../../component/header/Header';
import Table, { ProductHeadTable } from "../../components/Table";
import { productData } from "../../data/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import './Product.css';

const ITEMS_PER_PAGE = 5; // Number of items to display per page

export default function Product() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(productData.length / ITEMS_PER_PAGE);

  // Get the current page data
  const currentData = productData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Header page={"PRODUCT"} />

      <div className="mr-3 bg-white min-h-[500px]">
        <Table headTable={ProductHeadTable} data={currentData} />
        <div className="flex items-center justify-center text-xl">
          <Icon icon="teenyicons:left-solid" onClick={handlePrevPage} />
          <span className="mx-5">{currentPage} OF {totalPages}</span>
          <Icon icon="teenyicons:right-solid" onClick={handleNextPage} />
        </div>
      </div>

      <div className="flex mt-5 justify-center">
        <div className="flex mt-5 justify-center">
          <button className="px-10 py-3 rounded-lg bg-neutral-600 text-white mr-3 flex items-center">
            CANCEL
          </button>
          <button className="px-7 py-3 rounded-lg bg-blue-400 text-white">
            ADD TO ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
