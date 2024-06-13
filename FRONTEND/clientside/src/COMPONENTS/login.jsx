
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {loginUser} from '../REDUX/userLoginSlice'
import axios from 'axios';
import './login.css';

function Login() {
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSignUpPath = (e) =>{
        e.preventDefault()
        navigate("/signup")
    }

    const handleLogin = async (e) => {
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
  

        dispatch(loginUser({username,password}))
        .unwrap()
        .then(() => {
          console.log("then log");
          navigate('/userhome');
        })
        .catch((error) => {
          console.log(error);
        });
        
      } catch (error) {

        console.log("error : ",error);
        toast.error("Error occur during login", {
          duration: 1500, 
        });
        
      }




    }


  return (
    <>
    <Toaster />
    <div className="container">
      <h2>Login</h2>
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
      <p id='account-change'>Don't have an account ? <span id='signup-span' onClick={handleSignUpPath}>Signup</span></p>
    </div></>
  );
}

export default Login;
