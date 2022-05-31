import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function BookHostel() {
    const hostelId = useParams().id;
    const [rooms, setRooms] = useState();
    const [response, setResponse] = useState();

    let navigate = useNavigate();


    // const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState({ show: false });
    const handleClose = () => setConfirm({ show: false });
    // const handleShow = () => setShow(true);

    // console.log(hostelId);
    useEffect(() => {
        fetch("/student/hostel/book/" + hostelId).then((response => {
            response.json().then(resp => {
                setResponse(resp);
                const rooms = [];
                const hostelData = resp.hostel;
                const allocations = resp.allocations;

                for (let i = 0; i < hostelData.total_room; i++) {

                    rooms[i] = [];
                    for (let j = 0; j < hostelData.room_capacity; j++) {
                        rooms[i].push(true);
                    }

                }

                for (let i = 0; i < allocations.length; i++) {
                    let room_number = allocations[i].room_number;
                    rooms[room_number - 1].pop();
                    rooms[room_number - 1].unshift(false);
                }
                // console.log(rooms);
                setRooms(rooms)
            })
        })).catch()
    }, [hostelId])
    // console.log(rooms);

    const handleSelect = (roomNo) => {
        // handleShow();
        setConfirm({
            roomNo: roomNo,
            show: true
        })
    };
    const handleBook = ({ name, room }) => {
        const bookingData = {
            name: name,
            room: room,
            id: hostelId
        }

        fetch("/student/hostel/book", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        }).then((resp) => {
            if (resp.status === 401 || resp.status === 403) {
                console.log("Not Logged in or unauthorized request");
            } else if (resp.status === 202 || resp.status === 204) {
                alert("The room is full or you already have a room alloted");
            } else if (resp.status === 200) {
                handleClose();
                navigate("/account/student/hostel", { replace: true });
            }else{
                console.log("Something went wrong");
            }
        }).catch()


    }

    return (
        <div className='container-fluid mb-5'>
            <div className='bg-secondary p-3 my-4 mx-4'>
                {rooms ? (
                    <div>
                        <center><h2 className='text-white'>Select Your Room</h2></center>
                        <div>
                            {rooms.map((room, index) => {
                                return (
                                    <div key={index}
                                        className=" mb-2 ">
                                        <div className='text-white bg-dark row text-center'>
                                            <div className='col-md-2 col-12 h5'>
                                                <center> Room No:- {index + 1} </center>
                                            </div>
                                            {room.map((beds, indexx) => {
                                                return (
                                                    <div key={indexx}
                                                        className={room.length < 5
                                                            ? "col-md-" + Math.round(10 / room.length) + " col-4"
                                                            : "col-3"
                                                        }>
                                                        <button className={beds ? "btn btn-sm btn-success col-8" : "btn btn-sm btn-secondary col-8"}
                                                            disabled={!beds}
                                                            onClick={() => handleSelect(index + 1)}>
                                                            Book this bed
                                                        </button>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                )
                    :
                    <h1>Fetching Data</h1>
                }
            </div>

            {response && <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={confirm.show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation Box</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Hostel name : {response.hostel.name}
                        <br />
                        Room No: {confirm.roomNo}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleBook({ name: response.hostel.name, room: confirm.roomNo })}>
                            Book My Room
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            }


        </div >
    )
}

export default BookHostel