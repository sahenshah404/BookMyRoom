import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Profile from './Profile';
import Hostel from './Hostel';
import BookHostel from './BookHostel';
import HostelDetails from './HostelDetails';

function Student() {
    return (
        <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="hostel" element={<Hostel />} />
            <Route path="hostel/:id" element={<HostelDetails />} />
            <Route path="hostel/:id/book" element={<BookHostel />} />
        </Routes>
    )
}

export default Student