import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function HostelEditDetails() {
    let params = useParams();
    const id = params.id;

    const [input, setInput] = useState({
        name: "",
        total_room: 0,
        room_capacity: 0,
        gender: "M",
        warden: "",
        contact_no: ""

    });
    const [imageData, setImageData] = useState([]);
    const [images, setImages] = useState([]);


    const [warning, setWarning] = useState(null);

    useEffect(() => {

        fetch("/admin/dashboard/hostel/" + id).then((response) => {

            if (response.status === 503 || response.status === 404) {
                console.log("database connection problem");
            }
            else if (response.status === 401) {
                console.log("wrong Credentials");
            }
            else if (response.status === 403) {
                response.text().then((data) => {
                    console.log("you are logged in as " + data);
                })
            }
            else if (response.status === 200) {
                response.json().then((data) => {
                    setInput((prev) => {
                        // return {
                        //     ...prev,
                        //     ...data
                        // }
                        return {
                            name: data.name,
                            total_room: data.total_room,
                            room_capacity: data.room_capacity,
                            gender: data.gender,
                            warden: data.warden,
                            contact_no: data.contact_no
                        }
                    });
                    setImageData((prev) => {
                        return [...data.images]
                    })
                })
            }
        })
            .catch((err) => {
                console.log("error found");
            })
    }, [id, images.length,imageData.length]);



    const inputHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const fileInputHandler = (e) => {
        setImages((prev) => {
            return [...e.target.files]

        })
    }


    const addImages = (e) => {
        e.preventDefault();
        setWarning("submitting");

        const data = new FormData();
        for (let i = 0; i < images.length; i++) {
            data.append("images", images[i]);
        }

        fetch("/admin/dashboard/hostel/edit/image/add/" + id, {
            method: "POST",
            body: data
        }).then((resp) => {
            if (resp.status === 200) {
                setWarning(null);
                setImages([]);
            }
        }).catch()
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
            // const data = new FormData();
            // data.append("name", input.name);
            // data.append("total_room", input.total_room);
            // data.append("room_capacity", input.room_capacity);
            // data.append("gender", input.gender);
            // data.append("warden", input.warden);
            // data.append("contact_no", input.contact_no);
            // for (let i = 0; i < input.images.length; i++) {
            //     data.append("images", input.images[i]);

            // }

            fetch("/admin/dashboard/hostel/edit/" + id, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            }).then((response) => {
                if (response.status === 200) {
                    setWarning(null);
                } else {
                    setWarning("not submitted");

                }
            })
                .catch((err) => {
                    alert("Server Connection Problem");
                })
        }
    }

    const removeImages = (path) => {
        const data = {
            hostelId: id,
            imagePath: path
        };
        fetch("/admin/dashboard/hostel/edit/image/remove", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
                setImageData([]);

        }).catch((err) => {
            console.log("error while fetching data");
        })
    }


    return (
        <div className='container-fluid mb5rem '>
            <div className='formDesign p-4 pb-0'>
                <div className='p-5 col-12 bg-secondary'>
                    <h2>Edit Hostel Details</h2>
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


                        </div>

                        <div className="d-grid">
                            <Button type='submit' variant="success" onClick={submit}>
                                Update
                            </Button>
                        </div>

                        {warning && <Alert variant="alert">
                            <Alert.Heading>{warning}</Alert.Heading>
                        </Alert>}

                    </Form>
                </div>
            </div>
            <div className='formDesign p-4 pt-0'>
                <div className='p-5 col-12 bg-secondary'>
                    <Form className='row h5'>

                        <h2>Add Hostel Images</h2>
                        <br />
                        <div className="col-12 mb-3">
                            <label htmlFor="formFile" className="form-label">Add Images of Hostel</label>
                            <input className="form-control" type="file" id="formFile" multiple
                                accept='image/*' name='images' onChange={fileInputHandler} />
                        </div>

                        {images.length > 0 && images.map((image, index) => {
                            return <div key={index} className="col-lg-4 col-md-6 p-3 px-3">
                                <Card className='picCard'>
                                    <Card.Img className='cardPic' variant="top" src={URL.createObjectURL(image)} />
                                </Card>
                            </div>
                        })}

                        <div className="d-grid">
                            <Button type='submit' variant="success" onClick={addImages}>
                                Add Images
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
            <div className='text-white p-4 pt-0'>
                <div className='px-3 col-12 bg-secondary'>
                    <span className='h1'>Remove Images</span>
                    {/* <div className='text-white p-3 '> */}
                    <div className='row'>
                        {imageData &&
                            imageData.map((image, index) => {
                                return (
                                    <div key={index} className="col-lg-4 col-md-6 p-3 px-3">
                                        <Card className='picCard'>
                                            <Card.Img className='cardPic' variant="top" src={image} />
                                        </Card>
                                        <div className="d-grid">
                                            <Button type='submit' variant="danger" onClick={() => { removeImages(image) }}>
                                                Remove This Image
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </div>

        </div >
    )
}

export default HostelEditDetails