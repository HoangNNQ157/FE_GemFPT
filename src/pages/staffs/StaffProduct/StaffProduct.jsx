import { Button, Form, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CarouselImg from "../../../components/Carousel/Carousel";
import HeaderProductStaff from "../../../components/Header/HeaderProduct/HeaderProductStaff";
import SearchGemstoneForm from "../../../components/modal/SearchGemstoneForm";
import { CategoryOption } from "../../../data/data";
import useDebounce from "../../../hook/debound";
import {
    getListProductsActive,
    getProductByBarcode,
    getProductAllByBarcode,
    getProductByGem,
    getProductByMetal,
    getProductByCategory,
    getProductStaffByName,
    getProductByPrice,
} from "../../../service/productService";
import { formatVND } from "../../../utils/funUtils";
import "./StaffProduct.css";

const StaffProduct = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchBarcode, setSearchBarcode] = useState("");
    const [isModalCategory, setIsModalCategory] = useState(false);
    const [searchProduct, setSearchProduct] = useState("");
    const [searchProductByMetal, setSearchProductByMetal] = useState("");
    const [searchPrice, setSearchPrice] = useState({
        minPrice: 0,
        maxPrice: 0,
    });
    const [searchGem, setSearchGem] = useState();
    const [isModalMetal, setIsModalMetal] = useState(false);
    const [isModalGem, setIsModalGem] = useState(false);
    const debouncedSearchProduct = useDebounce(searchProduct, 500);
    const debouncedSearchPrice = useDebounce(searchPrice, 500);
    const [form] = Form.useForm();
    const navigator = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("card"));
        if (data?.length) {
            setSelectedProducts(data);
            setSelectedRowKeys(data.map((product) => product.key));
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (debouncedSearchProduct) {
                    response = await getProductStaffByName(debouncedSearchProduct);
                } else if (
                    debouncedSearchPrice.minPrice >= 0 &&
                    debouncedSearchPrice.maxPrice > debouncedSearchPrice.minPrice
                ) {
                    response = await getProductByPrice(debouncedSearchPrice);
                    /* toast.info("Search by price"); */
                } else if (searchProductByMetal) {
                    response = await getProductByMetal(searchProductByMetal);
                    /* toast.info("Filter by metal"); */
                } else if (searchBarcode) {
                    response = await getProductAllByBarcode({ barcode: searchBarcode });
                    /* toast.info("Filter by barcode"); */
                } else if (searchGem && searchGem.color) {
                    response = await getProductByGem(searchGem);
                    /* toast.info("Filter by gem"); */
                } else {
                    response = await getListProductsActive();
                }

                if (response?.data?.length > 0 && response?.data[0]?.productId) {
                    const products = response.data?.map((product, index) => ({
                        ...product,
                        key: index + 1,
                    }));
                    setDataProducts(products);
                    setErrorMessage(""); // Clear error message if products are found
                } else if (response?.data?.productId) {
                    setDataProducts([response.data]);
                    setErrorMessage(""); // Clear error message if a product is found
                } else {
                    toast.error("Product not found");
                }
            } catch (error) {
                if (error?.response?.data) {
                    toast.error(error?.response?.data);
                }
            }
        };

        fetchProducts();
    }, [
        debouncedSearchProduct,
        debouncedSearchPrice,
        searchProductByMetal,
        searchGem,
        searchBarcode,
    ]);

    const columns = [
        {
            title: "ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Barcode",
            dataIndex: "barcode",
            key: "barcode",
            render: (text) => (
                <span
                    style={{
                        maxWidth: "200px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Images",
            dataIndex: "urls",
            key: "urls",
            render: (urls) =>
                urls.length > 0 ? (
                    <div
                        style={{
                            width: "200px",
                            margin: "0 auto",
                        }}
                    >
                        <CarouselImg listImg={urls} />
                    </div>
                ) : (
                    "No Image"
                ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => (
                <span
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text, record) => <span>{formatVND(record.price)}</span>,
        },
        {
            title: "Promotion Price",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text, record) => {
                if (record.newPrice === 0 || !record.newPrice) {
                    return <span>N/A</span>;
                } else {
                    return <span>{formatVND(record.newPrice)}</span>;
                }
            },
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
            title: "Action",
            key: "actions",
            render: (text, record) => (
                <Button
                    icon={<MdProductionQuantityLimits />}
                    onClick={() =>
                        navigator(`/product-detail/${record.productId}`)
                    }
                />
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys, // Set the selected row keys
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys); // Update selected row keys
            setSelectedProducts(selectedRows); // Update selected products
        },
        getCheckboxProps: (record) => ({
            disabled: !record.status, // Disable checkbox if status is false
        }),
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const onChange = (value) => {
        setSearchProduct(value);
    };

    const onChangeMinMax = (values) => {
        setSearchPrice({
            minPrice: values[0],
            maxPrice: values[1],
        });
    };
    const onChangeBarcode = (values) => {
        setSearchBarcode(values.barcode);
    };
    const handleContinue = () => {
        if (selectedProducts.length === 0) {
            toast.error("No products selected");
            return;
        }
        localStorage.setItem("card", JSON.stringify(selectedProducts));
        navigator('/staff-order');
        toast.success("Add order card successfully");
        setIsModalVisible(false);
        form.resetFields();
        setSelectedProducts([]);
    };

    const onReset = () => {
        if (searchPrice)
            setSearchPrice({
                minPrice: 0,
                maxPrice: 0,
            });
        if (searchProduct) setSearchProduct("");
        if (searchProductByMetal) setSearchProductByMetal("");
        if (searchBarcode) setSearchBarcode("");
        if (searchGem) setSearchGem({});
    };

    const showModalMetal = () => {
        setIsModalMetal(true);
    };

    const handleOkGem = (values) => {
        const clearData = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value !== undefined)
        );
        setSearchGem(clearData);
        setIsModalGem(false);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            setSearchProductByMetal(values.metal);
            setIsModalMetal(false);
            form.resetFields();
        });
    };
    const handleOkCategory = () => {
        form.validateFields().then((values) => {
            getProductByCategory({ category: values.category })
                .then((res) => res.data)
                .then((data) => setDataProducts(data));
            setIsModalCategory(false);
            form.resetFields();
        });
    };

    return (
        <>
            <HeaderProductStaff
                role={"STAFF"}
                searchValue={searchProduct}
                onChangeMinMax={onChangeMinMax}
                onChange={onChange}
                searchPrice={searchPrice}
                onReset={onReset}
                showModalMetal={showModalMetal}
                showModaGem={() => setIsModalGem(true)}
                onChangeBarcode={onChangeBarcode}
                showModaCategory={() => setIsModalCategory(true)}
                placeholder="SEACH  BY NAME"
            />
            {errorMessage && (
                <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
                    {errorMessage}
                </div>
            )}
            <Table
                rowSelection={rowSelection}
                dataSource={dataProducts}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
            <div
                style={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <Button
                    danger
                    className="btn-staff"
                    onClick={() => setSelectedProducts([])}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleContinue}
                    type="primary"
                    className="btn-staff"
                    disabled={selectedProducts.length === 0}
                >
                    Add to order
                </Button>
            </div>
            <SearchGemstoneForm
                visible={isModalGem}
                onCancel={() => setIsModalGem(false)}
                onSave={handleOkGem}
            />
            <Modal
                title="Search by metal"
                visible={isModalMetal}
                onOk={handleOk}
                onCancel={() => setIsModalMetal(false)}
                width={600}
            >
                <Form form={form}>
                    <Form.Item name="metal">
                        <Input placeholder="Enter your metalType" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Search by category"
                visible={isModalCategory}
                onOk={handleOkCategory}
                onCancel={() => setIsModalCategory(false)}
                width={600}
            >
                <Form form={form}>
                    <Form.Item name="category" label="Category">
                        <Select>
                            {CategoryOption.map((item, index) => (
                                <Select.Option key={index} value={item.value}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default StaffProduct;
