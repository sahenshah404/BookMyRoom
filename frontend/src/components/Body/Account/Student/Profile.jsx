import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoginContext from '../../../../context/LoginContext';

function MyProfile() {
  const [loginStatus, setLoginStatus] = useContext(LoginContext);
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    if (loginStatus.authenticated === true && loginStatus.role === "student") {

      fetch("/student/profile").then((response) => {
        // console.log("asdf");

        if (response.status === 404) {
          console.log("data not found");
        }
        else if (response.status !== 200 && response.status !== 403) {
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
            setStudentDetails(data);
          })
        }
      })
        .catch(() => {
          console.log("error fetching");
        })
    }


  }, [loginStatus, setLoginStatus])



  if (loginStatus.authenticated === false || loginStatus.role !== "student") {
    return (

      <div className='container-fluid'>
        <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
          <h3>You are not Logged in as a Student</h3>
          <div className='text-center'>
            {
              loginStatus.authenticated === false &&
              <Link to="/login/student">
                <button className='btn btn-success m-auto'> Login</button>
              </Link>
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className='container-fluid'>
          <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
            <center><h1 className="text-uppercase fs-1">{studentDetails.name}</h1></center>
            <table className='w-100'>
              <tbody className=" fs-5">
                <br/>
                <tr>
                  <td>Reg No</td>
                  <td>{studentDetails.reg_num}</td>
                </tr>
                <tr>
                  <td>Course</td>
                  <td>{studentDetails.course}</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>{studentDetails.department}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{studentDetails.gender}</td>
                </tr>
                <tr>
                  <td>mobile</td>
                  <td>{studentDetails.mobile}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{studentDetails.email}</td>
                </tr>
                <tr>
                  <td>PU Mail</td>
                  <td>{studentDetails.pumail}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

      </>

    )
  }
}

export default MyProfile