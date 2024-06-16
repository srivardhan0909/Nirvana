import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`https://final-ps-backend.vercel.app/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="btn w-100 rounded-1">
            Update
          </Button>
        </Form>
        
      </div>
    </div>
    )
}

export default ResetPassword;
