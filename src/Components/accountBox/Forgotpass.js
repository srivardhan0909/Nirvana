import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = false;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://final-ps-backend.vercel.app/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success")
            {
                navigate('/login')    
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="btn w-100 rounded-0">
            Send
          </Button>
        </Form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;