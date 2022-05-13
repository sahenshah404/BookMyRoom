import { React, useContext, useEffect, useState } from 'react';
import LoginContext from '../../../../../context/LoginContext';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function StudentList() {

    const [loginStatus, setLoginStatus] = useContext(LoginContext);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (loginStatus.authenticated === true && loginStatus.role === "admin") {
            fetch("/admin/dashboard/students").then((response) => {

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
                        setStudents(data)
                    })
                }
            })
                .catch()
        }
    }, [loginStatus, setLoginStatus]);

    return (
        <>
            <div className='container-fluid'>
                <div className='formDesign'>
                <div className='row bg-dark cards col-12 p-3 mb-3'>
                    <div className='col-lg-4 col-md-6 col-sm-6 col-12 h4'> Name </div>
                    <div className='col-lg-2 col-md-6 col-sm-6 col-12 h4'> Reg_num</div>
                    <div className='col-lg-4 col-md-6 col-sm-6 col-12 h4'> Course</div>
                </div>

                {students.length > 0 ?
                    students.map((student, index) => {
                        return <div key={index}>
                            <div className='row bg-secondary cards col-12 p-2 mb-1'>
                                <div className='col-lg-4 col-md-6 col-sm-6 col-12 h5'> {student.name}</div>
                                <div className='col-lg-2 col-md-6 col-sm-6 col-12'> {student.reg_num}</div>
                                <div className='col-lg-4 col-md-6 col-sm-6 col-12'> {student.course}</div>
                                <div className='col-lg-2 col-md-6 col-sm-6 col-12'>
                                    <Button as={Link} to={student.reg_num} className='btn btn-success'>View Profile</Button>
                                </div>
                            </div>
                        </div>
                    })
                    :
                    <div>Fetching Data</div>
                }
                </div>
                </div>
            </>
            )
}

            export default StudentList