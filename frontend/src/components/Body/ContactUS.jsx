import { React, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function ContactUS() {
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        issue: ""
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

    const submit = (e) => {
        // console.log(input);
        e.preventDefault();
        setWarning("submitting");

        if (input.fname.length < 1) {
            setWarning("Please enter your first name ");
        }
        else if (input.lname.length < 1) {
            setWarning("Please enter last name");
        }
        else if (input.email.length < 1) {
            setWarning("Please enter your email address");
        }
        else if (!input.email.match(/\w+\@\w+\.\w+/)){
            setWarning("Please enter a valid email")
        }
        else if (input.issue.length < 1) {
            setWarning("Please enter your issue");
        } else {
            fetch("/contact/issue", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            }).then((data) => {

                if (data.status === 200) {
                    setWarning(null);
                    setInput({
                        fname: "",
                        lname: "",
                        email: "",
                        issue: ""
                    });

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
        <div className='container-fluid mb5rem'>
            <div className='formDesign  col-12 bg-secondary'>
                <h2>Contact US</h2>
                <br />

                <Form >
                    <div className='row'>
                        <div className='col-md-6 col-12'>

                            <Form.Group className="mb-3" controlId="fname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name"
                                    value={input.fname} name="fname"
                                    onChange={inputHandler} />
                            </Form.Group>
                        </div>

                        <div className='col-md-6 col-12'>
                            <Form.Group className="mb-3" controlId="lname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name"
                                    value={input.lname} name="lname"
                                    onChange={inputHandler} />
                            </Form.Group>
                        </div>

                        <div className='col-12'>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your Email address"
                                    value={input.email} name="email"
                                    onChange={inputHandler} />
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
        </div >
    )
}

export default ContactUS