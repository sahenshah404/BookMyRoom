import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel, Card, Button } from 'react-bootstrap';

function HostelDetails() {
    let params = useParams();
    const id = params.id;

    const [hostelData, setHostelData] = useState({});

    useEffect(() => {
        fetch("/student/hostel/detail/" + id).then((response) => {

            if (response.status === 503 || response.status === 204) {
                console.log("database connection problem");
            }
            else if (response.status === 401 || response.status === 403) {
                console.log("Unauthorized");
            }
            else if (response.status === 200) {
                response.json().then((data) => {
                    setHostelData(data)
                })
            }
        })
            .catch((err) => {
                console.log("error found");
            })

    }, [id]);

    if (hostelData.images) {
        if (hostelData.images.length >= 4) {
            hostelData.carouselItems = hostelData.images.slice(0, 4)
        } else {
            hostelData.carouselItems = hostelData.images;
        }

    }
    return (
        <>{hostelData.images ?
            <div className='row'>
                <div className='col-lg-6'>
                    {hostelData.carouselItems &&
                        <Carousel>

                            {hostelData.carouselItems.map((image, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100 carouselImage"
                                            src={image}
                                            alt={index + "pic of" + hostelData.name}
                                        />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    }


                </div>
                <div className='col-lg-6 mb-5'>

                    <div className='container-fluid p-2 pt-5 mb-5 '>
                        <div className='text-white  bg-dark p-4'>
                            <center><h1 className="text-uppercase fs-1">{hostelData.name}</h1></center><br />
                            <table className='w-100'>
                                <tbody className=" fs-5">
                                    <tr>
                                        <td>Total Room</td>
                                        <td>{hostelData.total_room}</td>
                                    </tr>
                                    <tr>
                                        <td>Accomodation per room</td>
                                        <td>{hostelData.room_capacity}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Accomodation</td>
                                        <td>{hostelData.total_capacity}</td>
                                    </tr>
                                    <tr>
                                        <td>Hostel For</td>
                                        <td>{hostelData.gender === "M" ? "Boys" : "Girls"}</td>
                                    </tr>
                                    <tr>
                                        <td>Warden Name</td>
                                        <td>{hostelData.warden}</td>
                                    </tr>
                                    <tr>
                                        <td>mobile</td>
                                        <td>{hostelData.contact_no}</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className='d-grid px-3'>
                        <Button className='btn btn-success btn-lg '
                            as={Link} to="book">Book this Hostel</Button>
                    </div>
                </div>

                <div className='container-fluid mb-5'><br />
                    <span className='h1'> Images</span>
                    <div className='text-white p-3 '>
                        <div className='row'>
                            {hostelData.images &&
                                hostelData.images.map((image, index) => {
                                    return (
                                        <div key={index} className="col-lg-4 col-md-6 p-3 px-3">
                                            <Card className='picCard'>
                                                <Card.Img className='cardPic' variant="top" src={image} />
                                            </Card>
                                        </div>
                                    )
                                })

                            }
                        </div>

                    </div>
                </div>

            </div>

            :
            <div>Fetching Data</div>
        }
        </>
    )
}

export default HostelDetails