import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HaveToken({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/userhome");
    }
  }, [token, navigate]);

  if (token) {
   
    return null;
  } else {
    return children;
  }
}

export default HaveToken;

