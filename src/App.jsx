import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Login from './component/login/Login'; 
import Register from './component/Register/Register'; 
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import ResetPassword from './component/resetpassword/ResetPassword';
import Dashboard from './component/dashboard/dashboard';
import Category from './component/category';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/category",
        element: <Category />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
