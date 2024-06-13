
import React ,{useEffect, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { loginAdmin } from '../REDUX/adminLoginSlice';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

function AdminLogin() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch();
   

    const handleLogin = async (e) =>{
        e.preventDefault(); 
        try {
            if(username.trim() === ""){
                toast.error("Enter valid username", {
                  duration: 1500, 
                });
                return
              }
        
              if(password.trim() === ""){
                toast.error("Enter valid password", {
                  duration: 1500, 
                });
                return
        
              }

              dispatch(loginAdmin({username,password}))
              .unwrap()
              .then(() => {
                console.log("then admin log");
                navigate('/adminhome');
              })
              .catch((error) => {
                console.log(error);
              });


        } catch (error) {
            console.log("handleLogin function error:", error);
            toast.error("An error occurred during signup. Please try again.", {
                duration: 1500
            });
        }
        
    }
  return (
    <>
   <Toaster/>
    <div className="container">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      
    </div></>
  )
}

export default AdminLogin
