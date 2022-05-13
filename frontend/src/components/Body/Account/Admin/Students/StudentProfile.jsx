import { React, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoginContext from '../../../../../context/LoginContext';

function StudentProfile() {
    let params = useParams();
    const reg = params.reg;

    const [loginStatus, setLoginStatus] = useContext(LoginContext);
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        if (loginStatus.authenticated === true && loginStatus.role === "admin") {
            fetch("/admin/dashboard/students/" + reg).then((response) => {

                if (response.status === 503) {
                    console.log("database connection problem");
                }
                else if (response.status !== 200 && response.status !== 403) {
                    setLoginStatus({
                        authenticated: false,
                        role: "unknown"
                    })
                }
                else if (response.status === 403) {
                    response.text().then((data) => {
                        setLoginStatus((prev) => {
                            return {
                                ...prev,
                                role: data
                            }
                        })

                    })
                }
                else if (response.status === 200) {
                    response.json().then((data) => {
                        setStudentData(data)
                    })
                }
            })
                .catch((err) => {
                    console.log("error found");
                })
        }
    }, [loginStatus, setLoginStatus, reg]);

    return (
        <>
            <div className='container-fluid'>
                <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
                    <center><h1 className="text-uppercase fs-1">{studentData.name}</h1></center>
                    <table className='w-100'>
                        <tbody className=" fs-5">

                            <tr>
                                <td>Reg No</td>
                                <td>{studentData.reg_num}</td>
                            </tr>
                            <tr>
                                <td>Course</td>
                                <td>{studentData.course}</td>
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td>{studentData.department}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{studentData.gender}</td>
                            </tr>
                            <tr>
                                <td>mobile</td>
                                <td>{studentData.mobile}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{studentData.email}</td>
                            </tr>
                            <tr>
                                <td>PU Mail</td>
                                <td>{studentData.pumail}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </>
    )
}

export default StudentProfile