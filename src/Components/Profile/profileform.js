import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
//import '../Css/pform.css'

const UserForm = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
      name: '',
      fname: '',
      lname: '',
      dob: '',
      email: '',
      age: '',
      gender: '',
      contact: '',
      education: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
  });

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          return;
      }
      try {
          await axios.post('https://final-ps-backend.vercel.app/api/users', userData).then((res) => {navigate('/Successpage')})
      } catch (error) {
          console.error('Error creating user:', error);
      }
  };

  return (
    <div>
      <h2 style={{paddingLeft: "10px", fontFamily: "sans-serif"}}>Registration Form</h2>
    <Form className=' d-flex flex-column gap-2' noValidate onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control placeholder="User name" type="text" name="name" onChange={handleInputChange} required/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control placeholder="First name" type="text" name="fname" onChange={handleInputChange} required/>
        </Col>
        <Col>
          <Form.Control placeholder="Last name" type="text" name="lname" onChange={handleInputChange} required />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control placeholder="Date of Birth" type="date" name="dob" onChange={handleInputChange} required />
        </Col>
        <Col>
          <Form.Control placeholder="Email" type="email" name="email" onChange={handleInputChange} required />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control placeholder="Age" type="text" name="age" onChange={handleInputChange} required />
        </Col>
        <Col>
          <Form.Select defaultValue="" aria-label="Select gender" name="gender" onChange={handleInputChange} required>
            <option>Choose...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Col>
      </Row >
      <Row>
        <Col>
          <Form.Control placeholder="Contact no" type="text" name="contact" onChange={handleInputChange} required />
        </Col>
        <Col>
          <Form.Control placeholder="Education" type="text" name="education" onChange={handleInputChange} required />
        </Col>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={4} name="adress" onChange={handleInputChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control name="city" onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>State</Form.Label>
          <Form.Control name="state" onChange={handleInputChange} required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control name="pincode" onChange={handleInputChange} required/>
        </Form.Group>
      </Row>
      <div className='subm'>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
    </div>
  );
};

export default UserForm;