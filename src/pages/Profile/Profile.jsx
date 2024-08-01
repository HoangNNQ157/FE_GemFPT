import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileById } from "../../service/auth";
import {
    Card,
    Row,
    Col,
    Input,
    Button,
    Avatar,
    Typography,
    Form,
    DatePicker,
    Switch,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
const { Title } = Typography;
import "./profile.css";
import { updateAccountStaff } from "../../service/account";
import { toast } from "react-toastify";
import { CgArrowLeft } from "react-icons/cg";

const Profile = () => {
    const param = useParams();
    const { id } = param;
    const [userData, setUserData] = useState();
    const [form] = Form.useForm();
    const navigator = useNavigate();
    useEffect(() => {
        getProfileById({ userId: id })
            .then((res) => res.data)
            .then((data) => {
                setUserData(data);
                form.setFieldsValue({
                    ...data,
                    startWorkingDateTime: data?.startWorkingDateTime
                        ? moment(data?.startWorkingDateTime)
                        : null,
                    endWorkingDateTime: data?.endWorkingDateTime
                        ? moment(data?.endWorkingDateTime)
                        : null,
                    createDate: data?.createDate
                        ? moment(data?.createDate)
                        : null,
                });
            });
    }, [param]);

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                updateAccountStaff({
                    email: values.email,
                    formData: {
                        phone: values.phone,
                        description: values.description,
                        email: values.email,
                        name: values.name,
                    },
                })
                    .then((res) => res.data)
                    .then((data) => {
                        toast.success("Update profile successfull");
                        getProfileById({ userId: id })
                            .then((res) => res.data)
                            .then((data) => {
                                setUserData(data);
                                form.setFieldsValue({
                                    ...data,
                                    startWorkingDateTime:
                                        data?.startWorkingDateTime
                                            ? moment(data?.startWorkingDateTime)
                                            : null,
                                    endWorkingDateTime: data?.endWorkingDateTime
                                        ? moment(data?.endWorkingDateTime)
                                        : null,
                                    createDate: data?.createDate
                                        ? moment(data?.createDate)
                                        : null,
                                });
                            });
                    })
                    .catch((error) => {
                        toast.error("Error updating");
                    });
            })
            .catch((info) => {
                toast.error("Error updating");
                console.log("Validate Failed:", info);
            });
    };

    return userData ? (
        <Row justify="center" className="profile-wrapper">
            <Button
                style={{ marginRight: "6px" }}
                onClick={() => navigator(-1)}
            >
                <CgArrowLeft />
                BACK
            </Button>
            <Col xs={24} sm={24} md={20} lg={16} xl={16}>
                <Card className="profile-card" bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8} className="profile-avatar-section">
                            <Avatar
                                size={100}
                                icon={<UserOutlined />}
                                className="profile-avatar"
                            />
                            <Title level={4} className="profile-name">
                                {userData.name}
                            </Title>
                            <p className="profile-email">{userData.email}</p>
                        </Col>
                        <Col xs={24} sm={16}>
                            <Form form={form} layout="vertical">
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item name="id" label="ID">
                                            <Input
                                                disabled
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="name"
                                            label="Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter your name!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Name"
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="phone"
                                            label="Phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter your phone number!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Phone"
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="description"
                                            label="Description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter your description!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Description"
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter your email!",
                                                    type: "email",
                                                },
                                            ]}
                                        >
                                            <Input
                                                disabled
                                                placeholder="Email"
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="role" label="Role">
                                            <Input
                                                disabled
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="createDate"
                                            label="Create Date"
                                        >
                                            <DatePicker
                                                disabled
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="stallsWorkingId"
                                            label="Stalls Working ID"
                                        >
                                            <Input
                                                disabled
                                                placeholder="Stalls Working ID"
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            name="startWorkingDateTime"
                                            label="Start Working DateTime"
                                        >
                                            <DatePicker
                                                disabled
                                                showTime
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="endWorkingDateTime"
                                            label="End Working DateTime"
                                        >
                                            <DatePicker
                                                disabled
                                                showTime
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="username"
                                            label="Username"
                                        >
                                            <Input
                                                disabled
                                                placeholder="Username"
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            name={[
                                                "authorities",
                                                0,
                                                "authority",
                                            ]}
                                            label="Authority"
                                        >
                                            <Input
                                                disabled
                                                className="profile-input"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={24}
                                        className="save-profile-button"
                                    >
                                        <Button
                                            type="primary"
                                            onClick={handleSave}
                                        >
                                            Save Profile
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    ) : null;
};

export default Profile;
