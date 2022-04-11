import React from 'react'

function AdminDashboard() {

  fetch("/admin/dashboard").then((response) => {
    if (response.status === 200) {
      response.text().then(data => console.log(data))
    }
  })
    .catch(() => {
      console.log("error fetching");
    })


  return (
    <div className='container-fluid'>
      <div className='formDesign col-md-6 col-sm-9 col-11 bg-dark'>
              Admin Dashboard
      </div>
    </div>
  )
}

export default AdminDashboard