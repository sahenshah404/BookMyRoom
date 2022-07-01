import { React, useContext, useEffect, useState } from "react";
import LoginContext from "../../../../../context/LoginContext";

function AllocationArchive() {
    const [loginStatus, setLoginStatus] = useContext(LoginContext);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (loginStatus.authenticated === true && loginStatus.role === "admin") {
            fetch("/admin/dashboard/allocated/archive")
                .then((response) => {
                    if (response.status === 503) {
                        console.log("database connection problem");
                    } else if (response.status !== 200 && response.status !== 403) {
                        setLoginStatus({
                            authenticated: false,
                            role: "unknown",
                        });
                    } else if (response.status === 403) {
                        response.text().then((data) => {
                            setLoginStatus((prev) => {
                                return {
                                    ...prev,
                                    role: data,
                                };
                            });
                        });
                    } else if (response.status === 200) {
                        response.json().then((data) => {
                            setStudents(data);
                        });
                    }
                })
                .catch();
        }
    }, [loginStatus, setLoginStatus]);

    return (
        <>
            <div className="container-fluid">
                <div className="formDesign mb-5">
                    <div className="row bg-dark cards col-12 p-3 mb-3">
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 h4"> Name </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 h4"> Reg_num</div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 h4"> Hostel Name</div>
                        <div className="col-lg-1 col-md-3 col-sm-4 col-6 h4"> Room No</div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 h4"> Course</div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-6 h4"> Department</div>
                    </div>

                    {students.length > 0 ? (
                        students.map((student, index) => {
                            return (
                                <div key={index}>
                                    <div className="row bg-secondary cards col-12 p-2 mb-1">
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 h5">
                                            {" "}
                                            {student.studName}
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                                            {" "}
                                            {student.reg_num}
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                                            {" "}
                                            {student.hostelName}
                                        </div>
                                        <div className="col-lg-1 col-md-3 col-sm-4 col-6">
                                            {" "}
                                            {student.room_no}
                                        </div>
                                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                                            {" "}
                                            {student.course}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                                            {" "}
                                            {student.department}
                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>Fetching Data</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllocationArchive;
