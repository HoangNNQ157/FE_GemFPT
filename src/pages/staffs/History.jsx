import React from 'react'
import Table, { HistoryHeadTable } from '../../components/Table'
import { historyData } from '../../data/data'
import Header from '../../components/Header'

export default function History() {
  return (
    <div>
      <Header page={"HISTORY"} />

      <div className=" mr-3 bg-white min-h-[500px]">
        <Table headTable={HistoryHeadTable} data={historyData} />
        
      </div>

      <div className="flex mt-5 justify-center">
        <div className="flex mt-5 justify-center">
          <button className="px-10 py-3 rounded-lg  bg-neutral-600 text-white mr-3 flex items-center">
             CANCEL
          </button>
          <button className="px-10 py-3 rounded-lg bg-blue-400 text-white ">
            PRINT
          </button>
        </div>
      </div>
    </div>
  )
}
