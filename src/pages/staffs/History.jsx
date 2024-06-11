import React from 'react';
import Table, { HistoryHeadTable } from '../../components/Table';
import { historyData } from '../../data/data';
import Header from '../../component/header/Header';
import './History.css';

export default function History() {
  return (
    <div>
      <Header page={"HISTORY"} />

      <div className="container">
        <Table headTable={HistoryHeadTable} data={historyData} />
      </div>

      <div className="button-group">
        <button className="cancel-button">CANCEL</button>
        <button className="print-button">PRINT</button>
      </div>
    </div>
  );
}
