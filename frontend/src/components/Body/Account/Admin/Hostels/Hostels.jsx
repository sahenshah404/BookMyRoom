import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AddHostel from './AddHostel';
import HostelList from './HostelList';
import HostelDetails from './HostelDetails';
import HostelRemove from './HostelRemove';
import HostelEdit from './HostelEdit';

function Hostels() {
    return (
        <Routes>
            <Route path='add' element={<AddHostel />} />
            <Route path='list' element={<HostelList />} />
            <Route path='list/:name' element={<HostelDetails />} />
            <Route path='remove' element={<HostelRemove />} />
            <Route path='edit' element={<HostelEdit />} />
        </Routes>
    )
}

export default Hostels