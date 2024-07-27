import { Button, DatePicker, Form, Modal, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { getAllAccout } from "../../service/account";

const { Option } = Select;

const StaffWorkingForm = ({ visible, onCancel, onSave }) => {
    const [form] = Form.useForm();
    const [listAccount, setListAccount] = useState([]);

    useEffect(() => {
        form.resetFields();
        if (visible) {
            getAllAccout()
                .then((res) => res.data)
                .then((data) => {
                    const checkData = data.filter(
                        (item) => item.status === true
                    );
                    setListAccount(checkData);
                });
        }
    }, [visible]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onSave({
                    ...values,
                    startWorkingDateTime: values.startWorkingDateTime,
                    endWorkingDateTime: values.endWorkingDateTime,
                });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Modal
            title="Add Staff Working Schedule"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={600}
        >
            <Form form={form} layout="vertical" name="staff_working_form">
                <Form.Item
                    name="accountIds"
                    label="Select Accounts"
                    rules={[
                        {
                            required: true,
                            message: "Please select at least one account!",
                        },
                    ]}
                >
                    <Select mode="multiple" placeholder="Select accounts">
                        {listAccount.map((account) => (
                            <Option key={account.id} value={account.id}>
                                {`${account.email} - ${account.name}`}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="staffWorkingStatus"
                    label="Working Status"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="startWorkingDateTime"
                    label="Start Working Date and Time"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select start working date and time!",
                        },
                    ]}
                >
                    <DatePicker showTime style={{ width: "100%" }} />
                    </Form.Item>
                <Form.Item
                    name="endWorkingDateTime"
                    label="End Working Date and Time"
                    rules={[
                        {
                            required: true,
                            message: "Please select end working date and time!",
                        },
                    ]}
                >
                    <DatePicker showTime style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => form.resetFields()}
                    >
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StaffWorkingForm;