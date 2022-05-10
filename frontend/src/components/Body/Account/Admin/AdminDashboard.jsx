import { React, useContext } from 'react';
import LoginContext from "../../../../context/LoginContext";
import { Route, Routes } from 'react-router-dom';

import Cards from './Cards';
import Students from "./Students/Students"

function AdminDashboard() {
  const [loginStatus] = useContext(LoginContext);
  


  if (loginStatus.authenticated === true && loginStatus.role === "admin") {
    
    return (
      <div className='container-fluid'>
        <div className='formDesign '>
          {
            <div>
              
              <Routes>
                <Route path='' element={<Cards />} />
                <Route path='students/*' element={< Students />} />
                <Route path='hostels' element={< h3> Hostel list </h3>} />
                <Route path='allocated' element={< h3> Currently allocated List </h3>} />
                <Route path='addHostel' element={< h3> Add Hostel </h3>} />
                <Route path='delHostel' element={< h3> Delete Hostel </h3>} />
                {/* <Cards count={counts} /> */}
              </Routes>
            </div>
            
          }
        </div>
      </div>
    )
  }
  else {
    return (
      <div>not admin</div>
    )
  }
}

export default AdminDashboard