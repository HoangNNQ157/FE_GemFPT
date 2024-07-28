import React, { useState } from "react";
import { Button, Dropdown, Menu, Input, Modal, Form } from "antd";
import Cookies from "js-cookie";
import { BiLogOut, BiUser } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./HeaderProduct.css";
import { logout } from "../../../redux/features/counterSlice";
import AntdDropdown from "../../AntdDropdown/AntdDropdown";
import { getInitials } from "../../../utils/funUtils";

const HeaderProduct = ({
    role,
    searchValue,
    onChange,
    searchPrice,
    onChangeMinMax,
    onReset,
    showModalMetal,
    showModaGem,
    showModaCategory,
    onChangeBarcode,
    placeholder,
}) => {
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
    const [isBarocdeModalVisible, setIsBarocdeModalVisible] = useState(false);
    const [priceForm] = Form.useForm();
    const [barcodeForm] = Form.useForm();
    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("token");
        navigate("/");
        localStorage.clear();
    };

    const handlePriceFilter = () => {
        priceForm.validateFields().then((values) => {
            onChangeMinMax([values.minPrice, values.maxPrice]);
            setIsPriceModalVisible(false);
            priceForm.resetFields();
        });
    };
    const handleBarcodeFilter = () => {
        barcodeForm.validateFields().then((values) => {
            onChangeBarcode(values);
            setIsBarocdeModalVisible(false);
            barcodeForm.resetFields();
        });
    };
    const menu = (
        <Menu>
            <Menu.Item
                key="profile"
                icon={<BiUser />}
                onClick={() => navigate(`/profile/${userData?.id}`)}
            >
                Profile
            </Menu.Item>
            <Menu.Item key="logout" icon={<BiLogOut />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    const menuSort = (
        <Menu>
            <Menu.Item key="price" onClick={() => setIsPriceModalVisible(true)}>
                <span>Filter by Price</span>
            </Menu.Item>
            <Menu.Item key="metal" onClick={showModalMetal}>
                <span>Metal type</span>
            </Menu.Item>
            <Menu.Item key="gem" onClick={showModaGem}>
                <span>Gemstone</span>
            </Menu.Item>
            <Menu.Item key="category" onClick={showModaCategory}>
                <span>Category</span>
            </Menu.Item>
            <Menu.Item
                key="barcode"
                onClick={() => setIsBarocdeModalVisible(true)}
            >
                <span>Barcode</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="headerlayout-container">
            <div className="headerlayout-wrapper">
                <div className="headerlayout-search-sort">
                    <div className="headerlayout-search-input">
                        <CiSearch className="search-icon" />
                        <input
                            placeholder={placeholder ? placeholder : "SEARCH"}
                            className="input-search"
                            type="search"
                            value={searchValue}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                    <Button type="primary" onClick={onReset}>
                        Reset
                    </Button>
                    <div className="sort-item">
                        <AntdDropdown title={"SEARCH"} menu={menuSort} />
                    </div>
                </div>
                <div className="headerlayout-profile">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Button
                            shape="circle"
                            style={{ fontWeight: "700", borderColor: "#333" }}
                        >
                            {getInitials(userData.name)}
                        </Button>
                    </Dropdown>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "space-between",
                            color: "#000",
                        }}
                    >
                        <span>{userData.name}</span>
                        <span>{userData.role}</span>
                    </div>
                </div>
            </div>
            <Modal
                title="Filter by Price"
                visible={isPriceModalVisible}
                onOk={handlePriceFilter}
                onCancel={() => setIsPriceModalVisible(false)}
            >
                <Form form={priceForm}>
                    <Form.Item
                        name="minPrice"
                        label="Minimum Price"
                        rules={[
                            {
                                required: true,
                                message: "Please enter minimum price",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter minimum price"
                        />
                    </Form.Item>
                    <Form.Item
                        name="maxPrice"
                        label="Maximum Price"
                        rules={[
                            {
                                required: true,
                                message: "Please enter maximum price",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Enter maximum price"
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Barcode"
                visible={isBarocdeModalVisible}
                onOk={handleBarcodeFilter}
                onCancel={() => setIsBarocdeModalVisible(false)}
            >
                <Form form={barcodeForm}>
                    <Form.Item
                        name="barcode"
                        label="Barcode"
                        rules={[
                            {
                                required: true,
                                message: "Please enter barcode",
                            },
                        ]}
                    >
                        <Input placeholder="Enter barcode" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default HeaderProduct;
