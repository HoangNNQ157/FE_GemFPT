import React from 'react';
import { Modal, Table } from 'antd';
import moment from 'moment';

const ViewStallModal = ({ visible, onCancel, stallAccounts }) => {
    const columns = [
        {
            title: "Cashier ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Cashier",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Start Date",
            dataIndex: "startWorkingDateTime",
            key: "startWorkingDateTime",
            render: (text) => moment(text).format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: "End Date",
            dataIndex: "endWorkingDateTime",
            key: "endWorkingDateTime",
            render: (text) => moment(text).format('DD-MM-YYYY HH:mm:ss'),
        },
    ];

    return (
        <Modal 
            visible={visible} 
            onCancel={onCancel} 
            footer={null} 
            title="Stall Accounts" 
            width="80%" 
        >
            <Table dataSource={stallAccounts} columns={columns} pagination={false} />
        </Modal>
    );
};

export default ViewStallModal;
