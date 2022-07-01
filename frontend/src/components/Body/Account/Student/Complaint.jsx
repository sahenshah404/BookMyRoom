import { React, useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function Complaint() {
    const [input, setInput] = useState({
        name: "",
        reg_num: "",
        email: "",
        issue: ""
    });

    // const [studentDetails, setStudentDetails] = useState({});


    const [warning, setWarning] = useState(null);


    useEffect(() => {
        fetch("/student/profile").then((response) => {
            if (response.status === 404 | response.status === 503) {
                console.log("data not found");
            }
            if (response.status === 200) {
                response.json().then((data) => {
                    setInput((prev) => {
                        return {
                            ...prev,
                            name: data.name,
                            reg_num: data.reg_num,
                            email: data.pumail
                        }
                    })
                })
            }
        }).catch()
    }, [])

    const inputHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const submit = (e) => {
        // console.log(input);
        e.preventDefault();
        setWarning("submitting");

        if (input.issue.length < 1) {
            setWarning("Please enter your issue");
        } else {
            fetch("/contact/complaint", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            }).then((data) => {

                if (data.status === 200) {
                    setWarning(null);
                    setInput((prev) => {
                        return {
                            ...prev,
                            issue: ""
                        }
                    })

                } else {
                    setWarning("not submitted");
                }
            })
                .catch((err) => {
                    alert("Server Connection Problem");
                })
        }
    }



    return (
        <div className=' mb-5'>
            <div className='container-fluid p-2 pt-5 mb-5 '>
                <div className='text-white  bg-dark p-4'>
                    <Form >
                        <div className='row'>
                            <div className='col-md-6 col-12'>

                                <Form.Group className="mb-3" controlId="fname">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your first name"
                                        value={input.name} name="name"
                                        onChange={inputHandler} disabled />
                                </Form.Group>
                            </div>

                            <div className='col-md-6 col-12'>
                                <Form.Group className="mb-3" controlId="lname">
                                    <Form.Label>Reg Num</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your last name"
                                        value={input.reg_num} name="reg_num"
                                        onChange={inputHandler} disabled />
                                </Form.Group>
                            </div>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your Email address"
                                        value={input.email} name="email"
                                        onChange={inputHandler} disabled />
                                </Form.Group>
                            </div>

                            <div className='col-12'>
                                <Form.Group className="mb-3" controlId="issue">
                                    <Form.Label>Issue</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Please say... How can i Help You"
                                        value={input.issue} name="issue"
                                        onChange={inputHandler} />
                                </Form.Group>
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
        </div>
    )
}

export default Complaint