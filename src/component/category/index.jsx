import { Button, Form, Input, Modal, Table, Space, Image } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setIsEdit(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    if (isEdit) {
      const response = await axios.put(
        `https://665d6f09e88051d604068e77.mockapi.io/category/${currentRecord.id}`,
        values
      );
      setData(data.map((item) => (item.id === currentRecord.id ? response.data : item)));
    } else {
      const response = await axios.post(
        "https://665d6f09e88051d604068e77.mockapi.io/category",
        values
      );
      setData([...data, response.data]);
    }
    setIsModalOpen(false);
    setIsEdit(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      "https://665d6f09e88051d604068e77.mockapi.io/category"
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (record) => {
    await axios.delete(
      `https://665d6f09e88051d604068e77.mockapi.io/category/${record.id}`
    );
    setData(data.filter((item) => item.id !== record.id));
  };

  const handleUpdate = (record) => {
    setIsEdit(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    showModal();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Image URL",
      dataIndex: "imageURL",
      key: "imageURL",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Pricing Ratio",
      dataIndex: "pricingRatio",
      key: "pricingRatio",
    },
    {
      title: "Metal",
      dataIndex: "metal",
      key: "metal",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button type="default" icon={<EyeOutlined />} onClick={() => showViewModal(record)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add New Category
      </Button>
      <Modal
        footer={false}
        title={isEdit ? "Update Category" : "Add New Category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input the category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Image URL"
            name="imageURL"
            rules={[
              {
                required: true,
                message: "Please input the image URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please input the product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
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
            label="Pricing Ratio"
            name="pricingRatio"
            rules={[
              {
                required: true,
                message: "Please input the pricing ratio!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Metal"
            name="metal"
            rules={[
              {
                required: true,
                message: "Please input the metal type!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Shape"
            name="shape"
            rules={[
              {
                required: true,
                message: "Please input the shape!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Size"
            name="size"
            rules={[
              {
                required: true,
                message: "Please input the size!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="View Category"
        open={isViewModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {currentRecord && (
          <>
            <p><strong>ID:</strong> {currentRecord.id}</p>
            <p><strong>Category Name:</strong> {currentRecord.categoryName}</p>
            <p><strong>Product Name:</strong> {currentRecord.productName}</p>
            <p><strong>Description:</strong> {currentRecord.description}</p>
            <p><strong>Pricing Ratio:</strong> {currentRecord.pricingRatio}</p>
            <p><strong>Metal:</strong> {currentRecord.metal}</p>
            <p><strong>Shape:</strong> {currentRecord.shape}</p>
            <p><strong>Size:</strong> {currentRecord.size}</p>
            <p><strong>Image:</strong></p>
            <Image width={200} src={currentRecord.imageURL} />
          </>
        )}
      </Modal>

      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default Category;
