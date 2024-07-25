import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, Router, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import api from "../../../config/axios";
import "./Register.css";
import { registerApi } from "../../../service/auth";
import { BiPhone } from "react-icons/bi";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(2, "No shorter than 2 characters!")
            .max(50, "No longer than 50 characters!")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        phone: Yup.string().required("Phone number is required"),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const userRigister = await registerApi({
                formData: {
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                },
            });
            if (userRigister.data) {
                toast.success("Successfully registered as a member");
                navigate("/login");
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach((err) => {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [err.path]: err.message,
                    }));
                });
            } else {
                console.log(error);
                toast.error(
                    error.response?.data || "Registration failed - unknown error"
                );
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="register-wrapper">
            <div className="form register">
                <form onSubmit={handleSubmit}>
                    <div className="logoRegister">
                        <img
                            src="assets/logo.jpg"
                            className="imgRegister"
                            alt="Logo"
                        />
                    </div>
                    <h3>SIGN UP</h3>

                    <div className="mb-3">
                        <label className="title-Regis">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <FaUser className="icon-form" />
                        <div className="error-message-container">
                            {errors.username && (
                                <span className="error-message">
                                    {errors.username}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="title-Regis">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FaEnvelope className="icon-form" />
                        <div className="error-message-container">
                            {errors.email && (
                                <span className="error-message">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="title-Regis">Phone</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <BiPhone className="icon-form" />
                        <div className="error-message-container">
                            {errors.phone && (
                                <span className="error-message">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="title-Regis">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {showPassword ? (
                            <FaEye
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer" }}
                                className="icon-form"
                            />
                        ) : (
                            <FaEyeSlash
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer" }}
                                className="icon-form"
                            />
                        )}
                        <div className="error-message-container">
                            {errors.password && (
                                <span className="error-message">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="title-Regis">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        {showConfirmPassword ? (
                            <FaEye
                                onClick={toggleConfirmPasswordVisibility}
                                className="icon-form"
                                style={{ cursor: "pointer" }}
                            />
                        ) : (
                            <FaEyeSlash
                                onClick={toggleConfirmPasswordVisibility}
                                className="icon-form"
                                style={{ cursor: "pointer" }}
                            />
                        )}
                        <div className="error-message-container">
                            {errors.confirmPassword && (
                                <span className="error-message">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign up
                        </button>
                    </div>

                    <div className="Login-Link">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
