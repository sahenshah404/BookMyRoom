import { React, useContext, useEffect, useState } from 'react';
import LoginContext from "../../../../context/LoginContext";

function AdminDashboard() {
  const [loginStatus, setLoginStatus] = useContext(LoginContext);
  const [dashBoardData, setDashboardData] = useState({ data: "dat" });
  // console.log(dashBoardData.data);
  useEffect(() => {
    if (loginStatus.authenticated === true && loginStatus.role === "admin") {

      fetch("/admin/dashboard").then((response) => {

        if (response.status !== 200 && response.status !== 403) {
          setLoginStatus({
            authenticated: false,
            role: "unknown"
          })
        }

        if (response.status === 403) {
          response.text().then((data) => {
            setLoginStatus((prev) => {
              return {
                ...prev,
                role: data
              }
            })

          })
        }

        if (response.status === 200) {
          response.json().then((data) => {
            setDashboardData((prev) => {
              return {
                ...prev,
                ...data
              }
            })
          })
        }
      })
        .catch(() => {
          console.log("error fetching");
        })
    }


  }, [loginStatus, setLoginStatus, dashBoardData.data])



  if (loginStatus.authenticated === true && loginStatus.role === "admin") {
    return (
      <div className='container-fluid'>
        <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
          Admin Dashboard
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