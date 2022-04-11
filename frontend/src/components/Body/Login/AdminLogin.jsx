import { React, useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import LoginContext from '../../../context/LoginContext';



function AdminLogin() {
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

    const login = (e) => {
        // console.log(input);
        e.preventDefault();


        fetch("/login/admin", {
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
                        navigate("/adminDashboard");

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

    if (loginStatus.authenticated === true && loginStatus.role === "admin") {
        return (
            <div className='container-fluid'>
                <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>

                    <Alert variant="success">
                        <Alert.Heading><h3>You Are Already Logged in as Admin</h3></Alert.Heading>
                        <Alert.Heading><h3> Click to go to
                            <Link to="/adminDashboard">
                                <button className='btn btn-success '>Admin Dashboard</button>
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

                    {warning && <Alert variant="danger">
                        <Alert.Heading>{warning}</Alert.Heading>
                    </Alert>}

                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter UserId"
                                value={input.userId} name="userId"
                                onChange={inputHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                value={input.password} name="password"
                                onChange={inputHandler} />
                        </Form.Group>

                        <Button variant="primary" type="submit"
                            onClick={login} >
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}

export default AdminLogin