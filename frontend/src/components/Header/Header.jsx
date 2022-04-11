import React, { useContext } from 'react';
import Container from "react-bootstrap/Container";
import "./styles.css";
// import {Row,Col} from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Form, FormControl, Button } from 'react-bootstrap';
import LoginContext from '../../context/LoginContext';

function Headers() {
    const [loginStatus] = useContext(LoginContext);

    return <div>
        <Navbar stickey="top" bg="dark" variant='dark' expand="md">
            <Container>
                <Nav>
                    <Navbar.Brand as={Link} to="/home">BookMyRoom</Navbar.Brand>
                </Nav>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home"> Home  </Nav.Link>
                        <Nav.Link as={Link} to="/link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {loginStatus.authenticated ?
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="account/myProfile">My Profile</NavDropdown.Item>
                        {/* <NavDropdown.Item as={Link} to="login/admin">Admin Login</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="login/logout"> Logout </NavDropdown.Item>
                    </NavDropdown>
                    :
                    <NavDropdown title="Login" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="login/student">Student Login</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="login/admin">Admin Login</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="register/student">Student Register    </NavDropdown.Item>
                    </NavDropdown>
                }

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    </div>
};

export default Headers;