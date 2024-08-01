import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../service/productService";
import { formatVND } from "../../utils/funUtils";
import { Box } from "@mui/material";
import HeaderDefault from "../../components/Header/HeaderDefault/HeaderDefault";
import { toast } from "react-toastify";
import { Row, Col, Card, Typography, Button, Divider, Image, Space, Tabs } from "antd";
import { ShoppingCartOutlined, PhoneOutlined } from "@ant-design/icons";
import "./DetailProduct.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const DetailProduct = () => {
    const [data, setData] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const param = useParams();
    const { id } = param;

    useEffect(() => {
        getProductById({ id: id })
            .then((res) => res.data)
            .then((product) => {
                setData(product);
                setMainImage(product.urls[0].urls);
            });
    }, [param]);

    const handleImageClick = (url) => {
        setMainImage(url);
    };

    const addProductOrder = () => {
        if (data?.status) {
            const card = JSON.parse(localStorage.getItem("card"));
            if (card?.length > 0) {
                const check = card.filter(
                    (product) => product.productId === data.productId
                );
                if (check.length > 0) {
                    toast.info("The product is already in the shopping cart");
                } else {
                    toast.success("Added product to cart successfully");
                    card.push({ ...data, key: card.length + 1 });
                    localStorage.setItem("card", JSON.stringify(card));
                }
            } else {
                toast.success("Added product to cart successfully");
                localStorage.setItem("card", JSON.stringify([{ ...data, key: 1 }]));
            }
        } else {
            toast.warning("This product is sold out or no longer available.");
        }
    };

    return data ? (
        <>
            <HeaderDefault backPage />
            <div className="detail__wrapper">
                <div>
                    <div className="img__wrapper">
                        <Space direction="vertical">
                            {data?.urls?.length &&
                                data.urls.map((url) => (
                                    <Image
                                        className="img__child"
                                        width={72}
                                        height={72}
                                        src={url?.urls}
                                        onClick={() =>
                                            handleImageClick(url.urls)
                                        }
                                        key={url.id}
                                    />
                                ))}
                        </Space>
                        <div>
                            <Image
                                width={500}
                                height={500}
                                src={mainImage}
                                alt="product"
                                className="img__main"
                            />
                            <Card style={{ marginTop: "10px" }}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Gemstones" key="1">
                                        {data.gemstones.map((gem) => (
                                            <div key={gem.gemId}>
                                                <Title level={5}>
                                                    Kim cương
                                                </Title>
                                                <Text>
                                                    Barcode: {gem.gemBarcode}
                                                </Text>
                                                <br/>
                                                <Text>
                                                    Mô tả: {gem.description}
                                                </Text>
                                                <br />
                                                <Text>
                                                    Màu sắc: {gem.color}
                                                </Text>
                                                <br />
                                                <Text>
                                                    Độ sạch: {gem.clarity}
                                                </Text>
                                                <br />
                                                <Text>Kiểu cắt: {gem.cut}</Text>
                                                <br />
                                                <Text>
                                                    Trọng lượng: {gem.carat}{" "}
                                                    carat
                                                </Text>
                                                <br />
                                                <Text>
                                                    Giá:{" "}
                                                    {gem.price.toLocaleString(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    )}
                                                </Text>
                                                <br />
                                            </div>
                                        ))}
                                    </TabPane>
                                    <TabPane tab="Metals" key="2">
                                        {data.metals.map((metal) => (
                                            <div key={metal.metalId}>
                                                <Title level={5}>
                                                    {metal.name}
                                                </Title>
                                                <Text>
                                                    Mô tả: {metal.description}
                                                </Text>
                                                <br />
                                                <Text>
                                                    Trọng lượng: {metal.weight}
                                                </Text>
                                                <br />
                                                <Text>
                                                    Đơn vị: {metal.unit}
                                                </Text>
                                                <br />
                                            </div>
                                        ))}
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <Box bordered={false}>
                        <Title level={3}>{data.name}</Title>
                        <Text type="secondary">{data.descriptions}</Text>
                        <Divider />
                        <Title level={4} style={{ color: "#f5222d" }}>
                            {formatVND(data.newPrice ? data.newPrice : data.price)}
                        </Title>
                        {data.newPrice ? (
                            <>
                                <Text delete>{formatVND(data.price)}</Text>
                                <Text>
                                    (Giá sản phẩm thay đổi tuỳ theo trọng lượng vàng và đá)
                                </Text>
                            </>
                        ) : null}
                        <Divider />

                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Button
                                icon={<ShoppingCartOutlined />}
                                block
                                type="primary"
                                onClick={addProductOrder}
                                disabled={!data.status} // Disable button if status is false
                            >
                                {data.status ? "Thêm vào giỏ hàng" : "Sản phẩm đã hết hàng"}
                            </Button>
                            <Button icon={<PhoneOutlined />} block>
                                Gọi ngay (0123456789)
                            </Button>
                        </Space>
                        <Divider />
                    </Box>
                </div>
            </div>
        </>
    ) : null;
};

export default DetailProduct;
