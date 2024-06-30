import React from "react";
import './Table.css';
import { FaTrashCan } from "react-icons/fa6";



export const OrderHeadTable = [
  {
    title: "IMAGE",
    ID: "image",
    width: "w-2/12"
  },
  {
    title: "PRODUCT",
    ID: "productName",
    width: "w-3/12"
  },
  {
    title: "ID",
    ID: "productId",
    width: "w-2/12"
  },
  {
    title: "PRICE",
    ID: "price",
    width: "w-2/12"
  },
  {
    title: "QUANTITY",
    ID: "quantity",
    width: "w-1/12"
  },
  {
    title: "TOTAL",
    ID: "total",
    width: "w-2/12"
  },
  {
    title: "",
    ID: "",
    format: (data, onDelete) => (
      <button onClick={() => onDelete(data.email)}><FaTrashCan /></button>
    ),
    
  }
];

export const ProductHeadTable = [
  {
    title: "",
    ID: "",
    format: (head) => <input type="checkbox" />,
    width: ""
  },
  {
    title: "IMAGE",
    ID: 'image',
    format: (product) => <img src={product.image} alt="Product" />,
    width: "w-2/12"
  },
  {
    title: "PRODUCT",
    ID: 'productName',
    width: "w-3/12"
  },
  {
    title: "ID",
    ID: 'productId',
    width: "w-7/12"
  },
  {
    title: "QUANTITY",
    ID: 'quantity',
    width: "w-2/12"
  },
  {
    title: "PRICE",
    ID: 'price',
    width: "w-2/12"
  },
  {
    title: "",
    ID: "",
    format: (data, onDelete) => (
      <button onClick={() => onDelete(data.email)}><FaTrashCan /></button>
    ),
    
  }
]

export const HistoryHeadTable = [
  {
    title: "PRODUCT",
    ID: "product",
    width: "w-4/12"
  },
  {
    title: "ID ORDER",
    ID: "orderId",
    width: "w-2/12"
  },
  {
    title: "CREATE DATE",
    ID: "createdDate",
    width: "w-2/12"
  },
  {
    title: "CUSTOMER",
    ID: "customer",
    format: (data) => <span className="uppercase">{data.customer}</span>,
    width: "w-2/12"
  },
  {
    title: "TOTAL",
    ID: "total",
    width: "w-2/12"
  },
  {
    title: "",
    ID: "",
    format: (data) => <input type="checkbox" />
    
  },
  {
    title: "",
    ID: "",
    format: (data, onDelete) => (
      <button onClick={() => onDelete(data.email)}><FaTrashCan /></button>
    ),
    
  }
]

export const AccountHeadTable = [
  {
    title: "EMAIL",
    ID: "email",
    width: "w-4/12"
  },
  {
    title: "NAME",
    ID: "name",
    width: "w-2/12"
  },
  {
    title: "CREATE DATE",
    ID: "createdDate",
    width: "w-2/12"
  },
  {
    title: "ROLE",
    ID: "role",
    width: "w-2/12"
  },
  {
    title: "STATUS",
    ID: "status",
    width: "w-2/12"
  },
  {
    title: "ACTION",
    ID: "action",
    format: (data, onDelete) => (
      <button onClick={() => onDelete(data.email)}><FaTrashCan /></button>
    ),
    width: "w-2/12"
  },
]



/* export default function Table({ headTable, data }) {
  return (
    <table className="table-container">
      <thead className="table-header">
        <tr>
          <th className="header-cell">#</th>
          {headTable.map((head) => (
            <th key={head.ID} className={`header-cell ${head.width}`}>{head.title}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map((d, index) => (
          <tr key={index} className="body-row">
            <th className="body-cell">{index + 1}</th>
            {headTable.map((head) => (
              <td key={head.ID} className={`body-cell ${head.width}`}>
                {head?.format ? head.format(d) : d[head.ID]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
 */

export default function Table({ headTable, data, onDelete }) {
  return (
    <table className="table-container">
      <thead className="table-header">
        <tr>
          <th className="header-cell">#</th>
          {headTable.map((head) => (
            <th key={head.ID} className={`header-cell ${head.width}`}>{head.title}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map((d, index) => (
          <tr key={index} className="body-row">
            <th className="body-cell">{index + 1}</th>
            {headTable.map((head) => (
              <td key={head.ID} className={`body-cell ${head.width}`}>
                {head?.format ? head.format(d, onDelete) : d[head.ID]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
