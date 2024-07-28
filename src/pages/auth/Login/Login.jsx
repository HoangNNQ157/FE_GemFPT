import React, { useState } from "react";
import * as Yup from "yup";
import "./Login.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithEmail, loginWithGoogle } from "../../../service/auth";
import { login } from "../../../redux/features/counterSlice";
import Cookies from "js-cookie";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { REACT_APP_GOOGLE_CLIENT_ID } from "../../../utils/serverData";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../../config/firebase";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      try {
        const user = await loginWithEmail({
          formData: {
            email: formData.email,
            password: formData.password,
          },
        });
        Cookies.set("token", user.data.token);
        toast.success("Login successful");
        dispatch(login(user.data));
        navigate("/staff-product");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data || "Login failed");
        toast.error("Login failed");
      }
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(formattedErrors);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = await loginWithGoogle({ token: response.user.accessToken });
      console.log("Login with Google success:", user.data);
      Cookies.set("token", user.data.token);
      dispatch(login(user.data));
      navigate("/staff-product");
      toast.success("Login with Google Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Login with Google failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("credentialResponse", credentialResponse);
    // try {
    //     // Optional: decode JWT token to get user info
    //     const decoded = jwtDecode(credentialResponse.credential);
    //     console.log("Google login success:", decoded);

    //     // Assuming you have an API endpoint to handle Google login
    //     const response = await fetch("/api/auth/google-login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ token: credentialResponse.credential }),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //         localStorage.setItem("token", data.token);
    //         dispatch(login(data));
    //         toast.success("Login with Google Successful");
    //     } else {
    //         throw new Error(data.message);
    //     }
    // } catch (error) {
    //     console.error("Google login error:", error);
    //     toast.error(error.message || "Login with Google failed");
    // }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failure:", error);
    toast.error("Login with Google failed");
  };
  return (
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-wrapper">
        <div className="form-box">
          <div className="logoLogin">
            <img src="assets/logo.jpg" className="imgLogo-login" alt="Logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <h3>LOGIN</h3>

            <div className="mb-3 form-item">
              <label className="User-mail">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <span
                className={`error-message ${
                  errors.email ? "" : "hidden-error"
                }`}
              >
                {errors.email || "Email is required"}
              </span>
            </div>

            <div className="mb-3">
              <label className="User">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <span
                className={`error-message ${
                  errors.password ? "" : "hidden-error"
                }`}
              >
                {errors.password || "Password is required"}
              </span>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="login-gg">
            {/*  <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                        /> */}
            <button className="login-gg" onClick={handleLoginWithGoogle}>
              <span className="login-gg-icon">
                <FaGoogle />
              </span>
              <span className="login-gg-text">Login with Google</span>
            </button>
          </div>

          <p className="forgot-password text-right">
            <a href="/forgot-password">Forgot password?</a>
          </p>

          <div className="register-link">
            {/* <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p> */}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
