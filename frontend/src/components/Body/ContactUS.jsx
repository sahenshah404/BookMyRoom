import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ContactUS() {
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        issue: ""
    });

    const inputHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };


    return (
        <div className='container-fluid contactUs'>
            <div className='formDesign  col-12 bg-secondary'>
                <h2>Contact US</h2>
                <br />

                <Form >
                    <div className='row'>
                        <div className='col-md-6 col-12'>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name"
                                    value={input.userId} name="fname"
                                    onChange={inputHandler} />
                            </Form.Group>
                        </div>

                        <div className='col-md-6 col-12'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name"
                                    value={input.userId} name="lname"
                                    onChange={inputHandler} />
                            </Form.Group>
                        </div>

                        <div className='col-12'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your Email address"
                                    value={input.userId} name="email"
                                    onChange={inputHandler} />
                            </Form.Group>
                        </div>

                        <div className='col-12'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Issue</Form.Label>
                                <Form.Control type="text" placeholder="Please say... How can i Help You"
                                    value={input.userId} name="issue"
                                    onChange={inputHandler} />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="d-grid">
                        <Button variant="success">
                            Submit
                        </Button>
                    </div>


                </Form>
            </div>
        </div >
    )
}

export default ContactUS