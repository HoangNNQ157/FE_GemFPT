import { Button, Form, Input, Modal, Select, Tabs } from "antd";
import React, { useEffect } from "react";

const { TabPane } = Tabs;

const ModalManager = ({
    visible,
    onCancel,
    onSave,
    initialData,
    metalData,
    type,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && type === "create") {
            form.resetFields();
        } else {
            form.setFieldsValue(initialData);
        }
    }, [type, visible]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onSave(values);
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
        {
            name: "RING",
            value: "RING",
            id: 1,
        },
        {
            name: "BRACELET",
            value: "BRACELET",
            id: 2,
        },
        {
            name: "NECKLACE",
            value: "NECKLACE",
            id: 3,
        },
        {
            name: "EARRINGS",
            value: "EARRINGS",
            id: 4,
        },
        {
            name: "ANKLETS",
            value: "ANKLETS",
            id: 5,
        },
        {
            name: "METAL",
            value: "METAL",
            id: 6,
        },
    ];
    return (
        <Modal
            title={type === "update" ? "Edit Information" : "Add Product"}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
        >
            <Form form={form} layout="vertical" name="edit_form">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Product Info" key="1">
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
                        <Form.Item name="stallId" label="Stall">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item name="priceRate" label="Price Rate">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="wage" label="Wage">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="barcode" label="Bar code">
                            <Input type="text" />
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
                                                name={[field.name, "weight"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "weight",
                                                ]}
                                                label="Weight/Gram"
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
                    <TabPane tab="Gems" key="4">
                        <Form.List name="gemstones">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <div key={index}>
                                            {/* <Form.Item
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
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input the description!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "price"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "price",
                                                ]}
                                                label="Price"
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "quantity"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "quantity",
                                                ]}
                                                label="Quantity"
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[
                                                    field.name,
                                                    "certificateCode",
                                                ]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "certificateCode",
                                                ]}
                                                label="Certificate Code"
                                            >
                                                <Input />
                                            </Form.Item> */}
                                            <Form.Item
                                                {...field}
                                                name={[
                                                    field.name,
                                                    "gemBarcode",
                                                ]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "gemBarcode",
                                                ]}
                                                label="Barcode"
                                            >
                                                <Input />
                                            </Form.Item>
                                            {/* <Form.Item
                                                {...field}
                                                name={[field.name, "carat"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "carat",
                                                ]}
                                                label="Carat"
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "color"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "color",
                                                ]}
                                                label="Color"
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "clarity"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "clarity",
                                                ]}
                                                label="Clarity"
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "cut"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "cut",
                                                ]}
                                                label="Cut"
                                            >
                                                <Input />
                                            </Form.Item> */}
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
    );
};

export default ModalManager;
