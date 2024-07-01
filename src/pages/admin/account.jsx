import React, { useState } from 'react';
import Table, { AccountHeadTable } from '../../components/Table';
import { accountData } from '../../data/data';
import Header from '../../component/header/Header';
import './account.css';

const ITEMS_PER_PAGE = 5;

export default function Account() {
  const [accounts, setAccounts] = useState(accountData);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedAccounts = accounts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(accounts.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
    setCurrentPage(1); // Optional: Reset to first page after deletion
  };

  return (
    <div>
      <Header page={"ACCOUNT"} />

      <div className="container">
        <div className="table-container">
          <Table headTable={AccountHeadTable} data={displayedAccounts} deleteAccount={deleteAccount} />
        </div>
        <div className="add-account-form">
          {/* Add account form content goes here */}
        </div>
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
