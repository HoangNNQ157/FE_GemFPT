import { Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import HeaderProduct from "../../../components/Header/HeaderProduct/HeaderProduct";
import SearchGemstoneForm from "../../../components/modal/SearchGemstoneForm";
import TableManager from "../../../components/TableManager/TableManager";
import { CategoryOption } from "../../../data/data";
import useDebounce from "../../../hook/debound";

const ManagerDashboard = () => {
    const [searchProduct, setSearchProduct] = useState("");
    const [searchProductByMetal, setSearchProductByMetal] = useState("");
    const [searchPrice, setSearchPrice] = useState({
        minPrice: 0,
        maxPrice: 0,
    });
    const [searchGem, setSearchGem] = useState();
    const [isModalMetal, setIsModalMetal] = useState(false);
    const [typeCategory, setTypeCategory] = useState("");
    const [searchBarcode, setSearchBarcode] = useState("");
    const [searchStallId, setSearchStallId] = useState("");
    const [isModalGem, setIsModalGem] = useState(false);
    const debouncedSearchProduct = useDebounce(searchProduct, 500);
    const debouncedSearchPrice = useDebounce(searchPrice, 500);
    const [isModalCategory, setIsModalCategory] = useState(false);
    const [form] = Form.useForm();

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
    const onChangeStallId = (values) => {
        setSearchStallId(values.stallId);
    };
    const onReset = () => {
        if (searchPrice)
            setSearchPrice({
                minPrice: 0,
                maxPrice: 0,
            });
        if (searchProduct) setSearchProduct(null);
        if (searchProductByMetal) setSearchProductByMetal(null);
        if (searchGem) setSearchGem(null);
        if (typeCategory) setTypeCategory("");
        if (searchBarcode) setSearchBarcode("");
        if (searchStallId) setSearchStallId("");
        form.resetFields();
    };
    const showModalMetal = () => {
        setIsModalMetal(true);
    };
    const handleOk = () => {
        form.validateFields().then((values) => {
            setSearchProductByMetal(values.metal);
            setIsModalMetal(false);
            form.resetFields();
        });
    };
    const handleOkGem = (values) => {
        const clearData = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value !== undefined)
        );
        setSearchGem(clearData);
        setIsModalGem(false);
        form.resetFields();
    };
    const handleOkCategory = () => {
        form.validateFields().then((values) => {
            setTypeCategory(values.category);
            setIsModalCategory(false);
            form.resetFields();
        });
    };
    return (
        <>
            <HeaderProduct
                placeholder={"SEARCH BY NAME"}
                role={"MANAGER"}
                searchValue={searchProduct}
                onChangeMinMax={onChangeMinMax}
                onChange={onChange}
                searchPrice={searchPrice}
                onReset={onReset}
                showModalMetal={showModalMetal}
                showModaGem={() => setIsModalGem(true)}
                showModaCategory={() => setIsModalCategory(true)}
                onChangeBarcode={onChangeBarcode}
                onChangeStallId={onChangeStallId}
            />
            <TableManager
                searchValue={debouncedSearchProduct}
                searchPrice={debouncedSearchPrice}
                searchMetal={searchProductByMetal}
                searchGem={searchGem}
                searchCategory={typeCategory}
                searchBarcode={searchBarcode}
                searchStallId={searchStallId}
            />
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
                    <Form.Item
                        name="metal"
                        rules={[
                            {
                                required: true,
                                message: "Please select a metal!",
                            },
                        ]}
                    >
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

export default ManagerDashboard;
