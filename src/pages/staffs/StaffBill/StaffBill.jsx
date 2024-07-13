import { Button, Flex, Popconfirm, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    DelteteBill,
    getAllBill,
    getBillForPhone,
} from "../../../service/bill";
import { createCustomer } from "../../../service/customer";
import moment from "moment";
import { formatVND } from "../../../utils/funUtils";
import { MdDeleteOutline } from "react-icons/md";
import { CgPrinter } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "../../../components/Header/HeaderSearch/HeaderSearch";
import useDebounce from "../../../hook/debound";

const StaffBill = () => {
    const [searchBill, setSearchBill] = useState("");
    const debouncedSearcBill = useDebounce(searchBill, 500);
    const [billData, setBillData] = useState([]);
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
            title: "Customer",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "phone",
            dataIndex: "customerPhone",
            key: "customerPhone",
        },
        {
            title: "TotalAmount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            render: (text) => formatVND(text), // Assuming you have a function to format VND
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            render: (text) => formatVND(text), // Format if needed
        },
        {
            title: "Voucher",
            dataIndex: "voucher",
            key: "voucher",
            render: (text) => formatVND(text), // Format if needed
        },
        {
            title: "Create",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"), // Format date if needed
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
            title: "Sản phẩm",
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
                    <Tooltip title="Detail">
                        <Button
                            type="link"
                            icon={<CgPrinter />}
                            onClick={() => navigator(`/bill/${record.id}`)}
                        />
                    </Tooltip>
                    {/* <Popconfirm
                        title="Bạn muốn xóa sản phẩm ? "
                        onConfirm={() => handleDelteProduct(record)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<MdDeleteOutline />} />
                    </Popconfirm> */}
                </Flex>
            ),
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
            <HeaderSearch onChange={handleChange} searchValue={searchBill} />
            <Table
                dataSource={billData.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 8 }}
            />
        </>
    );
};

export default StaffBill;
