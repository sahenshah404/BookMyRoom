import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLogin from './AdminLogin';
import StudentLogin from './StudentLogin';
import Logout from './Logout';

function Login() {
  return (
    <Routes>
        <Route path = "/student" element={<StudentLogin/>}/>
        <Route path = "/admin" element={<AdminLogin/>}/>
        <Route path = "/logout" element={<Logout/>}/>
    </Routes>
  )
}

export default Login