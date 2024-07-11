import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineEditOff } from "react-icons/md";
import { toast } from "react-toastify";
import { getAllMetal } from "../../service/metalPriceService";
import {
    createProduct,
    deleteProduct,
    getListProducts,
    getListProductsActive,
    getProductByGem,
    getProductByMetal,
    getProductByName,
    getProductByPrice,
    updateProduct,
} from "../../service/productService";
import { formatVND } from "../../utils/funUtils";
import CarouselImg from "../Carousel/Carousel";
import ModalManager from "../modal/ModalManager";
import "./TableManager.css";

const TableManager = ({ searchValue, searchPrice, searchMetal, searchGem }) => {
    const [visible, setVisible] = useState(false);
    const [dataProducts, setDataProducts] = useState([]);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [barcodeUpdate, setBarcodeUpdate] = useState(null);
    const [metalData, setMetalData] = useState([]);
    const [productActice, setProductActive] = useState(false);
    console.log(searchGem);
    useEffect(() => {
        const fetchProducts = async () => {
            // call api product
            const response =
                searchValue?.length > 0
                    ? await getProductByName(searchValue)
                    : searchPrice?.minPrice >= 0 &&
                      searchPrice?.maxPrice > searchPrice.minPrice &&
                      searchPrice.maxPrice > 0
                    ? await getProductByPrice(searchPrice)
                    : searchMetal?.length > 0
                    ? await getProductByMetal(searchMetal)
                    : searchGem
                    ? await getProductByGem(searchGem)
                    : productActice
                    ? await getListProductsActive()
                    : await getListProducts();
            const products = response.data.map((product, index) => ({
                ...product,
                key: index + 1,
            }));
            setDataProducts(products);
        };

        fetchProducts();
    }, [productActice, searchValue, searchPrice, searchMetal, searchGem]);
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
                toast.success("xoa sản phẩm thành công");
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
        } catch (error) {
            console.error(err.response?.data);
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
            title: "Ảnh",
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
            title: "Tên",
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
            title: "Bộ sư tập",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "số lượng",
            dataIndex: "stock",
            key: "stock",
            render: (text, record) => (
                <span> {record.stock > 0 ? record.stock : "Hết hàng"}</span>
            ),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text, record) => <span>{formatVND(record.price)}</span>,
        },
        {
            title: "Giá mới",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text, record) => <span>{formatVND(record.newPrice)}</span>,
        },
        {
            title: "Trang thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <span> {record.status ? "Hoạt động" : "Ngưng hoạt động"}</span>
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
                    <Popconfirm
                        title="Bạn muốn xóa sản phẩm ? "
                        onConfirm={() => handleDelteProduct(record)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Flex>
            ),
        },
    ];

    return (
        <>
            <button className="btn-add" onClick={() => showModal("create")}>
                Thêm sản phẩm
            </button>
            {productActice ? (
                <button
                    className="btn-add"
                    onClick={() => setProductActive(false)}
                >
                    Tất cả sản phẩm
                </button>
            ) : (
                <button
                    className="btn-add"
                    onClick={() => setProductActive(true)}
                >
                    Sản phẩm đang hoạt động
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
