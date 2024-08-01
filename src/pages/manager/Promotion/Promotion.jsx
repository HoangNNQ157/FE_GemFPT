import { Button, Flex, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { BiEdit, BiDetail } from "react-icons/bi";
import { MdOutlineChangeCircle, MdOutlineEditOff } from "react-icons/md";
import { toast } from "react-toastify";
import PromotionForm from "../../../components/modal/PromotionForm";
import PromotionFormUpdate from "../../../components/modal/PromotionFormUpdate";
import { getListProductsActive } from "../../../service/productService";
import {
  createAllPromotion,
  createCatePromotion,
  createPromotion,
  deletePromotion,
  getListPromotion,
  updatePromotion,
} from "../../../service/promotionService";
import PromotionCreateAllForm from "../../../components/modal/PromotionCreateAllForm";
import PromotionCreateCategoryForm from "../../../components/modal/PromotionCreateCategoryForm";
import DetailPromotionModal from "../../../components/modal/DetailPromotionModal";

const Promotion = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Discount Program",
      dataIndex: "programName",
      key: "programName",
    },
    {
      title: "Discount",
      dataIndex: "discountRate",
      key: "discountRate",
      render: (text) => `${text}%`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <p
          style={{
            maxWidth: "200px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            lineClamp: 2,
          }}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Apapplicable Products",
      dataIndex: "applicableProducts",
      key: "applicableProducts",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (record.status ? "Active" : "Inactive"),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          {record?.status ? (
            <Button
              onClick={() => handleShowModalUpdate(record)}
              type="link"
              icon={<BiEdit size={24} />}
            />
          ) : (
            <Button danger icon={<MdOutlineEditOff size={24} />} />
          )}
          <Popconfirm
            title="Do you want to cancel promotion ?"
            onConfirm={() => handleDelteProduct(record)}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<MdOutlineChangeCircle size={24} />}
              style={{ marginLeft: "10px", color: "blue" }}
            />
          </Popconfirm>
          <Button
            onClick={() => handleShowDetailModal(record)}
            type="link"
            icon={<BiDetail size={24} />}
            style={{ marginLeft: "10px" }}
          />
        </span>
      ),
    },
  ];

  const [dataPromotion, setDataPromotion] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [visible, setVisible] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showAllPromotion, setShowAllPromotion] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [detailPromotionModalVisible, setDetailPromotionModalVisible] =
    useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);

  useEffect(() => {
    try {
      getListPromotion()
        .then((data) => data.data)
        .then((data) => setDataPromotion(data));
      getListProductsActive()
        .then((data) => data.data)
        .then((data) => setDataProduct(data));
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    }
  }, []);

  const showModal = () => {
    setVisible(true);
  };
  const showModalAllPromotion = () => {
    setShowAllPromotion(true);
  };
  const handleShowModalUpdate = (record) => {
    setShowModalUpdate(true);
    setDataUpdate(record);
  };

  const handleCancel = () => {
    setVisible(false);
    setDataUpdate(null);
  };
  const handleCancelModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const handleCancelAllPromotion = () => {
    setShowAllPromotion(false);
  };
  const handleCancelCatePromotion = () => {
    setShowCategoryModal(false);
  };
  const handleSave = async (values) => {
    try {
      const response = await createPromotion({ formData: values });
      if (response.data) {
        toast.success("Successfully created a discount");
        getListPromotion()
          .then((data) => data.data)
          .then((data) => setDataPromotion(data));
      }
    } catch (error) {

      toast.error(error.response?.data);
    } finally {
      setVisible(false);
    }
  };
  const handleUpdatePromotion = async (values) => {
    try {
      const response = await updatePromotion({
        formData: { ...values, disID: dataUpdate.id },
      });
      if (response.data) {
        toast.success("Discount updated successfully");
        getListPromotion()
          .then((data) => data.data)
          .then((data) => setDataPromotion(data));
      }
      setDataUpdate(null);
    } catch (error) {

      toast.error(error.response?.data);
    }
    finally {
      setShowModalUpdate(false);
    }
  };
  const handleCreateAllPromotion = async (values) => {
    try {
      const response = await createAllPromotion({
        formData: values,
      });
      if (response.data) {
        toast.success("Create discount for all product successfully");
        getListPromotion()
          .then((data) => data.data)
          .then((data) => setDataPromotion(data));
      }
    } catch (error) {

      toast.error(error.response?.data);
    } finally {
      setShowAllPromotion(false);
    }
  };
  const handleCreateCatePromotion = async (values) => {
    try {
      const response = await createCatePromotion({
        formData: {
          programName: values.programName,
          discountRate: values.discountRate,
          description: values.description,
          endTime: values.endTime,
        },
        category: values.category,
      });
      if (response.data) {
        toast.success("Create discount for all product successfully");
        getListPromotion()
          .then((data) => data.data)
          .then((data) => setDataPromotion(data));
      }
    } catch (err) {
      toast.error(err.response?.data || "Error from server, try again");
    } finally {
      setShowCategoryModal(false);
    }
  };
  const handleShowDetailModal = (record) => {
    setCurrentPromotion(record);
    setDetailPromotionModalVisible(true);
  };
  const handleCancelDetailModal = () => {
    setDetailPromotionModalVisible(false);
    setCurrentPromotion(null);
  };

  const handleDelteProduct = async (record) => {
    try {
      // call api delete
      const response = await deletePromotion({ id: record.id });
      if (response.data) {
        toast.success("Discount removed successfully");
        getListPromotion()
          .then((data) => data.data)
          .then((data) => setDataPromotion(data));
      }
    } catch (error) {

      toast.error(error.response?.data);
    }
  };

  return (
    <>
      <Flex>
        <button className="btn-add" onClick={() => showModal("create")}>
          ADD PROMOTION
        </button>

        <button className="btn-add" onClick={() => setShowCategoryModal(true)}>
          ADD PROMOTION CATEGORY
        </button>
        <button
          className="btn-add"
          onClick={() => showModalAllPromotion("create")}
        >
          ADD ALL PRODUCT
        </button>
      </Flex>
      <Table
        dataSource={dataPromotion.reverse()}
        columns={columns}
        pagination={{ defaultPageSize: 8 }}
      />
      <PromotionForm
        dataProduct={dataProduct}
        onCancel={handleCancel}
        onSave={handleSave}
        visible={visible}
      />
      <PromotionFormUpdate
        onCancel={handleCancelModalUpdate}
        onSave={handleUpdatePromotion}
        visible={showModalUpdate}
        initialData={dataUpdate}
      />
      <PromotionCreateAllForm
        visible={showAllPromotion}
        onCancel={handleCancelAllPromotion}
        onSave={handleCreateAllPromotion}
      />
      <PromotionCreateCategoryForm
        visible={showCategoryModal}
        onCancel={handleCancelCatePromotion}
        onSave={handleCreateCatePromotion}
      />
      <DetailPromotionModal
        visible={detailPromotionModalVisible}
        onCancel={handleCancelDetailModal}
        promotion={currentPromotion}
      />
    </>
  );
};

export default Promotion;
