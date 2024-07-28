import React from "react";
import { Modal, Table } from "antd";
import styled from "styled-components";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    width: 1000px;
    max-width: 100%;
  }
  .ant-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CustomTable = styled(Table)`
  width: 100%;
  font-size: 18px;

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 20px;
  }

  .ant-table-pagination {
    padding: 20px;
  }
`;

const DetailPromotionModal = ({ visible, onCancel, promotion }) => {
  const columns = [
    {
      title: "Product ID",
      dataIndex: ["product", "productId"],
      key: "productId",
    },
    {
      title: "Barcode",
      dataIndex: ["product", "barcode"],
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Category",
      dataIndex: ["product", "category"],
      key: "category",
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
      render: (text) => `${text}%`,
    },
  ];

  return (
    <CustomModal
      title="Detail of Applicable Products"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000} /* Đặt chiều rộng modal tại đây */
      centered={true} /* Đảm bảo modal nằm chính giữa */
    >
      {promotion &&
      promotion.promotionProducts &&
      Array.isArray(promotion.promotionProducts) ? (
        <CustomTable
          dataSource={promotion.promotionProducts}
          columns={columns}
          pagination={{ defaultPageSize: 5 }}
          rowKey="id"
        />
      ) : (
        <p>No products applicable for this promotion.</p>
      )}
    </CustomModal>
  );
};

export default DetailPromotionModal;
