import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Footer() {
    return <div>

        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home">BookMyRoom</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className='nav-link' >
                        <a href="http://github.com/sahenshah404" target="_blank" rel="noopener noreferrer">
                            Dev : Sahil Kumar
                        </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    </div>
};

export default Footer;