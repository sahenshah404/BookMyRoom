import { React, useContext } from 'react';
import LoginContext from "../../../../context/LoginContext";
import { Route, Routes } from 'react-router-dom';

import Cards from './Cards';
import Students from "./Students/Students";
import Hostels from './Hostels/Hostels';

function AdminDashboard() {
  const [loginStatus] = useContext(LoginContext);



  if (loginStatus.authenticated === true && loginStatus.role === "admin") {

    return (
      // <div className='container-fluid'>
      //   <div className='formDesign '>
      <div>
        {

          <Routes>
            <Route path='' element={<Cards />} />
            <Route path='students/*' element={< Students />} />
            <Route path='hostels/*' element={<Hostels />} />
            <Route path='allocated' element={< h3> Currently allocated List </h3>} />
          </Routes>
        }
      </div>

      //   </div>
      // </div>
    )
  }
  else {
    return (
      <div>not admin</div>
    )
  }
}

export default AdminDashboard