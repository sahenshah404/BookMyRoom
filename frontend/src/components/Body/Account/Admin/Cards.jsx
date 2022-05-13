import { React, useContext, useState, useEffect } from 'react';
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoginContext from '../../../../context/LoginContext';


function Cards() {

  const [loginStatus, setLoginStatus] = useContext(LoginContext);
  const [dashBoardData, setDashboardData] = useState({});

  useEffect(() => {
    if (loginStatus.authenticated === true && loginStatus.role === "admin") {

      fetch("/admin/dashboard").then((response) => {
        if (response.status === 404 || response.status === 503) {
          console.log("data not found");
        }
        else if (response.status !== 200 && response.status !== 403) {
          setLoginStatus({
            authenticated: false,
            role: "unknown"
          })
        }

        if (response.status === 403) {
          response.text().then((data) => {
            setLoginStatus((prev) => {
              return {
                ...prev,
                role: data
              }
            })

          })
        }

        if (response.status === 200) {
          response.json().then((data) => {
            setDashboardData(data);
          })
        }
      })
        .catch(() => {
          console.log("error fetching");
        })
    }


  }, [loginStatus, setLoginStatus])


  const count = dashBoardData.counts

  return (
    <>
      <div className='container-fluid'>
        <div className='formDesign'>
          {count ?
            <div className='row justify-content-evenly'>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Students</Card.Header>
                <Card.Body>
                  <Card.Title>Total Students:
                    <span className='cardCount'>{" " + count.studentCount}</span>
                  </Card.Title>
                  <Card.Text>
                    click below to see the list of Registered Students
                  </Card.Text>
                  <Button as={Link} to="students/list" variant="success" className="d-grid">student list</Button>
                </Card.Body>
              </Card>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Hostels</Card.Header>
                <Card.Body>
                  <Card.Title>Total Hostels:
                    <span className='cardCount'>{" " + count.hostelCount}</span>
                  </Card.Title>
                  <Card.Text>
                    click below to see the list of all the hostels
                  </Card.Text>
                  <Button as={Link} to="hostels/list" variant="success" className="d-grid">hostel list</Button>
                </Card.Body>
              </Card>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Current Allocations</Card.Header>
                <Card.Body>
                  <Card.Title>Currently Allocated:
                    <span className='cardCount'>{" " + count.allocationCount}</span>
                  </Card.Title>
                  <Card.Text>
                    click below to see students staying in hostel
                  </Card.Text>
                  <Button as={Link} to="allocated" variant="success" className="d-grid">Allocations List</Button>
                </Card.Body>
              </Card>

              <hr />

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Add Hostel</Card.Header>
                <Card.Body>
                  <Card.Title>Add a New Hostel
                  </Card.Title>
                  <Card.Text>
                    click below to see add a new hostel
                  </Card.Text>
                  <Button as={Link} to="hostels/add" variant="success" className="d-grid">Add Hostel</Button>
                </Card.Body>
              </Card>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Delete Hostel</Card.Header>
                <Card.Body>
                  <Card.Title>Delete Hostel
                  </Card.Title>
                  <Card.Text>
                    click below to delete hostel
                  </Card.Text>
                  <Button as={Link} to="hostels/remove" variant="success" className="d-grid">delete Hostel</Button>
                </Card.Body>
              </Card>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Edit Hostel</Card.Header>
                <Card.Body>
                  <Card.Title>Edit Hostel Details
                  </Card.Title>
                  <Card.Text>
                    click below to edit hostel details
                  </Card.Text>
                  <Button as={Link} to="hostels/edit" variant="success" className="d-grid">Edit Hostel</Button>
                </Card.Body>
              </Card>

              <hr />

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Faculty</Card.Header>
                <Card.Body>
                  <Card.Title>List of Faculties
                  </Card.Title>
                  <Card.Text>
                    click below to see list of All Faculties
                  </Card.Text>
                  <Button as={Link} to="faculties" variant="success" className="d-grid"> Faculties list </Button>
                </Card.Body>
              </Card>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Remove Faculty</Card.Header>
                <Card.Body>
                  <Card.Title>Remove a registered Faculty
                  </Card.Title>
                  <Card.Text>
                    click below to Remove a Faculty
                  </Card.Text>
                  <Button as={Link} to="remFaculty" variant="success" className="d-grid">Remove Faculty</Button>
                </Card.Body>
              </Card>

              <Card className='bg-dark cards col-lg-4 col-md-6 col-sm-6 col-12 mb-5'>
                <Card.Header as="h5">Edit Faculties</Card.Header>
                <Card.Body>
                  <Card.Title>Edit Faculties details
                  </Card.Title>
                  <Card.Text>
                    click below to edit Facultied details
                  </Card.Text>
                  <Button as={Link} to="editFaculty" variant="success" className="d-grid"> Edit faculty </Button>
                </Card.Body>
              </Card>


            </div>
            :
            <div>fetching data</div>
          }
        </div>
      </div>
    </>
  )
}

export default Cards