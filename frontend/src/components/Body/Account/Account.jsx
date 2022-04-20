import React from 'react'
import { Routes, Route } from 'react-router-dom'


import Admin from './Admin/Admin';
import Student from './Student/Student';

function Account() {
    return (
        <Routes>
            <Route path='admin/*' element={<Admin />} />
            <Route path='student/*' element={<Student />} />
        </Routes>
    )
}

export default Account