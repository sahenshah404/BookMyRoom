import { React, useEffect, useState } from 'react';
import { Button } from "react-bootstrap";

function Complaint() {

    const [complaint, setComplaint] = useState([]);

    useEffect(() => {
        fetch("/admin/dashboard/complaint").then((response) => {

            if (response.status === 503) {
                console.log("database connection problem");
            }
            else if (response.status !== 200 && response.status !== 403) {
                console.log("unAuthenticated login");
            }
            else if (response.status === 403) {
                console.log("unauthorized request");
            }
            else if (response.status === 200) {
                response.json().then((data) => {
                    setComplaint(data)
                })
            }
        })
            .catch()

    }, [complaint.length]);
    const resolved = (id) => {
        fetch("/admin/dashboard/complaint/resolved/" + id).then((response) => {
            if (response.status === 200) {
                setComplaint((prev) => {
                    return {}
                })
            }
        }).catch(err => {
            console.log("something went wrong");
        })
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='formDesign mb-5'>
                    <div className='row bg-dark cards col-12 p-3 mb-3'>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-12 h4'> Name </div>
                        <div className='col-lg-2 col-md-6 col-sm-6 col-12 h4'> Reg_num</div>
                        <div className='col-lg-5 col-md-6 col-sm-6 col-12 h4'> Issue</div>
                    </div>

                    {complaint.length > 0 ?
                        complaint.map((complaint, index) => {
                            return <div key={index}>
                                <div className='row bg-secondary cards col-12 p-2 mb-1'>
                                    <div className='col-lg-3 col-md-6 col-sm-6 col-12 h5'> {complaint.name}</div>
                                    <div className='col-lg-2 col-md-6 col-sm-6 col-12'> {complaint.reg_num}</div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-12'> {complaint.issue}</div>
                                    <div className='col-lg-2 col-md-6 col-sm-6 col-12'>
                                        <Button onClick={() => {
                                            resolved(complaint._id);
                                        }} className='btn btn-success'>Resolved</Button>
                                    </div>
                                </div>
                            </div>
                        })
                        :
                        <div>
                            <div className='container-fluid'>
                                <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
                                    No Active Complaints
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default Complaint