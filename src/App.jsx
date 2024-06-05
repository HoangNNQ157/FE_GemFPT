import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './component/login/Login'; 
import Register from './component/Register/Register'; 
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import ResetPassword from './component/resetpassword/ResetPassword';

function App() {
  return (
    <div className='App'>
    
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          
        </Routes>
    </div>
  );
}

export default App;
