import React, { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Form,
    Input,
    Table,
    Tooltip,
    Radio,
    Space,
    Divider,
} from "antd";
import { CgClose } from "react-icons/cg";
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import "./Stafforder.css";
import CustomerInfoModal from "../../../components/modal/CustomerInfoModal";
import RequestModal from "../../../components/modal/RequestModal";
import { createBill, createBillVNPay } from "../../../service/bill";
import { toast } from "react-toastify";
import { formatVND } from "../../../utils/funUtils";
import { getDiscountById } from "../../../service/discount";
import useDebounce from "../../../hook/debound";
import { BiCalendar, BiPhone, BiUser } from "react-icons/bi";

const StaffOrder = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [customerData, setCustomerData] = useState({});
    const [isModalVisibleDiscount, setIsModalVisibleDiscount] = useState(false);
    const [isModalVisibleCustomer, setIsModalVisibleCustomer] = useState(false);
    const [discountData, setDiscountData] = useState({});
    const [discountId, setDiscountId] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [amountPaid, setAmountPaid] = useState(0);
    const [change, setChange] = useState(0);
    const discountDebounce = useDebounce(discountId, 1000);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const columns = [
        /* { title: "ID", dataIndex: "productId", key: "productId" }, */
        { title: "Name Product", dataIndex: "name", key: "name" },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text, record) => (
                <span>
                    {formatVND(record.price) || formatVND(record.newPrice)}
                </span>
            ),
        },
        {
            title: "New Price",
            dataIndex: "newPrice",
            key: "newPrice",
            render: (text) => formatVND(text),
        },
        { title: "Category", dataIndex: "category", key: "category" },
        /* {
            title: "Time",
            dataIndex: "createTime",
            key: "createTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        }, */
        {
            title: "Descriptions",
            dataIndex: "descriptions",
            key: "descriptions",
        },
        {
            title: "ACTION",
            key: "actions",
            render: (text, record) => (
                <Tooltip title="Delete Product">
                    <Button
                        danger
                        icon={<CgClose />}
                        onClick={() => handleDeleteProduct(record.key)}
                    />
                </Tooltip>
            ),
        },
    ];
    //Gọi API check thanh toán VNPAY
    useEffect(() => {
        const currentUrl = window.location.href;
        const parsedUrl = new URL(currentUrl);
        const params = new URLSearchParams(parsedUrl.search);
        const vnp_TransactionStatus = parseInt(params.get("vnp_TransactionStatus"), 10); // Chuyển đổi thành số
    
        if (vnp_TransactionStatus === 0) { // Thành công
            const reqLocal = JSON.parse(localStorage.getItem("orderBill"));
            createBill(reqLocal).then((response) => {
                if (response.data) {
                    toast.success("Created bill successfully");
                    localStorage.removeItem("card");
                    localStorage.removeItem("orderBill");
                    navigate(`/bill/${response.data.bill.id}`);
                }
            });
        } else if (vnp_TransactionStatus === 2) { // Thất bại
            toast.error("Payment failed! Please try again");
            localStorage.removeItem("orderBill");
        }
    }, []);
    useEffect(() => {
        const storedData = localStorage.getItem("card");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setDataProducts(parsedData);
            calculateTotalAmount(parsedData);
        }
        form.resetFields();
    }, []);

    const handleDeleteProduct = (key) => {
        const updatedDataProducts = dataProducts.filter(
            (product) => product.key !== key
        );
        setDataProducts(updatedDataProducts);
        localStorage.setItem("card", JSON.stringify(updatedDataProducts));
        calculateTotalAmount(updatedDataProducts);
    };

    const calculateTotalAmount = (products) => {
        const total = products.reduce(
            (acc, product) => acc + (product.newPrice || product.price),
            0
        );
        setTotalAmount(Math.floor(total));
    };

    const handleCheckout = async () => {
        try {
            const listBarcode = dataProducts.map((product) => product.barcode);
            const requestData = {
                customerPhone: customerData.phone,
                barcodes: listBarcode,
                discountId: discountData?.id || undefined,
            };

            if (paymentMethod === "cash" && amountPaid < totalAmount) {
                toast.error("Amount paid is less than total amount");
                return;
            }
            if (paymentMethod === "online") {
                const response = await createBillVNPay({
                    amount: totalAmount,
                    orderInfo: "checkout",
                });
                if (response.data) {
                    localStorage.setItem(
                        "orderBill",
                        JSON.stringify(requestData)
                    );
                    window.location.href = response.data;
                } else {
                    toast.error(error?.response?.data);
                }
            } else {
                const response = await createBill(requestData);
                if (response.data) {
                    toast.success("Created bill successfully");
                    localStorage.removeItem("card");
                    navigate(`/bill/${response.data.bill.id}`);
                }
            }
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error?.response?.data);
            } 
        }
    };

    useEffect(() => {
        if (paymentMethod === "cash" && amountPaid > totalAmount) {
            setChange(amountPaid - totalAmount);
        }
    }, [amountPaid, paymentMethod, totalAmount]);

    useEffect(() => {
        if (discountDebounce) {
            getDiscountById({ discountId: discountDebounce })
                .then((res) => {
                    const data = res.data;
                    if (data?.customer?.id === customerData.id && data.approved) {
                        if (new Date(data.expirationTime) > new Date()) {
                            setDiscountData(data);
                            setTotalAmount((prevTotal) =>
                                Math.floor(
                                    prevTotal * (1 - Number(data.requestedDiscount) / 100)
                                )
                            );
                            toast.success("Discount was applied successfully");
                        } else {
                            toast.error("Discount has expired");
                        }
                    } else {
                        toast.error("Discount application failed");
                    }
                })
                .catch((error) => {
                    toast.error(error?.response?.data);
                });
        }
    }, [discountDebounce, customerData.id]);

    const clearDiscount = () => {
        setDiscountId("");
        setDiscountData({});
        calculateTotalAmount(dataProducts); // Recalculate the total amount without discount
    };

    return dataProducts.length ? (
        <div className="order-container">
            <Table
                dataSource={dataProducts}
                columns={columns}
                pagination={{ defaultPageSize: 4 }}
            />
            <div className="order-wrapper">
                <h2 className="order-title">Order</h2>
                <div className="order_btn-wrapper">
                    <button
                        className="order-btn"
                        onClick={() => setIsModalVisibleCustomer(true)}
                    >
                        CUSTOMER INFO
                    </button>
                    {customerData?.id ? (
                        <div className="customer__infoo">
                            <Divider />
                            <div className="customer__wrapper">
                                <div>
                                    <BiUser color="black" /> Name:{" "}
                                    {customerData.name}
                                </div>
                                
                                <div>
                                    <BiPhone color="black" /> Phone:{" "}
                                    {customerData.phone}
                                </div>
                                {/* <div>RANK: {customerData.rankCus}</div> */}
                            </div>
                            <div className="customer__wrapper">
                                {/* <div>
                                    <BiCalendar color="black" /> Create Date:{" "}
                                    {new Date(
                                        customerData.createTime
                                    ).toLocaleString("vi-VN")}
                                </div> */}
                                {/* <div>Loyalty Point: {Math.floor(customerData.points)}</div> */}
                            </div>
                            <Divider />
                        </div>
                    ) : null}
                    <button
                        className="order-btn"
                        onClick={() => setIsModalVisibleDiscount(true)}
                        disabled={!customerData.phone}
                    >
                        DISCOUNT
                    </button>
                </div>
                <Form form={form} onFinish={handleCheckout}>
                    <div className="order-content">
                        <Flex gap={4} align="center">
                            <p className="order__label">Discount: </p>
                            <Input
                                style={{ padding: 8, height: "32px" }}
                                value={discountId}
                                onChange={(e) => setDiscountId(e.target.value)}
                                suffix={
                                    discountId && (
                                        <CgClose
                                            style={{ cursor: "pointer" }}
                                            onClick={clearDiscount}
                                        />
                                    )
                                }
                            />
                        </Flex>
                        {discountData.requestedDiscount && (
                            <p
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    color: "red",
                                }}
                            >
                                {new Date(discountData.expirationTime) < new Date() ? (
                                    "Discount has expired"
                                ) : (
                                    `Discounts are accepted: ${discountData.requestedDiscount}%`
                                )}
                            </p>
                        )}
                        <div className="total_mount">
                            <p className="total__label">Total:</p>
                            <p className="total__price">
                                {formatVND(totalAmount)}
                            </p>
                        </div>
                        <Form.Item label="Payment Method">
                            <Radio.Group
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                value={paymentMethod}
                            >
                                <Radio value="cash">Cash</Radio>
                                <Radio value="online">Online</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {paymentMethod === "cash" && (
                            <div>
                                <Form.Item label="Amount Paid">
                                    <Input
                                        type="number"
                                        value={amountPaid}
                                        onChange={(e) =>
                                            setAmountPaid(e.target.value)
                                        }
                                    />
                                </Form.Item>
                                {amountPaid > totalAmount && (
                                    <p className="change-amount">
                                        Change: {formatVND(change)}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    {paymentMethod === "online" ? (
                        <button
                            className="checkout-btn"
                            type="submit"
                            disabled={!customerData.phone}
                        >
                            CHECKOUT
                        </button>
                    ) : (
                        <button
                            className="checkout-btn"
                            type="submit"
                            disabled={
                                !customerData.phone || amountPaid < totalAmount
                            }
                        >
                            CHECKOUT
                        </button>
                    )}
                </Form>
            </div>

            <CustomerInfoModal
                isModalVisible={isModalVisibleCustomer}
                setIsModalVisible={setIsModalVisibleCustomer}
                setCustomerData={setCustomerData}
                customerData={customerData}
            />
            <RequestModal
                isModalVisible={isModalVisibleDiscount}
                setIsModalVisible={setIsModalVisibleDiscount}
                customerPhone={customerData.phone}
                customerName={customerData.name}
            />
        </div>
    ) : (
        <p style={{ textAlign: "center", color: "black" }}>CART IS EMPTY</p>
    );
};

export default StaffOrder;
