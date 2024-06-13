import React, { useEffect, useState } from 'react';
import './adminHome.css';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();

    const handleResize = () => {
      const tblContent = document.querySelector('.tbl-content');
      const tblContentTable = document.querySelector('.tbl-content table');
      const tblHeader = document.querySelector('.tbl-header');

      if (tblContent && tblContentTable && tblHeader) {
        const scrollWidth = tblContent.offsetWidth - tblContentTable.offsetWidth;
        tblHeader.style.paddingRight = `${scrollWidth}px`;
      }
    };

    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3000/adminhome")
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  };

  const deleteUser = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
    toast((t) => (
      <span>
        Delete <b>User ???</b>
        <button onClick={() => {
          axios.post("http://localhost:3000/adminhome/deleteuser", { userid: userId })
            .then(response => {
              console.log("response.data : ", response.data);
              fetchUsers(); 
              toast.success('Successfully Deleted !');
            })
            .catch(error => {
              console.error('There was an error deleting the user!', error);
            });
        }} style={{ marginLeft: '10px', color: 'red', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          Yes
        </button>
      </span>
    ),{ autoClose: 500 });
  };

  const handleSearchData = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
        let userdata = users.filter(user => user.name === search);
        console.log("users : data : ",userdata);
    
      
      if(userdata.length === 0){
        toast.error("No user found.",{ duration: 1500 })
        
      } else{

        setUsers(userdata);
      }
    } else {
      toast.error("Enter valid search", { duration: 1500 });
    }
  };


  const editUserHandle = ( userId) => {
 
    Swal.fire({
      title: "Edit User",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Enter new username">
        <input id="swal-input2" class="swal2-input" placeholder="Enter new email">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const username = document.getElementById('swal-input1').value.trim();
        const email = document.getElementById('swal-input2').value.trim();
        if (username || email) {
           
            axios.post("http://localhost:3000/adminhome/edituser", { userid: userId, name: username, email: email })
            .then(response => {
              console.log("response : ",response.data.users);
              setUsers(response.data.users)
              
              toast.success('User updated successfully!');
            })
            .catch(error => {
              console.error('There was an error updating the user!', error);
              toast.error('Failed to update user.');
            });
        }
       
      }
    })
  };

  const handleLogout = async(e) =>{
    e.preventDefault()
    try {
      navigate("/admin")
      
    } catch (error) {
      
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <section>
      <button class="logout-button" onClick={handleLogout}>
        <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-11h-2v4h2v-4zm0 6h-2v2h2v-2z"/>
        </svg>
        
    </button>
        <div className="search-container">
          <input
            id="search-input"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search users..."
            className="search-input"
          />
          <button onClick={handleSearchData} className="search-button">Search</button>
        </div>
        <h1>USERS</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>SL NO:</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ACTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={()=>editUserHandle(user._id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminHome;


