import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../../context/LoginContext';

function Logout() {

    const [,setLoginStatus] = useContext(LoginContext);

    let navigate = useNavigate();

    fetch("/login/logout").then(resp => {
        resp.json().then((data)=>{
            setLoginStatus(data);
            navigate("/home");
        })
    })
    return (
        <div>Logout</div>
    )
}

export default Logout