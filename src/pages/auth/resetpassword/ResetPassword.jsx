import { useState } from "react";
import * as Yup from "yup";
import "./ResetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../../../config/axios";
import axios from "axios";

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
   
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
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

            try {
                const response = await axios.post("http://143.198.92.27:8080/reset_password", {
                    password: formData.password,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log("Reset password success:", response);
                toast.success("Password reset successfully");
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data || "Request failed");
            }
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce(
                (acc, error) => {
                    return { ...acc, [error.path]: error.message };
                },
                {}
            );
            setErrors(formattedErrors);
        }
    };

    return (
        <div className="form-box reset-password">
            <img src="assets/logo.jpg" className="logo" alt="Logo" />
            <form onSubmit={handleSubmit}>
                <h3>Reset Password</h3>

                {/* Invisible element to reserve space for email error message */}
                <div className="invisible-placeholder">&nbsp;</div>

                <div className="mb-3">
                    <label className="title-reset">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your new password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <span className="error-message">{errors.password}</span>
                    )}
                </div>

                <div className="mb-3">
                    <label className="title-reset">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm your new password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </div>
                <div className="Login-Link">
                    <p>
                        <Link to="/login">Login</Link>
                    </p>
                </div>

                <ToastContainer />
            </form>
        </div>
    );
}
