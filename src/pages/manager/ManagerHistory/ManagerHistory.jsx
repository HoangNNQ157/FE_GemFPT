import { Flex, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderSearch from "../../../components/Header/HeaderSearch/HeaderSearch";
import useDebounce from "../../../hook/debound";
import { getAllHistory, getHistoryByBarcode } from "../../../service/history";

const userStatusOptions = [
    { value: "USE", label: "USE" },
    { value: "NOTUSE", label: "NOT USE" },
    { value: "PROCESDONE", label: "PROCESDONE" },
    { value: "FALSE", label: "FALSE" },
    { value: "PROCESSING", label: "PROCESSING" },
];

const ManagerHistory = () => {
    const [historyData, setHistoryData] = useState([]);
    const [searchBarcode, setSearchBarcode] = useState("");
    const debouncedSearchHistory = useDebounce(searchBarcode, 500);

    useEffect(() => {
        fetchAllHistory();
    }, []);

    useEffect(() => {
        if (debouncedSearchHistory) {
            fetchHistoryByBarcode(debouncedSearchHistory);
        } else {
            fetchAllHistory();
        }
    }, [debouncedSearchHistory]);

    const fetchAllHistory = async () => {
        try {
            const res = await getAllHistory();
            setHistoryData(res.data);
        } catch (error) {
            toast.error("Error fetching all gems");
        }
    };

    const fetchHistoryByBarcode = async (barcode) => {
        try {
            const res = await getHistoryByBarcode({ barcode });
            if (res.data && res.data.length > 0) {
                setHistoryData(res.data);
               /*  toast.success("Search by barcode succeeded"); */
            } else {
                setHistoryData([]);
                toast.error("Gem not found");
            }
        } catch (error) {
            toast.error(error?.response?.data);
        }
    };

    const columns = [
        {
            title: "Barcode",
            dataIndex: "barcode",
            key: "barcode",
            render: (text) => (
                <p
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 4,
                        lineClamp: 4,
                    }}
                >
                    {text}
                </p>
            ),
        },
        {
            title: "Description",
            dataIndex: "descriptions",
            key: "descriptions",
            render: (text) => (
                <p
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 4,
                        lineClamp: 4,
                    }}
                >
                    {text}
                </p>
            ),
        },
        {
            title: "Create Time",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Update Time",
            dataIndex: "updateTime",
            key: "updateTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
    ];

    return (
        <div style={{ padding: "10px" }}>
            <HeaderSearch
                onChange={(value) => setSearchBarcode(value)}
                searchValue={searchBarcode}
                placeholder="SEARCH BY BARCODE"
            />
            <Flex gap={6} align="center" style={{ marginTop: "10px" }}></Flex>
            <Table
                style={{ marginTop: "10px" }}
                dataSource={historyData.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
        </div>
    );
};

export default ManagerHistory;
