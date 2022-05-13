import { React, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function AddHostel() {
    const [input, setInput] = useState({
        name: "",
        total_room: 0,
        room_capacity: 0,
        gender: "M",
        warden: "",
        contact_no: "",
        images: []

    });

    const [warning, setWarning] = useState(null);

    const inputHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const fileInputHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.files
            }
        })
        console.log(e.target.files);
    }

    const submit = (e) => {
        e.preventDefault();
        setWarning("submitting");

        if (input.name.length < 1) {
            setWarning("Please enter Hostel name ");
        }
        else if (input.warden.length < 1) {
            setWarning("Please enter last name");
        }
        else {
            const data = new FormData();
            data.append("name", input.name);
            data.append("total_room", input.total_room);
            data.append("room_capacity", input.room_capacity);
            data.append("gender", input.gender);
            data.append("warden", input.warden);
            data.append("contact_no", input.contact_no);
            for (let i = 0; i < input.images.length; i++) {
                data.append("images", input.images[i]);

            }

            fetch("/admin/dashboard/hostel/add", {
                method: "POST",
                body: data
            }).then((data) => {

                if (data.status === 200) {
                    setWarning(null);
                    setInput({
                        name: "",
                        total_room: 0,
                        room_capacity: 0,
                        gender: "M",
                        warden: "",
                        contact_no: ""
                    });

                } else {
                    if (data.status === 205) {
                        setWarning("Hostel already exists");
                    }
                    else {
                        setWarning("not submitted");
                    }
                }
            })
                .catch((err) => {
                    alert("Server Connection Problem");
                })
        }
    }


    return (
        <div className='container-fluid mb5rem  px-5'>
            <div className='formDesign p-4 px-5'>
                <div className='p-5 col-12 bg-secondary'>
                    <h2>Add Hostel</h2>
                    <br />

                    <Form >
                        <div className='row h5'>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Hostel name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Hostel name"
                                        value={input.name} name="name"
                                        onChange={inputHandler} />
                                </Form.Group>
                            </div>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="total_room">
                                    <Form.Label>Total Rooms</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Total No. of Rooms"
                                        value={input.total_room} name="total_room"
                                        onChange={inputHandler} />
                                </Form.Group>
                            </div>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="room_capacity">
                                    <Form.Label>Accomodation Per Room</Form.Label>
                                    <Form.Control type="number" placeholder="Enter No. of Beds per Room"
                                        value={input.room_capacity} name="room_capacity"
                                        onChange={inputHandler} />
                                </Form.Group>
                            </div>

                            <div className='col-12'>

                                <Form.Group className="mb-3" controlId="gender">
                                    <div className='row'>
                                        <div className='col-lg-5 col-md-5'>
                                            <Form.Label>Hostel For</Form.Label>
                                        </div>
                                        <div className='col-lg-7 col-md-6'>

                                            <select name="gender" value={input.gender} onChange={inputHandler}
                                                className="btn btn-light">
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </select>

                                        </div>

                                    </div>
                                </Form.Group>
                            </div>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="warden">
                                    <Form.Label>Name of the Warden</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name of the Warden"
                                        value={input.warden} name="warden"
                                        onChange={inputHandler} />
                                </Form.Group>
                            </div>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="contact_no">
                                    <Form.Label>Contact Details</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the contact No"
                                        value={input.contact_no} name="contact_no"
                                        onChange={inputHandler} />
                                </Form.Group>
                            </div>

                            <div className="col-12">
                                <label htmlFor="formFile" className="form-label">Images of Hostel</label>
                                <input className="form-control" type="file" id="formFile" multiple
                                    accept='image/*' name='images' onChange={fileInputHandler} />
                            </div>

                        </div>

                        <div className="d-grid">
                            <Button type='submit' variant="success" onClick={submit}>
                                Submit
                            </Button>
                        </div>

                        {warning && <Alert variant="alert">
                            <Alert.Heading>{warning}</Alert.Heading>
                        </Alert>}

                    </Form>
                </div>
            </div>
        </div >
    )
}

export default AddHostel