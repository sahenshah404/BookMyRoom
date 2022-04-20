import React from 'react';
import { Routes, Route } from 'react-router-dom';

import StudentRegistration from './StudentRegistration';

function Registration() {
    return (
        <Routes>
            <Route path='/student' element={<StudentRegistration />} />
        </Routes>
    )
}

export default Registration