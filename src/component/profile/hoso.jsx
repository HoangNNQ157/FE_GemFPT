import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, Space, Upload, Image } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [data, setData] = useState([]);
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
        `https://665d6f09e88051d604068e77.mockapi.io/employees/${currentRecord.id}`,
        values
      );
      const updatedData = data.map((item) => (item.id === currentRecord.id ? response.data : item));
      setData(updatedData);
      localStorage.setItem("employees", JSON.stringify(updatedData));
    } else {
      const response = await axios.post(
        "https://665d6f09e88051d604068e77.mockapi.io/employees",
        values
      );
      const newData = [...data, response.data];
      setData(newData);
      localStorage.setItem("employees", JSON.stringify(newData));
    }
    setIsModalOpen(false);
    setIsEdit(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchData = async () => {
    const localData = JSON.parse(localStorage.getItem("employees"));
    const response = await axios.get(
      "https://665d6f09e88051d604068e77.mockapi.io/employees"
    );
    const fetchedData = response.data;
    const combinedData = localData ? [...fetchedData, ...localData] : fetchedData;
    setData(combinedData);
    localStorage.setItem("employees", JSON.stringify(combinedData));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (record) => {
    await axios.delete(
      `https://665d6f09e88051d604068e77.mockapi.io/employees/${record.id}`
    );
    const updatedData = data.filter((item) => item.id !== record.id);
    setData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));
  };

  const handleUpdate = (record) => {
    setIsEdit(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    showModal();
  };

  const handleUpload = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        form.setFieldsValue({ image: reader.result });
      };
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image width={50} src={text} />,
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
        Add Staff
      </Button>
      <Modal
        footer={false}
        title={isEdit ? "Update Staff" : "Add Staff"}
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input the email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input the password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input the address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please upload an image!",
              },
            ]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
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
        title="View Staff"
        open={isViewModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {currentRecord && (
          <>
            <p><strong>ID:</strong> {currentRecord.id}</p>
            <p><strong>Email:</strong> {currentRecord.email}</p>
            <p><strong>Password:</strong> {currentRecord.password}</p>
            <p><strong>Address:</strong> {currentRecord.address}</p>
            <p><strong>Image:</strong></p>
            <Image width={200} src={currentRecord.image} />
          </>
        )}
      </Modal>

      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Profile;
