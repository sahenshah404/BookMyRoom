
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';


const LoginContext = createContext();

function LoginProvider(props) {
    const [loginStatus,setLoginStatus] = useState({
        authenticated : false,
        role : "unknown"
    });

    useEffect(()=>{
        (async()=>{
            const response = await fetch("/login/check");
            const data = await response.json();
            setLoginStatus(data);
        })()
    },[])

    return (
        <LoginContext.Provider value={[loginStatus,setLoginStatus]}>
            {props.children}
        </LoginContext.Provider>
    )
}


export {LoginProvider};
export default LoginContext;