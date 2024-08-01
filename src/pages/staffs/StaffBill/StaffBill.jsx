import { Button, Flex, Popconfirm, Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { CgPrinter } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderSearch from "../../../components/Header/HeaderSearch/HeaderSearch";
import useDebounce from "../../../hook/debound";
import {
    DelteteBill,
    getAllBill,
    getBillForPhone,
} from "../../../service/bill";
import { formatVND } from "../../../utils/funUtils";

const StaffBill = () => {
    const [searchBill, setSearchBill] = useState("");
    const debouncedSearcBill = useDebounce(searchBill, 500);
    const [billData, setBillData] = useState([]);
    const [warrantyTable, setWarrantyTable] = useState({
        status: false,
        data: [],
    });
    const navigator = useNavigate();
    useEffect(() => {
        getAllBill()
            .then((data) => data.data)
            .then((data) => setBillData(data));
    }, []);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Type",
            dataIndex: "typeBill",
            key: "typeBill",
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Phone",
            dataIndex: "customerPhone",
            key: "customerPhone",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (text) => formatVND(text),
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            render: (text) => <span>{text}%</span>,
        },
        {
            title: "Voucher",
            dataIndex: "voucher",
            key: "voucher",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Create Time",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <span
                    className="status"
                    style={{ color: record.status ? "green" : "red" }}
                >
                    {record.status ? "ON" : "OFF"}
                </span>
            ),
        },
        {
            title: "Cashier",
            dataIndex: "cashier",
            key: "cashier",
        },
        {
            title: "Product",
            dataIndex: "items",
            key: "items",
            render: (items) => (
                <ul>
                    {items.map((item) => (
                        <li key={item.id} style={{ listStyle: "none" }}>
                            {item.name || "name not found"}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: "Action",
            key: "actions",
            render: (text, record) => (
                <Flex gap={4}>
                    <Tooltip title="warranty">
                        <Button
                            type="link"
                            icon={<AiOutlineSafety size={22} />}
                            onClick={() =>
                                setWarrantyTable({
                                    status: true,
                                    data: record?.warrantyCards,
                                })
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Detail">
                        <Button
                            type="link"
                            icon={<CgPrinter size={22} />}
                            onClick={() => navigator(`/bill/${record.id}`)}
                        />
                    </Tooltip>
                    {/* <Popconfirm
                        title="Bạn muốn xóa sản phẩm ? "
                        onConfirm={() => handleDelteProduct(record)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<MdDeleteOutline />} />
                    </Popconfirm> */}
                </Flex>
            ),
        },
    ];
    const warrantyColumns = [
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Customer Phone",
            dataIndex: "customerPhone",
            key: "customerPhone",
        },
        {
            title: "Product Barcode",
            dataIndex: "productBarcode",
            key: "productBarcode",
        },
        {
            title: "Purchase Date",
            dataIndex: "purchaseDate",
            key: "purchaseDate",
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: "Warranty Expiry Date",
            dataIndex: "warrantyExpiryDate",
            key: "warrantyExpiryDate",
            render: (text) => new Date(text).toLocaleDateString(),
        },
    ];

    const handleDelteProduct = async (data) => {
        try {
            const res = await DelteteBill({ id: data.id });
            if (res.data) {
                toast.success("delete bill successfully");
                getAllBill()
                    .then((data) => data.data)
                    .then((data) => setBillData(data));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    };
    const handleChange = (value) => {
        setSearchBill(value);
    };
    useEffect(() => {
        try {
            if (debouncedSearcBill) {
                getBillForPhone({ phoneNumber: debouncedSearcBill })
                    .then((res) => res.data)
                    .then((data) => {
                        setBillData(data);
                        toast.success(
                            "search bill for customer phone successfully"
                        );
                    });
            } else {
                getAllBill()
                    .then((data) => data.data)
                    .then((data) => setBillData(data));
            }
        } catch (error) {
            toast.error("search bill for customer phone failed");
        }
    }, [debouncedSearcBill]);
    return (
        <>
            <HeaderSearch
                onChange={handleChange}
                searchValue={searchBill}
                placeholder="SEARCH BY CUSTOMER PHONE ..."
            />
            {warrantyTable.status && warrantyTable.data?.length > 0 ? (
                <>
                    <Button
                        type="primary"
                        style={{ margin: "10px" }}
                        onClick={() => {
                            setWarrantyTable({ data: [], status: false });
                            toast.info(
                                "You have returned to the all bill page"
                            );
                        }}
                    >
                        BACK TO ALL BILL
                    </Button>
                    <Table
                        dataSource={warrantyTable.data}
                        columns={warrantyColumns}
                        pagination={false}
                        rowKey="id"
                    />
                </>
            ) : (
                <Table
                    dataSource={billData.reverse()}
                    columns={columns}
                    pagination={{ defaultPageSize: 5 }}
                />
            )}
        </>
    );
};

export default StaffBill;
