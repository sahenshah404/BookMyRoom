import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

function Admin() {
    return (
        <Routes>
            <Route path='dashboard/*' element={<AdminDashboard />} />
        </Routes>
    )
}

export default Admin