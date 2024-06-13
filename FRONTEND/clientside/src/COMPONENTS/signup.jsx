import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginPath = (e) => {
    e.preventDefault();
    navigate("/");
  }

  const handleValidation = () => {
    const stringRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!stringRegex.test(username.trim())) {
      toast.error("Invalid username. Please use letters only.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Invalid email format.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
  

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        email,
        password,
      });
     

      if (response.data.success) {
        toast.success("Signup successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/');
      } else {
        toast.error(response.data.message || "Signup failed.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log("error : ",error);
      toast.error("An error occurred during signup.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p id='account-login'>Already have an account? <span id='login-span' onClick={handleLoginPath}>Login</span></p>
      </div>
    </>
  );
}

export default Signup;

