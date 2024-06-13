import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './userCard.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function UserCard() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  const userDetails = userData?.user?.user || {};
  const username = userDetails?.name;

  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const initialImageUrl = localStorage.getItem("imageurl") || userData?.user?.image || '';

  const [imageExists, setImageExists] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userImage, setUserImage] = useState(initialImageUrl);
  const [showUploadInput, setShowUploadInput] = useState(false);

  useEffect(() => {
    if (userImage) {
      const img = new Image();
      img.onload = () => setImageExists(true);
      img.onerror = () => setImageExists(false);
      img.src = `http://localhost:3000/${userImage}`;
    } else {
      setImageExists(false);
    }
  }, [userImage]);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('username', userDetails?.name || storedUser.name);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:3000/userhome", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.data.success) {
        const newImageUrl = response.data.filePath;
        setUserImage(newImageUrl);
        localStorage.setItem("imageurl", newImageUrl);
        setImageExists(true);
        setShowUploadInput(false);
        toast.success("Image uploaded successfully!", {
          duration: 1500
        });
      } else {
        toast.error(response.data.message || "Image upload failed.", {
          duration: 1500
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.", {
        duration: 1500
      });
    }
  };

  const handleLogout = async (e) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("imageurl");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <div className='all-div'>
        <button className="logout-button-user" onClick={handleLogout}>
          <svg className="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11h-2v4h2v-4zm0 6h-2v2h2v-2z"/>
          </svg>
        </button>

        <Toaster />

        <div className="user-card">
          <div className="user-image">
            {imageExists ? (
              <>
          <img id='img' style={{ width: '280px', height: '280px' }} src={`http://localhost:3000/${userImage}`} alt="User" />


                <button 
                  className="change-photo-button" 
                  onClick={() => setShowUploadInput(!showUploadInput)}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </>
            ) : (
              <>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <button onClick={handleImageUpload}>Add Image</button>
              </>
            )}
          </div>
          {showUploadInput && (
            <div className="upload-input">
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
              <button onClick={handleImageUpload}>Upload New Image</button>
            </div>
          )}
          <div className="user-info">
            <h2 className="user-name">{userDetails.name || storedUser.name}</h2>
            <p className="user-email">{userDetails.email || storedUser.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;



