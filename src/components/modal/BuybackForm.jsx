import { Button, Form, Input, Modal, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { getAllMetal } from "../../service/metalPriceService";
import CustomerInfoModal from "./CustomerInfoModal";

const { TabPane } = Tabs;

const BuybackForm = ({
    visible,
    onCancel,
    onSave,
    initialData,
    type = "create",
}) => {
    const [form] = Form.useForm();
    const [metalData, setMetalData] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [isShowUserInfo, setShowIsUserInfo] = useState(true);

    useEffect(() => {
        if (visible && type === "create") {
            form.resetFields();
            form.setFieldsValue({
                gemstones: [{ description: 'description' }],
            });
        } else if (visible && type === "update") {
            form.setFieldsValue(initialData);
        }
        setShowIsUserInfo(true);
        setCustomerInfo([]);
    }, [type, visible, initialData]);

    useEffect(() => {
        getAllMetal()
            .then((res) => res.data)
            .then((data) => setMetalData(data));
    }, []);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                if (!values.metals || values.metals.length === 0) {
                    delete values.metals;
                }
                if (!values.gemstones || values.gemstones.length === 0) {
                    delete values.gemstones;
                }
                if (!values.urls || values.urls.length === 0) {
                    delete values.urls;
                }
                form.resetFields();
                onSave({
                    values: values,
                    userData: customerInfo,
                    type: type,
                });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const extractMetalTypes = (data) => {
        const metalTypes = new Set();
        data.forEach((item) => {
            item.typeOfMetals.forEach((metal) => {
                metalTypes.add(metal.metalType);
            });
        });
        return Array.from(metalTypes);
    };

    const metalTypes = extractMetalTypes(metalData);
    const CategoryOption = [
        { name: "RING", value: "RING", id: 1 },
        { name: "BRACELET", value: "BRACELET", id: 2 },
        { name: "NECKLACE", value: "NECKLACE", id: 3 },
        { name: "EARRINGS", value: "EARRINGS", id: 4 },
        { name: "ANKLETS", value: "ANKLETS", id: 5 },
        { name: "METAL", value: "METAL", id: 6 },
        { name: "GEMSTONE", value: "GEMSTONE", id: 7 },
    ];

    return (
        <>
            <Modal
                title={type === "update" ? "Edit Information" : "Add Product"}
                visible={visible}
                onOk={handleOk}
                onCancel={onCancel}
                width={800}
            >
                <Form form={form} layout="vertical" name="edit_form">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Main Info" key="1">
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="descriptions" label="Descriptions">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name="category" label="Category">
                                <Select>
                                    {CategoryOption.map((item, index) => (
                                        <Select.Option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Images" key="2">
                            <Form.List name="urls">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={index}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "urls"]}
                                                    fieldKey={[
                                                        field.fieldKey,
                                                        "urls",
                                                    ]}
                                                    label={`URL ${index + 1}`}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please input the URL!",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                            >
                                                Add URL
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </TabPane>
                        <TabPane tab="Metals" key="3">
                            <Form.List name="metals">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={index}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "name"]}
                                                    fieldKey={[
                                                        field.fieldKey,
                                                        "name",
                                                    ]}
                                                    label="Metal Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please select the metal name!",
                                                        },
                                                    ]}
                                                >
                                                    <Select>
                                                        {metalTypes.map(
                                                            (type, index) => (
                                                                <Select.Option
                                                                    key={index}
                                                                    value={type}
                                                                >
                                                                    {type}
                                                                </Select.Option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[
                                                        field.name,
                                                        "description",
                                                    ]}
                                                    fieldKey={[
                                                        field.fieldKey,
                                                        "description",
                                                    ]}
                                                    label="Description"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[
                                                        field.name,
                                                        "weight",
                                                    ]}
                                                    fieldKey={[
                                                        field.fieldKey,
                                                        "weight",
                                                    ]}
                                                    label="Weight"
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                                <Button
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                            >
                                                Add Metal
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </TabPane>
                        <TabPane tab="Gemstones" key="4">
                            <Form.List name="gemstones">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <div key={index}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "description"]}
                                                    fieldKey={[field.fieldKey, "description"]}
                                                    label="Description"
                                                    rules={[
                                                        {
                                                            message: "Please input the description!",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "gemBarcode"]}
                                                    fieldKey={[field.fieldKey, "gemBarcode"]}
                                                    label="Barcode"
                                                    rules={[
                                                        {
                                                            message: "Please input the barcode!",
                                                        },
                                                    ]}
                                                >
                                                    <Input type="text" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "buyRate"]}
                                                    fieldKey={[field.fieldKey, "buyRate"]}
                                                    label="Buy Rate"
                                                    rules={[
                                                        {
                                                            message: "Please input the buy rate!",
                                                        },
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                                <Button
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                            >
                                                Add Gemstone
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </TabPane>
                    </Tabs>
                </Form>
            </Modal>
            {type === "create" && (
                <CustomerInfoModal
                    isModalVisible={isShowUserInfo && visible}
                    setIsModalVisible={() => setShowIsUserInfo(false)}
                    customerData={customerInfo}
                    setCustomerData={setCustomerInfo}
                />
            )}
        </>
    );
};

export default BuybackForm;
