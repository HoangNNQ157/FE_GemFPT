import React, { useState } from 'react';
import Table, { HistoryHeadTable } from '../../components/Table';
import { historyData } from '../../data/data';
import Header from '../../component/header/Header';
import { Icon } from "@iconify/react/dist/iconify.js";
import './History.css';

const ITEMS_PER_PAGE = 5; // Number of items to display per page

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE);

  // Get the current page data
  const currentData = historyData.slice(
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
      <Header page={"HISTORY"} />

      <div className="container">
        <Table headTable={HistoryHeadTable} data={currentData} />
      </div>

      <div className="pagination-controls">
        <Icon icon="teenyicons:left-solid" onClick={handlePrevPage} />
        <span className="page-indicator">{currentPage} OF {totalPages}</span>
        <Icon icon="teenyicons:right-solid" onClick={handleNextPage} />
      </div>

      <div className="button-group">
        <button className="cancel-button">CANCEL</button>
        <button className="print-button">PRINT</button>
      </div>
    </div>
  );
}
