// ProfilePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../Css/profilepage.css'; // Import your CSS file

const ProfilePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [lemail, setLemail] = useState(localStorage.getItem('email'));
  const [name, setName] = useState(localStorage.getItem('name'));

  useEffect(() => {
    setLemail(localStorage.getItem('email'));
    setName(localStorage.getItem('name'));
  }, []);

  const loginEmail = lemail;

  const handleUpdate = () => {
    navigate('/profileform');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://final-ps-backend.vercel.app/user-details/${loginEmail}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    if (loginEmail) {
      fetchUserDetails();
    }
  }, [loginEmail]);

  return (
    <div className="profile-container">
      {data ? (
        <div className="user-details align-items-lg-start ">
          <h2>User Details</h2>
          <p className=' align-content-md-start'>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Date of Birth: {data.dob}</p>
          <p>Age: {data.age}</p>
          <p>Gender: {data.gender}</p>
          <p>Contact: {data.contact}</p>
          <p>Education: {data.education}</p>
          <p>Adress: {data.adress}</p>
          <p>Pincode: {data.pincode}</p>
          <Button onClick={() => navigate('/updateUser', { state: data })}>Edit</Button>
        </div>
      ) : (
        <div className="login-prompt">
          {name && lemail ? (
            <>
              <p>Update your profile</p>
              <p>Name: {name}</p>
              <p>Email: {lemail}</p>
              <button onClick={handleUpdate}>Update</button>
            </>
          ) : (
            <div>Login</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
