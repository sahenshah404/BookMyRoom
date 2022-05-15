import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';

function HostelRemove() {

    const [hostelList, setHostelList] = useState([]);
    const [show, setShow] = useState(false);
    const [removeHostel, setRemoveHostel] = useState({});

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
    }, [removeHostel.id]);

    const askConfirmation = (hostel) => {
        setRemoveHostel(hostel);
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const confirmRemove = () => {
        fetch("/admin/dashboard/hostel/remove/" + removeHostel.id)
            .then((response) => {
                if (response.status === 200) {
                    setShow(false);
                    // setHostelList((prev) => {
                    //     prev.pop()
                    //     return [
                    //         ...prev
                    //     ]
                    // })
                    setRemoveHostel({});
                } else {
                    console.log("error in removing hostel ");
                }
            }
            )
            .catch((err) => {
                console.log("error in removing hostel ");
            })

    }

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
                                                <Button variant="danger" onClick={() => { askConfirmation({ id: hostel._id, name: hostel.name }) }}>
                                                    Remove this Hostel
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                            :
                            <div>Fetching data</div>
                        }
                    </div>

                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Press Remove to delete {removeHostel.name}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={confirmRemove}>
                                Remove
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </>
    )
}

export default HostelRemove