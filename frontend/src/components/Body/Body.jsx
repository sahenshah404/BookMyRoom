import React from 'react';
import { Routes, Route } from "react-router-dom";

import Homepage from './Homepage/Homepage';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Account from './Account/Account';
import Gallery from './Gallery';
import ContactUS from './ContactUS';
import AboutUs from './AboutUs';

function Body() {
    return <div >
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUS />} />


            <Route path="/login/*" element={<Login />} />
            <Route path="/register/*" element={<Registration />} />

            <Route path='/account/*' element={<Account />} />
        </Routes>
    </div>
};

export default Body;