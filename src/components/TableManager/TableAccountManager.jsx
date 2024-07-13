// src/components/CustomTable/CustomTable.js

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    deleteAccountAdmin,
    getAccoutByEmail,
    getAllAccout,
    updateAccountAdmin,
} from "../../service/account";
import ModalAccount from "../modal/ModalAccount";
import "./TableManager.css";
import { registerApi } from "../../service/auth";
import useDebounce from "../../hook/debound";
import HeaderSearch from "../Header/HeaderSearch/HeaderSearch";
const TableAccountManager = () => {
    const [accountData, setAccountData] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [visible, setVisible] = useState(false);
    const [searchEmail, setSearchEmail] = useState();
    const debouncedSearcEmail = useDebounce(searchEmail, 500);
    const handleCancel = () => {
        if (dataUpdate) setDataUpdate(null);
        setVisible(false);
    };

    const handleSave = async (values) => {
        if (dataUpdate) {
            try {
                const response = await updateAccountAdmin({
                    fromData: values,
                    email: dataUpdate.email,
                });
                if (response.data) {
                    toast.success("Cập nhật tài khoản thành công");
                    getAllAccout()
                        .then((data) => data.data)
                        .then((data) => setAccountData(data));
                    setDataUpdate(null);
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        } else {
            try {
                const response = await registerApi({
                    formData: values,
                });
                if (response.data) {
                    toast.success("Tạo tài khoản thành công");
                    getAllAccout()
                        .then((data) => data.data)
                        .then((data) => setAccountData(data));
                    setDataUpdate(null);
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        }
        setVisible(false);
    };
    const handleDelteProduct = async (record) => {
        try {
            // call api delete
            const response = await deleteAccountAdmin({
                email: record.email,
            });
            if (response.data) {
                toast.success("xóa tài khoản thành công");
                getAllAccout()
                    .then((data) => data.data)
                    .then((data) => setAccountData(data));
            }
        } catch (error) {
            console.error(err.response?.data);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };
    useEffect(() => {
        getAllAccout()
            .then((data) => data.data)
            .then((data) => setAccountData(data));
    }, [getAllAccout]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "NAME",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "EMAIL",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "PHONE",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "STATUS",
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
            title: "ROLE",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "CREATEDATE",
            dataIndex: "createDate",
            key: "createDate",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "ACCTIONS",
            key: "actions",
            render: (text, record) => (
                <span>
                    <Button
                        onClick={() => {
                            setVisible(true);
                            setDataUpdate(record);
                        }}
                        type="link"
                        icon={<EditOutlined />}
                    />
                    <Popconfirm
                        title={`Bạn muốn xóa tài khoản ${record.email} không ?`}
                        onConfirm={() => handleDelteProduct(record)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            disabled={!record.status}
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </span>
            ),
        },
    ];
    const handleChange = (value) => {
        setSearchEmail(value);
    };
    useEffect(() => {
        try {
            if (debouncedSearcEmail) {
                getAccoutByEmail({ email: debouncedSearcEmail })
                    .then((res) => res.data)
                    .then((data) => {
                        setAccountData([data]);
                        toast.success("search bill for Email successfully");
                    })
                    .catch((err) => {
                        toast.error("search account for email failed");
                    });
            } else {
                getAllAccout()
                    .then((data) => data.data)
                    .then((data) => {
                        setAccountData(data);
                    })
                    .catch((err) => {
                        toast.error("search account for email failed");
                    });
            }
        } catch (error) {
            toast.error("search bill for Email failed");
        }
    }, [debouncedSearcEmail]);
    return (
        <>
            <HeaderSearch
                onChange={handleChange}
                searchValue={searchEmail}
                placeholder="SEARCH BY EMAIL ..."
            />
            <button className="btn-add" onClick={() => setVisible(true)}>
                Add Account
            </button>
            <Table
                dataSource={accountData.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
            <ModalAccount
                initialData={dataUpdate ? dataUpdate : null}
                visible={visible}
                onCancel={handleCancel}
                onSave={handleSave}
                type={dataUpdate ? "update" : "create"}
            />
        </>
    );
};

export default TableAccountManager;
