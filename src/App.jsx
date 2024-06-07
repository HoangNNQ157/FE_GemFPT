import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/Register/Register";
import ForgotPassword from "./component/forgotpassword/ForgotPassword";
import ResetPassword from "./component/resetpassword/ResetPassword";
import Dashboard from "./component/dashboard/dashboard";
import Category from "./component/category";
//import "./output.css";
import StaffLayout from "./layouts/StaffLayout";
import Order from "./pages/staffs/Order";
import Product from "./pages/staffs/Product";
import History from "./pages/staffs/History";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      <Route path="dashboard" element={<Dashboard/>}>
        <Route path="category" element={<Category />}/>
      </Route>

      <Route element={<StaffLayout />}>
        <Route path="staffOrder" element={<Order />} />
        <Route path="staffProduct" element={<Product />} />
        <Route path="staffHistory" element={<History />} />
      </Route>
    </Route>
  )
);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//     children: [
//       {
//         path: "/dashboard/category",
//         element: <Category />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPassword />,
//   },
// ]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
