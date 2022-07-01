import { React, useContext } from "react";
import LoginContext from "../../../../context/LoginContext";
import { Route, Routes } from "react-router-dom";

import Cards from "./Cards";
import Students from "./Students/Students";
import Hostels from "./Hostels/Hostels";
import Allocated from "./Allocated";
import AllocationArchive from "./Students/AllocationArchive";
import Complaint from "./Students/Complaint"

function AdminDashboard() {
  const [loginStatus] = useContext(LoginContext);

  if (loginStatus.authenticated === true && loginStatus.role === "admin") {
    return (
      <div>
        {
          <Routes>
            <Route path="" element={<Cards />} />
            <Route path="students/*" element={<Students />} />
            <Route path="hostels/*" element={<Hostels />} />
            <Route path="allocated" element={<Allocated />} />
            <Route path="allocationArchive" element={<AllocationArchive />} />
            <Route path="complaints" element={<Complaint />} />
          </Routes>
        }
      </div>
    );
  } else {
    return <div>not admin</div>;
  }
}

export default AdminDashboard;
