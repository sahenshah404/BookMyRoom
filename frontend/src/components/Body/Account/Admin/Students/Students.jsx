import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentList from './StudentList';
import StudentProfile from './StudentProfile';

function Students() {
    return (
        <Routes>
            <Route path='list' element={<StudentList />} />
            <Route path='list/:reg' element={<StudentProfile />} />
        </Routes>
    )
}

export default Students