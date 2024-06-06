import React from "react";

export const OrderHeadTable = [
  
  {
    title: "IMAGE",
    ID: "image",
    width:"w-2/12"
  },
  {
    title: "PRODUCT",
    ID: "productName",
    width:"w-3/12"
  },
  {
    title: "ID",
    ID: "productId",
    width:"w-2/12"
  },
  {
    title: "PRICE",
    ID: "price",
    width:"w-2/12"
  },
  {
    title: "QUANTITY",
    ID: "quantity",
    width:"w-1/12"
  },
  {
    title: "TOTAL",
    ID: "total",
    width:"w-2/12"
  },
];

export const ProductHeadTable = [
    {
        title:"",
        ID:"",
        format:(head) => <input type="checkbox"/>,
        width:""
    },
    {
        title:"IMAGE",
        ID:'image',
        format:(product) => <img src={product.image}/>,
        width:"w-2/12"
    },
    {
        title:"PRODUCT",
        ID:'productName',
        width:"w-3/12"
    },
    {
        title:"ID",
        ID:'productId',
        width:"w-7/12"
    },
    {
        title:"QUANTITY",
        ID:'quantity',
        width:"w-2/12"
    },
    {
        title:"PRICE",
        ID:'price',
        width:"w-2/12"
    }
]

export const HistoryHeadTable = [
    {
        title:"PRODUCT",
        ID:"product",
        width: "w-4/12"
    },
    {
        title:"ID ORDER",
        ID:"orderId",
        width: "w-2/12"
    },
    {
        title:"CREATE DATE",
        ID:"createdDate",
        width: "w-2/12"
    },
    {
        title:"CUSTOMER",
        ID:"customer",
        format: (data) => <span className="uppercase">{data.customer}</span>,
        width: "w-2/12"
    },
    {
        title:"TOTAL",
        ID:"total",
        width: "w-2/12"
    },
    {
        title:"",
        ID:"",
        format:(data) => <input type="checkbox"/>
    },
]
export default function Table({ headTable, data }) {
  return (
    <table className="rounded-xl">
      <thead className="bg-neutral-300 w-">
        <tr>
            <th className="px-4 py-3 font-normal">#</th>
          {headTable.map((head) => (
            <th className={`w-fit ${head.width} text-wrap font-normal`}>{head.title}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((d, index) => (
          <tr className="p-3 border border-b">
            <th className="px-4 py-3 font-light">{index+1}</th>
            {headTable.map((head) => (
              <th className={`truncate ${head.width} font-light`}>{head?.format?head.format(d):d[head.ID]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
