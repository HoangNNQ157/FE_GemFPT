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
    getListProductsActive,
    getProductByBarcode,
    getProductByCategory,
    getProductByGem,
    getProductByMetal,
    getProductByName,
    getProductByPrice,
    unLinkGems,
    updateProduct,
} from "../../service/productService";
import { formatVND } from "../../utils/funUtils";
import CarouselImg from "../Carousel/Carousel";
import ModalManager from "../modal/ModalManager";
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
                    toast.success("Search by name");
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
                    toast.success("Filter by category");
                } else if (searchBarcode) {
                    response = await getProductByBarcode({
                        barcode: searchBarcode,
                    });
                    toast.success("Filter by barcode");
                } else if (productActice) {
                    response = await getListProductsActive();
                    toast.success("Active products");
                } else {
                    response = await getListProducts();
                }
                if (
                    response?.data?.length > 0 &&
                    response?.data[0]?.productId
                ) {
                    const products = response.data?.map((product, index) => ({
                        ...product,
                        key: index + 1,
                    }));
                    setDataProducts(products);
                } else if (!response?.data[0]?.productId) {
                    toast.error("product not found");
                } else {
                    setDataProducts([response.data]);
                }
            } catch (error) {
                toast.error("Failed to fetch products");
                console.error("Error fetching products:", error);
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
    ]);
    useEffect(() => {
        //call apu  metals
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
                // call api update
                const response = await updateProduct({
                    formData: values,
                    barcode: barcodeUpdate,
                });
                if (response.data.productId) {
                    toast.success("Cập nhật sản phẩm thành công");
                    //update xong -> call  lại ai product
                    const updatedProducts = productActice
                        ? await getListProductsActive()
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
                // call api tạo product
                const response = await createProduct(values);
                if (response.data.productId) {
                    toast.success("Tạo mới sản phẩm thành công");
                    // tạo oke-> call api getProduct
                    const newProducts = productActice
                        ? await getListProductsActive()
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
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setVisible(false);
        }
    };
    const handleDelteProduct = async (record) => {
        try {
            // call api delete
            const response = await deleteProduct({ barcode: record.barcode });
            if (response.data.productId) {
                toast.success("change status product successfully");
                const newProducts = productActice
                    ? await getListProductsActive()
                    : await getListProducts();
                const productsWithKey = newProducts.data.map(
                    (product, index) => ({
                        ...product,
                        key: index + 1,
                    })
                );
                setDataProducts(productsWithKey);
            } else {
                toast.error("change status product error");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };
    const handleUnLinkGem = async (record) => {
        try {
            const response = await unLinkGems(record.barcode);
            if (response.data) {
                toast.success("Unlink gem successfully");
                const newProducts = productActice
                    ? await getListProductsActive()
                    : await getListProducts();
                const productsWithKey = newProducts.data.map(
                    (product, index) => ({
                        ...product,
                        key: index + 1,
                    })
                );
                setDataProducts(productsWithKey);
            } else {
                toast.error("Unlink gem error");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };
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
            title: "New Price",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text, record) => <span>{formatVND(record.newPrice)}</span>,
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
                        title="You want to remove the gem from the product ? "
                        onConfirm={() => handleUnLinkGem(record)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<LiaGemSolid size={24} />} />
                    </Popconfirm>
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
            <ModalManager
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
