import React from 'react';
import { Routes, Route } from "react-router-dom";

import Hostels from './Hostels/Hostels';
import Login from './Login/Login';
import AdminDashboard from './Admin/AdminDashboard';

function Body() {
    return <div >
        <Routes>
            <Route path='/' element={<Hostels />} />
            <Route path='/home' element={<Hostels />} />
            <Route path="/login/*" element={<Login />} />
            {/* <Route path="/register"/> */}
            <Route path='/adminDashboard' element={<AdminDashboard/>} />
        </Routes>
    </div>
};

export default Body;