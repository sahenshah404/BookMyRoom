import React from 'react';
import { Routes, Route } from "react-router-dom";

import Hostels from './Hostels/Hostels';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Account from './Account/Account';

function Body() {
    return <div >
        <Routes>
            <Route path='/' element={<Hostels />} />
            <Route path='/home' element={<Hostels />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/register/*" element={<Registration />} />
            
            <Route path='/account/*' element={<Account />} />
        </Routes>
    </div>
};

export default Body;