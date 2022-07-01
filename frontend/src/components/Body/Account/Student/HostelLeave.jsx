import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function HostelLeave() {

    let navigate = useNavigate();

    const leave = () => {
        fetch("/student/hostel/leave").then((response) => {
            if (response.status === 200) {
                navigate("/home", { replace: true });
            }
            else {
                alert("Something went wrong");
            }
        }).catch((err) => {
            console.log("something went wrong");
        })
    }

    return (
        <div className="text-center mb-5">
            <div className="container-fluid p-2 pt-5 mb-5 ">
                <div className='text-white  bg-dark p-4'>
                    <h1>Confirmation Box!</h1>
                    <div className='mt-5'>
                        <Button className='btn btn-lg' variant={"danger"} onClick={leave}>confirm leave</Button>
                    </div>
                    <div className='mt-5'>
                        <Button as={Link} to={"../hostel/change"} className='btn btn-lg' variant={"warning"}>change room instead</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HostelLeave