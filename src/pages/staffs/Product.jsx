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
      <div className="product-container">
        <Table headTable={ProductHeadTable} data={currentData} />
        <div className="pagination">
          <Icon icon="teenyicons:left-solid" onClick={handlePrevPage} />
          <span>{currentPage} OF {totalPages}</span>
          <Icon icon="teenyicons:right-solid" onClick={handleNextPage} />
        </div>
      </div>
      <div className="button-container">
        <button className="cancel-button">CANCEL</button>
        <button className="add-button">ADD TO ORDER</button>
      </div>
    </div>
  );
}
