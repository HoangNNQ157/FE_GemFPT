import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu, Input, Modal, Form, Select } from "antd";
import Cookies from "js-cookie";
import { BiLogOut, BiUser } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./HeaderProduct.css";
import { logout } from "../../../redux/features/counterSlice";
import AntdDropdown from "../../AntdDropdown/AntdDropdown";
import { getInitials } from "../../../utils/funUtils";
import { getAlllStalls } from "../../../service/manager"; // Import API để lấy danh sách quầy

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
    onChangeStallId,
    placeholder,
}) => {
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [stalls, setStalls] = useState([]); // State để lưu danh sách quầy

    const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
    const [isBarocdeModalVisible, setIsBarocdeModalVisible] = useState(false);
    const [isStallIdModalVisible, setIsStallIdModalVisible] = useState(false);
    const [priceForm] = Form.useForm();
    const [barcodeForm] = Form.useForm();
    const [stallIdForm] = Form.useForm();

    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const response = await getAlllStalls();
                setStalls(response.data); // Lưu danh sách quầy vào state
            } catch (error) {
                console.error("Failed to fetch stalls", error);
            }
        };
        fetchStalls();
    }, []);

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
    const handleStallIdFilter = () => {
        stallIdForm.validateFields().then((values) => {
            onChangeStallId(values);
            setIsStallIdModalVisible(false);
            stallIdForm.resetFields();
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
            <Menu.Item
                key="barcode"
                onClick={() => setIsBarocdeModalVisible(true)}
            >
                <span>Barcode</span>
            </Menu.Item>
            <Menu.Item
                key="stallId"
                onClick={() => setIsStallIdModalVisible(true)}
            >
                <span>Stall</span>
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
            <Modal
                title="Stall"
                visible={isStallIdModalVisible}
                onOk={handleStallIdFilter}
                onCancel={() => setIsStallIdModalVisible(false)}
            >
                <Form form={stallIdForm}>
                    <Form.Item
                        name="stallId"
                        label="Stall"
                        rules={[
                            {
                                required: true,
                                message: "Please select a stall",
                            },
                        ]}
                    >
                        <Select placeholder="Select a stall">
                            {stalls.map((stall) => (
                                <Select.Option key={stall.stallsSellId} value={stall.stallsSellId}>
                                    {stall.stallsSellName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default HeaderProduct;
