import { Button, Form, Input, Modal, Select, Tabs } from "antd";
import React, { useEffect } from "react";

const { TabPane } = Tabs;

const GemModal = ({ visible, onCancel, onSave, initialData, type }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && type === "create") {
      form.resetFields();
    } else {
      form.setFieldsValue(initialData);
    }
  }, [type, visible]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSave(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const userStatusOptions = [
    { value: "USE", label: "USE" },
    { value: "NOTUSE", label: "NOT USE" },
    { value: "PROCESDONE", label: "PROCESDONE" },
    { value: "FALSE", label: "FALSE" },
    { value: "PROCESSING", label: "PROCESSING" },
  ];

  return (
    <Modal
      title={type === "update" ? "Edit Gem Information" : "Add Gem"}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={800}
    >
      <Form form={form} layout="vertical" name="gem_form">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Gem Info" key="1">
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input the description!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please input the price!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please input the quantity!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="certificateCode"
              label="Certificate"
              rules={[
                {
                  required: true,
                  message: "Please input the certificate code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userStatus"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select the user status!",
                },
              ]}
            >
              <Select options={userStatusOptions} />
            </Form.Item>
            <Form.Item
              name="gemBarcode"
              label="Barcode"
              rules={[
                {
                  required: true,
                  message: "Please input the gem barcode!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="url"
              label="Image"
              rules={[
                {
                  required: true,
                  message: "Please input the URL!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="carat"
              label="Carat"
              rules={[
                {
                  required: true,
                  message: "Please input the carat!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="color"
              label="Color"
              rules={[
                {
                  required: true,
                  message: "Please input the color!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="clarity"
              label="Clarity"
              rules={[
                {
                  required: true,
                  message: "Please input the clarity!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cut"
              label="Cut"
              rules={[
                {
                  required: true,
                  message: "Please input the cut!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};

export default GemModal;
