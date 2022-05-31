import { React, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

function HostelList() {
  const [hostelList, setHostelList] = useState([]);

  useEffect(() => {
    fetch("/student/hostel/book/list").then((response) => {
      if (response.status === 401) {
        console.log("Wrong Crdentials");
      } else if (response.status === 403) {
        console.log("Unaauthoried Request");
      } else if (response.status === 200) {
        response.json().then((data) => {
          setHostelList(data);
        })
      } else {
        console.log("Something Went Wrong");
      }
    }).catch();
  }, [])
  return (
    <div className='container-fluid'>
      <div className='text-white p-5 '>
        <span className="h1">Book Your Hostel</span>
        <div className='row'>
          {hostelList ?
            hostelList.map((hostel, index) => {
              return (
                <div key={index} className="col-lg-4 col-md-6 p-3 px-3">
                  <Card className='picCard'>
                    <Card.Img className='cardPic' variant="top" src={hostel.images[0]} />
                    <Card.Body className='bg-dark'>
                      <Card.Title >{hostel.name}</Card.Title>
                      <Card.Text>
                        Remaining Accomodation : {hostel.count}
                      </Card.Text>
                      <Button as={Link} to={hostel.id} variant="success">View Hostel Details</Button>
                    </Card.Body>
                  </Card>
                </div>
              )
            })
            :
            <div>Fetching data</div>
          }
        </div>

      </div>
    </div>
  );
}

export default HostelList;
