import React from "react";
import { useSelector } from "react-redux";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout/ManagerLayout";
import StaffLayout from "./layouts/StaffLayout/StaffLayout";
import Account from "./pages/admin/Account/Account";
import Customer from "./pages/admin/Customer/Customer";
import Metal from "./pages/admin/Metal/Metal";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ResetPassword from "./pages/auth/resetpassword/ResetPassword";
import HomePage from "./pages/Home/HomePage";
import ManagerDiscount from "./pages/manager/Discount/ManagerDiscount";
import ManagerDashboard from "./pages/manager/ManagerDashboard/ManagerDashboard";
import ManagerStall from "./pages/manager/ManagerStall/ManagerStall";
import Promotion from "./pages/manager/Promotion/Promotion";
import PageNotFound from "./pages/NotFound/PageNotFound"; // Import PageNotFound
import StaffOrder from "./pages/staffs/StaffOrder/StaffOrder";
import Product from "./pages/staffs/StaffProduct/StaffProduct";
import ManagerSidebarLayout from "./layouts/ManagerLayout/ManagerSidebarLayout";
import AdminSiderbarLayout from "./layouts/AdminLayout/AdminSiderbarLayout";
import StaffSidebarLayout from "./layouts/StaffLayout/StaffSidebarLayout";
import Revenue from "./pages/admin/Revenue/Revenue";
import BillPage from "./pages/BillPage/BillPage";
import StaffBuyBack from "./pages/staffs/StaffBuyBack/StaffBuyBack";
import StaffBill from "./pages/staffs/StaffBill/StaffBill";

const App = () => {
    const userData = useSelector((state) => state.user);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="home" element={<HomePage />} />
                <Route path="bill/:id" element={<BillPage />} />
                {userData ? (
                    <>
                        {/* Staff routes */}
                        {(userData.role === "STAFF" ||
                            userData.role === "ADMIN" ||
                            userData.role === "MANAGER") && (
                            <>
                                <Route element={<StaffLayout />}>
                                    <Route
                                        path="staff-order"
                                        element={<StaffOrder />}
                                    />
                                    <Route
                                        path="staff-buy-back"
                                        element={<StaffBuyBack />}
                                    />
                                </Route>
                                <Route element={<StaffSidebarLayout />}>
                                    <Route
                                        path="staff-bill"
                                        element={<StaffBill />}
                                    />
                                    <Route
                                        path="staff-product"
                                        element={<Product />}
                                    />
                                    <Route
                                        path="staff-customer"
                                        element={<Customer />}
                                    />
                                </Route>
                            </>
                        )}

                        {/* Admin routes */}
                        {userData.role === "ADMIN" && (
                            <>
                                <Route element={<AdminLayout />}>
                                    <Route
                                        path="adminAccount"
                                        element={<Account />}
                                    />

                                    <Route
                                        path="adminMetal"
                                        element={<Metal />}
                                    />
                                </Route>
                                <Route element={<AdminSiderbarLayout />}>
                                    <Route
                                        path="adminCustomer"
                                        element={<Customer />}
                                    />
                                    <Route
                                        path="adminRevenue"
                                        element={<Revenue />}
                                    />
                                </Route>
                            </>
                        )}

                        {/* Manager routes */}
                        {(userData.role === "MANAGER" ||
                            userData.role === "ADMIN") && (
                            <>
                                <Route element={<ManagerLayout />}>
                                    <Route
                                        path="managerPromotion"
                                        element={<Promotion />}
                                    />
                                    <Route
                                        path="manager-stall"
                                        element={<ManagerStall />}
                                    />
                                    <Route
                                        path="manager-discount"
                                        element={<ManagerDiscount />}
                                    />
                                </Route>
                                <Route element={<ManagerSidebarLayout />}>
                                    <Route
                                        path="managerDashboard"
                                        element={<ManagerDashboard />}
                                    />
                                    <Route
                                        path="manager-customer"
                                        element={<Customer />}
                                    />
                                </Route>
                            </>
                        )}
                    </>
                ) : null}

                {/* Catch-all route for 404 Page Not Found */}
                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    );

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
