import React from 'react';
import { Carousel } from "react-bootstrap";

import "./styles.css"
import pic1 from "./1.JPG";
import pic2 from "./2.JPG";
import pic3 from "./3.JPG";
import AboutUs from '../AboutUs';
import ContactUS from '../ContactUS';

function Homepage() {
    return <>
        <div className='hostelPics'>
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        src={pic1}
                        alt="First pic"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={pic2}
                        alt="Second pic"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src={pic3}
                        alt="Third pic"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
        <AboutUs/>
        <ContactUS/>
    </>
};

export default Homepage;