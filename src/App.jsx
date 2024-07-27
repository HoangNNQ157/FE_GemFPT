import React from "react";
import { useSelector } from "react-redux";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminSiderbarLayout from "./layouts/AdminLayout/AdminSiderbarLayout";
import ManagerLayout from "./layouts/ManagerLayout/ManagerLayout";
import ManagerSidebarLayout from "./layouts/ManagerLayout/ManagerSidebarLayout";
import StaffLayout from "./layouts/StaffLayout/StaffLayout";
import StaffSidebarLayout from "./layouts/StaffLayout/StaffSidebarLayout";
import Account from "./pages/admin/Account/Account";
import Customer from "./pages/admin/Customer/Customer";
import Metal from "./pages/admin/Metal/Metal";
import Revenue from "./pages/admin/Revenue/Revenue";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ResetPassword from "./pages/auth/resetpassword/ResetPassword";
import BillPage from "./pages/BillPage/BillPage";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import ManagerDiscount from "./pages/manager/Discount/ManagerDiscount";
import ManagerDashboard from "./pages/manager/ManagerDashboard/ManagerDashboard";
import ManagerStall from "./pages/manager/ManagerStall/ManagerStall";
import Promotion from "./pages/manager/Promotion/Promotion";
import PageNotFound from "./pages/NotFound/PageNotFound";
import Policy from "./pages/Policy/Policy";
import PriceTable from "./pages/PriceTable/PriceTable";
import Profile from "./pages/Profile/Profile";
import StaffBill from "./pages/staffs/StaffBill/StaffBill";
import StaffBuyBack from "./pages/staffs/StaffBuyBack/StaffBuyBack";
import StaffOrder from "./pages/staffs/StaffOrder/StaffOrder";
import Product from "./pages/staffs/StaffProduct/StaffProduct";
import ManagerGem from "./pages/manager/ManagerGem/ManagerGem";
import ManagerHistory from "./pages/manager/ManagerHistory/ManagerHistory";
import './App.css'; 

const App = () => {
    const userData = useSelector((state) => state.user);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<PriceTable />} />
                <Route path="price-table" element={<PriceTable />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
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
                                    />{" "}
                                    <Route
                                        path="staff-buy-back"
                                        element={<StaffBuyBack />}
                                    />
                                    <Route
                                        path="staff-discount"
                                        element={<ManagerDiscount />}
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
                                    <Route
                                        path="staff-gem"
                                        element={<ManagerGem />}
                                    />
                                </Route>
                                <Route
                                    path="profile/:id"
                                    element={<Profile />}
                                />
                                <Route
                                    path="product-detail/:id"
                                    element={<DetailProduct />}
                                />
                                <Route path="policy" element={<Policy />} />
                            </>
                        )}
                        {/* Admin routes */}
                        {userData.role === "ADMIN" && (
                            <>
                                <Route element={<AdminLayout />}>
                                    <Route
                                        path="adminMetal"
                                        element={<Metal />}
                                    />
                                </Route>
                                <Route element={<AdminSiderbarLayout />}>
                                    <Route
                                        path="adminAccount"
                                        element={<Account />}
                                    />
                                    <Route
                                        path="adminCustomer"
                                        element={<Customer />}
                                    />
                                    <Route
                                        path="adminRevenue"
                                        element={<Revenue />}
                                    />
                                    
                                </Route>
                                <Route element={<AdminLayout/>}>
                                <Route
                                        path="adminStall"
                                        element={<ManagerStall />}
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
                                        path="manager-history"
                                        element={<ManagerHistory />}
                                    />
                                    <Route
                                        path="manager-product"
                                        element={<ManagerDashboard />}
                                    />
                                    <Route
                                        path="manager-customer"
                                        element={<Customer />}
                                    />
                                    <Route
                                        path="manager-bill"
                                        element={<StaffBill />}
                                    />
                                    <Route
                                        path="manager-revenue"
                                        element={<Revenue />}
                                    />
                                    <Route
                                        path="manager-gem"
                                        element={<ManagerGem />}
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
            <ToastContainer />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
