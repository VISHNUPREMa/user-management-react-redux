import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function IsUser({children}) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    useEffect(()=>{
        if(!token){
            navigate("/")

        }

    },[])

    if(token){
        return children
    }

}

export default IsUser
