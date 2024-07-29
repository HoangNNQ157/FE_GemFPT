import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
    deleteAccountAdmin,
    getAccoutByEmail,
    getAllAccout,
    updateAccountAdmin,
} from "../../service/account";
import ModalAccount from "../modal/ModalAccount";
import ModalGoogleRegister from "../modal/ModalGoogleRegister";
import "./TableManager.css";
import { registerApi } from "../../service/auth";
import useDebounce from "../../hook/debound";
import HeaderSearch from "../Header/HeaderSearch/HeaderSearch";

const TableAccountManager = () => {
    const [accountData, setAccountData] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [visible, setVisible] = useState(false);
    const [googleModalVisible, setGoogleModalVisible] = useState(false);
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
                    toast.success("Account updated successfully");
                    getAllAccout()
                        .then((data) => data.data)
                        .then((data) => setAccountData(data));
                    setDataUpdate(null);
                }
            } catch (error) {
                
                toast.error(error.response?.data);
            }
        } else {
            try {
                const response = await registerApi({
                    formData: values,
                });
                if (response.data) {
                    toast.success("Account successfully created");
                    getAllAccout()
                        .then((data) => data.data)
                        .then((data) => setAccountData(data));
                    setDataUpdate(null);
                }
            } catch (error) {
                
                toast.error(error.response?.data);
            }
        }
        setVisible(false);
    };
    
    const handleDelteProduct = async (record) => {
        try {
            const response = await deleteAccountAdmin({
                email: record.email,
            });
            if (response.data) {
                toast.success("Account deleted successfully");
                getAllAccout()
                    .then((data) => data.data)
                    .then((data) => setAccountData(data));
            }
        } catch (error) {
            console.error(error.response?.data);
            toast.error("An error occurred. Please try again later.");
        }
    };

    useEffect(() => {
        getAllAccout()
            .then((data) => data.data)
            .then((data) => setAccountData(data));
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
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
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Create Date",
            dataIndex: "createDate",
            key: "createDate",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Action",
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
                        title={`Do you want to delete your ${record.email} account?`}
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
                        toast.success("Search Email successfully");
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
            toast.error("search account for Email failed");
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
            <button className="btn-add" onClick={() => setGoogleModalVisible(true)}>
                Register Account Google
            </button>
            <Table
                dataSource={accountData.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 6 }}
            />
            <ModalAccount
                initialData={dataUpdate ? dataUpdate : null}
                visible={visible}
                onCancel={handleCancel}
                onSave={handleSave}
                type={dataUpdate ? "update" : "create"}
            />
            <ModalGoogleRegister
                visible={googleModalVisible}
                onCancel={() => setGoogleModalVisible(false)}
                onSave={() => {
                    setGoogleModalVisible(false);
                    getAllAccout()
                        .then((data) => data.data)
                        .then((data) => setAccountData(data));
                }}
            />
        </>
    );
};

export default TableAccountManager;
