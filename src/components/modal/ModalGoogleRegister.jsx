import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import Cookies from "js-cookie";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { loginWithGoogleRegister } from "../../service/auth";

const ModalGoogleRegister = ({ visible, onCancel, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      const user = {
        email,
        token: response.user.accessToken,
      };
      console.log("Register with Google success:", user);
      // Call your API to register the user with the email and token
      const registerResponse = await loginWithGoogleRegister({ token: user.token, email: user.email });
      Cookies.set("token", registerResponse.data.token);
      dispatch(login(registerResponse.data));
      navigate("/staff-product");
      toast.success("Register with Google Successful");
      onSave();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (values) => {
    handleLoginWithGoogle();
  };

  return (
    <Modal
      visible={visible}
      title="Register Account with Google"
      onCancel={onCancel}
      footer={null}
    >
      <Form onFinish={handleSubmit}>
        {/* <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register with Google
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalGoogleRegister;
