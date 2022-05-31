import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HostelList() {

    const [hostelList, setHostelList] = useState();

    useEffect(() => {
        fetch("/admin/dashboard/hostel/list")
            .then((response) => {
                response.json().then((data) => {
                    setHostelList(data);
                })
            })
            .catch((err) => {
                console.log("error in hostel lsit fetching");
            })
    }, []);

    return (
        <>
            <div className='container-fluid'>
                <div className='text-white p-5 '>
                    <div className='row'>
                        {hostelList ?
                            hostelList.map((hostel, index) => {
                                return (
                                    <div key={index} className="col-lg-4 col-md-6 p-3 px-3">
                                        <Card className='picCard'>
                                            <Card.Img className='cardPic' variant="top" src={hostel.images[0]} />
                                            <Card.Body className='bg-dark'>
                                                <Card.Title >{hostel.name}</Card.Title>
                                                <Card.Text>
                                                    Total Rooms : {hostel.total_room}
                                                </Card.Text>
                                                <Button as={Link} to={hostel._id} variant="success">See Hostel Details</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                            :
                            <div>Fetching data</div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default HostelList