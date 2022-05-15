import { React, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function Gallery() {

    const [gallery, setGallery] = useState({
        pages: [],
        images: []
    });
    const [page, setPage] = useState(1);

    useEffect(() => {

        fetch("/gallery").then((response) => {

            if (response.status === 503) {
                console.log("database connection problem");
            }
            else if (response.status === 200) {
                response.json().then((data) => {
                    // setGallery(data);

                    let page = [];
                    let images = [];
                    let j = 0;
                    for (let i = 0; i < data.length; i += 12) {
                        if (i + 12 > data.length) {
                            j = data.length
                        } else {
                            j = i + 12
                        }
                        images.push(data.slice(i, j));
                        page.push(page.length + 1);
                    }
                    setGallery((prev) => {
                        return ({
                            ...prev,
                            "pages": [...page],
                            "images": [...images]
                        })
                    })
                })
            }
            else {
                console.log("something went wrong");
            }
        })
            .catch()

    }, []);

    return (
        <div className='container-fluid mb-5'><br />
            <center><span className='h1'> Gallery</span></center>
            <div className='p-3 '>
                <div className='text-center'>
                    {gallery.pages.length > 0 &&
                        gallery.pages.map((page) => {
                            return (
                                <button key={page} className="btn btn-success mx-1"
                                    onClick={() => { setPage(page) }}>
                                    {page}
                                </button>
                            )
                        })
                    }
                </div>
                <div className='row'>
                    {gallery.pages.length > 0 &&
                        gallery.images[page - 1].map((image, index) => {
                            return (
                                <div key={index} className="col-lg-4 col-md-6 p-3 px-3">
                                    <Card className='picCard'>
                                        <Card.Img className='cardPic' variant="top" src={image} />
                                    </Card>
                                </div>
                            )
                        })

                    }
                </div>

            </div>
        </div>
    )
}

export default Gallery