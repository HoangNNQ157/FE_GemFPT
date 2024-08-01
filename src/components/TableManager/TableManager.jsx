import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
    MdOutlineChangeCircle,
    MdOutlineEditOff,
    MdProductionQuantityLimits,
} from "react-icons/md";
import { toast } from "react-toastify";
import { getAllMetal } from "../../service/metalPriceService";
import {
    createProduct,
    deleteProduct,
    getListProducts,
    getListProductsActiveTrue,
    getProductAllByBarcode,
    getProductByCategory,
    getProductByGem,
    getProductByMetal,
    getProductByName,
    getProductByPrice,
    getStallById,
    unLinkGems,
    updateProduct,
} from "../../service/productService";
import { formatVND } from "../../utils/funUtils";
import CarouselImg from "../Carousel/Carousel";
import ModalManagerProduct from "../modal/ModalManagerProduct";
import "./TableManager.css";
import { useNavigate } from "react-router-dom";
import { LiaGemSolid } from "react-icons/lia";

const TableManager = ({
    searchValue,
    searchPrice,
    searchMetal,
    searchGem,
    searchCategory,
    searchBarcode,
    searchStallId,
}) => {
    const [visible, setVisible] = useState(false);
    const [dataProducts, setDataProducts] = useState([]);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [barcodeUpdate, setBarcodeUpdate] = useState(null);
    const [metalData, setMetalData] = useState([]);
    const [productActice, setProductActive] = useState(false);
    const navigator = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (searchValue?.length > 0) {
                    response = await getProductByName(searchValue);
                } else if (
                    searchPrice?.minPrice >= 0 &&
                    searchPrice?.maxPrice > searchPrice.minPrice &&
                    searchPrice.maxPrice > 0
                ) {
                    response = await getProductByPrice(searchPrice);
                    toast.success("Search by price");
                } else if (searchMetal?.length > 0) {
                    response = await getProductByMetal(searchMetal);
                    toast.success("Filter by metal");
                } else if (searchGem) {
                    response = await getProductByGem(searchGem);
                    toast.success("Filter by gem");
                } else if (searchCategory) {
                    response = await getProductByCategory({
                        category: searchCategory,
                    });
                    /* toast.success("Filter by category"); */
                } else if (searchBarcode) {
                    try {
                        response = await getProductAllByBarcode({
                            barcode: searchBarcode,
                        });

                       /*  if (response && response.data && response.data.length > 0) {
                            toast.success("Filter by barcode");
                        } else {
                            setDataProducts([]);
                            toast.error("Product not found by barcode");
                        } */
                    } catch (error) {
                        console.error("Error searching by barcode:", error);
                        toast.error(error?.response?.data);
                    }
                }  else if (searchStallId) {
                    response = await getStallById(searchStallId);
                    if (response && response.data && response.data.length > 0) {
                       /*  toast.success("Filter by Stall ID"); */
                    } else {
                        setDataProducts([]);
                        toast.error("Product not found by Stall ID");
                    }
                } else if (productActice) {
                    response = await getListProductsActiveTrue();
                    toast.success("Active products");
                } else {
                    response = await getListProducts();
                }
                
                if (response && response.data) {
                    const products = Array.isArray(response.data)
                        ? response.data.map((product, index) => ({
                            ...product,
                            key: index + 1,
                        }))
                        : [response.data];
                    
                    setDataProducts(products);
                } else {
                    setDataProducts([]);
                    
                }
            } catch (error) {
                if (error?.response?.data) {
                    toast.error(error?.response?.data);
                } else toast.error("Failed to fetch products");
            }
        };

        fetchProducts();
    }, [
        productActice,
        searchValue,
        searchPrice,
        searchMetal,
        searchGem,
        searchCategory,
        searchBarcode,
        searchStallId,
    ]);
    useEffect(() => {
        const fetchMetals = async () => {
            const response = await getAllMetal();
            setMetalData(response.data);
        };
        fetchMetals();
    }, []);
    const showModal = (type, record) => {
        if (type === "update") {
            setDataUpdate(record);
            setBarcodeUpdate(record.barcode);
        }
        setVisible(true);
    };

    const handleCancel = () => {
        setDataUpdate(null);
        setVisible(false);
    };

    const handleSave = async (values) => {
        try {
            if (dataUpdate) {
                const response = await updateProduct({
                    formData: values,
                    barcode: barcodeUpdate,
                });
                if (response.data.productId) {
                    toast.success("Product updated successfully!");
                    const updatedProducts = productActice
                        ? await getListProductsActiveTrue()
                        : await getListProducts();
                    const productsWithKey = updatedProducts.data.map(
                        (product, index) => ({
                            ...product,
                            key: index + 1,
                        })
                    );
                    setDataProducts(productsWithKey);
                    setDataUpdate(null);
                }
            } else {
                const response = await createProduct(values);
                if (response.data.productId) {
                    toast.success("Product created successfully!");
                    const newProducts = productActice
                        ? await getListProductsActiveTrue()
                        : await getListProducts();
                    const productsWithKey = newProducts.data.map(
                        (product, index) => ({
                            ...product,
                            key: index + 1,
                        })
                    );
                    setDataProducts(productsWithKey);
                }
            }
        } catch (err) {
            console.error(err.response?.data);
            if (err.response && err.response.data) {
                const errorMessage = err.response.data.message || err.response.data;
                toast.error(`Error: ${errorMessage}`);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        } finally {
            setVisible(false);
        }
    };

    const handleDelteProduct = async (record) => {
        try {
            const response = await deleteProduct({ barcode: record.barcode });
            if (response.data.productId) {
                toast.success("Change status product successfully");
                const newProducts = productActice
                    ? await getListProductsActiveTrue()
                    : await getListProducts();
                const productsWithKey = newProducts.data.map(
                    (product, index) => ({
                        ...product,
                        key: index + 1,
                    })
                );
                setDataProducts(productsWithKey);
            } else {
                toast.error("Change status product error");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Stall",
            dataIndex: "stallId",
            key: "stallId",
        },
        {
            title: "Barcode",
            dataIndex: "barcode",
            key: "barcode",
        },
        {
            title: "Images",
            dataIndex: "urls",
            key: "urls",
            render: (urls) =>
                urls?.length > 0 ? (
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
            title: "Quantity",
            dataIndex: "stock",
            key: "stock",
            render: (text, record) => (
                <span> {record.stock > 0 ? record.stock : "Hết hàng"}</span>
            ),
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
            title: "Buy back",
            dataIndex: "typeWhenBuyBack",
            key: "btypeWhenBuyBack",
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
                <Flex gap={4}>
                    {record.status ? (
                        <Button
                            onClick={() => showModal("update", record)}
                            type="link"
                            icon={<EditOutlined />}
                        />
                    ) : (
                        <Button danger icon={<MdOutlineEditOff />} />
                    )}
                    <Button
                        type="dashed"
                        style={{ color: "blue" }}
                        icon={<MdProductionQuantityLimits />}
                        onClick={() =>
                            navigator(`/product-detail/${record.productId}`)
                        }
                    />
                    <Popconfirm
                        title="Do you want to change the product's status ?"
                        onConfirm={() => handleDelteProduct(record)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="link"
                            icon={<MdOutlineChangeCircle size={24} />}
                        />
                    </Popconfirm>
                </Flex>
            ),
        },
    ];

    return (
        <>
            <button className="btn-add" onClick={() => showModal("create")}>
                Add New Product
            </button>
            {productActice ? (
                <button
                    className="btn-add"
                    onClick={() => setProductActive(false)}
                >
                    All Products
                </button>
            ) : (
                <button
                    className="btn-add"
                    onClick={() => setProductActive(true)}
                >
                    Active Product
                </button>
            )}
            <Table
                dataSource={dataProducts.reverse()}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
            <ModalManagerProduct
                metalData={metalData}
                initialData={dataUpdate ? dataUpdate : null}
                visible={visible}
                onCancel={handleCancel}
                onSave={handleSave}
                type={dataUpdate ? "update" : "create"}
            />
        </>
    );
};

export default TableManager;
