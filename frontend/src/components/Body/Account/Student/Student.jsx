import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Profile from './Profile';
import Hostel from './Hostel';
import BookHostel from './BookHostel';
import HostelDetails from './HostelDetails';
import HostelLeave from './HostelLeave';
import HostelChange from './HostelChange';
import Complaint from './Complaint';

function Student() {
    return (
        <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="hostel" element={<Hostel change={false} />} />
            <Route path="hostel/:id" element={<HostelDetails />} />
            <Route path="hostel/:id/book" element={<BookHostel />} />
            <Route path="hostel/leave" element={<HostelLeave />} />
            <Route path="hostel/change" element={<Hostel change={true} />} />
            <Route path="hostel/change/:id" element={<HostelDetails />} />
            <Route path="hostel/change/:id/book" element={<HostelChange />} />
            <Route path="complaint" element={<Complaint />} />

        </Routes>
    )
}

export default Student