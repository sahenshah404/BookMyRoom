import { React, useState, useEffect } from "react";
import MyHostel from "./MyHostel";
import HostelList from "./HostelList";

function Hostel() {
  const [hasHostel, setHasHostel] = useState(undefined);
  const [myHostel, setMyHostel] = useState({});

  useEffect(() => {
    fetch("/student/hostel")
      .then((response) => {
        if (response.status === 200) {
          setHasHostel(true);
          response.json().then((data) => {
            setMyHostel(data);
          });
        } else if (response.status === 204) {
          setHasHostel(false);
        } else if (response.status === 401 || response.status === 403) {
          console.log("Authorization Error");
          setHasHostel(false);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("Error Found");
      });
  }, []);

  if (hasHostel === true) {
    return <MyHostel data={myHostel} />;
  } else if (hasHostel === false) {
    return <HostelList />;
  }
  else {
    return <div>
      Fetching Data
    </div>
  }
}

export default Hostel;
