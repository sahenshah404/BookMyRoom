import { React, useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import LoginContext from '../../../context/LoginContext';




function StudentRegistration() {
    let navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useContext(LoginContext);

    const [input, setInput] = useState({
        userId: "",
        password: ""
    });

    const [warning, setWarning] = useState(null);

    // console.log(loginStatus);

    const inputHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const register = (e) => {
        // console.log(input);
        e.preventDefault();


        fetch("/register/student", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
        }).then((data) => {

            if (data.status === 200) {
                data.json().then((resp) => {
                    if (resp.authenticated === true) {
                        setLoginStatus(resp);
                        navigate("/");

                    } else {
                        alert("something went wrong");
                    }
                })

            } else if (data.status === 401 || data.status === 503) {
                data.text().then((text) => {
                    setWarning(text);
                })
            }
        })
            .catch((err) => {
                alert("Server Connection Problem");
            })
    }

    if (loginStatus.authenticated === true) {
        return (
            <div className='container-fluid'>
                <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>

                    <Alert variant="success">
                        <Alert.Heading><h3>You Are Already Logged in</h3></Alert.Heading>
                        <Alert.Heading><h3> Click here to 
                            <Link to="/login/logout">
                                <button className='btn btn-outline-danger '> Logout </button>
                            </Link>
                        </h3></Alert.Heading>
                    </Alert>
                </div>
            </div>
        )
    } else {
        return (
            <div className='container-fluid'>
                <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
                    <h2>Login With SAMS</h2>
                    <br/>

                    {warning && <Alert variant="danger">
                        <Alert.Heading>{warning}</Alert.Heading>
                    </Alert>}

                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter SAMS User ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter UserId"
                                value={input.userId} name="userId"
                                onChange={inputHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter SAMS Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                value={input.password} name="password"
                                onChange={inputHandler} />
                        </Form.Group>

                        <Button variant="primary" type="submit"
                            onClick={register} >
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}

export default StudentRegistration;