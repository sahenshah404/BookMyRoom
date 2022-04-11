import React from 'react';
import { Carousel } from "react-bootstrap";
import "./styles.css"
import Gate from "./gate.jpg";
import Mdc from "./madamcurie.jpg";
import Valmiki from "./valmiki.jpg";

function Hostels() {
    return <div className='hostelPics'>
        <Carousel variant="dark">
            <Carousel.Item>
                <img
                    src={Gate}
                    alt="First pic"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={Mdc}
                    alt="Second pic"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={Valmiki}
                    alt="Third pic"
                />
            </Carousel.Item>
        </Carousel>
    </div>
};

export default Hostels;