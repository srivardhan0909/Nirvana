import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function UpdateUser() {

    const navigate = useNavigate()
    const location = useLocation()

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [dob, setdob] = useState("")
    const [age, setage] = useState("")
    const [gender, setgender] = useState("")
    const [adress, setadress] = useState("")
    const [contact, setcontact] = useState("")
    const [education, seteducation] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [pincode, setpincode] = useState("")

    useEffect(() => {
        setfname(location.state.fname)
        setlname(location.state.lname)
        setemail(location.state.email)
        setdob(location.state.dob)
        setage(location.state.age)
        setgender(location.state.gender)
        setadress(location.state.adress)
        setcontact(location.state.contact)
        seteducation(location.state.education)
        setcity(location.state.city)
        setstate(location.state.state)
        setpincode(location.state.pincode)
    },[location.state.fname, location.state.lname, location.state.dob, location.state.email, location.state.age, location.state.gender, location.state.adress, location.state.contact, location.state.education, location.state.city, location.state.state, location.state.pincode])

    function updatedata() {
        console.log(fname, lname)
        fetch("https://final-ps-backend.vercel.app/updateUser", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            id: location.state._id,
            fname: fname,
            lname: lname,
            email: email,
            dob: dob,
            age: age,
            gender: gender,
            adress: adress,
            contact: contact,
            education: education,
            city: city,
            state: state,
            pincode: pincode
        })
        })
        .then((res) => res.json())
        navigate("/profile")
    
    }

    return(
        <div>
            <Form className='d-flex mx-2 flex-column gap-2'>
      <Row className='d-flex'>
        <Col>
          <Form.Control onChange={(e) => setfname(e.target.value)} defaultValue={fname} placeholder="First name" type="text" name="fname" required/>
        </Col>
        <Col>
          <Form.Control onChange={(e) => setlname(e.target.value)} defaultValue={lname} placeholder="Last name" type="text" name="lname" required />
        </Col>
      </Row>
      <Row className='fields'>
        <Col>
          <Form.Control onChange={(e) => setdob(e.target.value)} defaultValue={dob} placeholder="Date of Birth" type="date" name="dob" required />
        </Col>
        <Col>
          <Form.Control onChange={(e) => setemail(e.target.value)} defaultValue={email} disabled placeholder="Email" type="email" name="email" required />
        </Col>
      </Row>
      <Row className='fields'>
        <Col>
          <Form.Control onChange={(e) => setage(e.target.value)} defaultValue={age} placeholder="Age" type="text" name="age" required />
        </Col>
        <Col>
          <Form.Select onChange={(e) => setgender(e.target.value)} defaultValue={gender} aria-label="Select gender" name="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Col>
      </Row >
      <Row className='fields'>
        <Col>
          <Form.Control onChange={(e) => setcontact(e.target.value)} defaultValue={contact} placeholder="Contact no" type="text" name="contact" required />
        </Col>
        <Col>
          <Form.Control onChange={(e) => seteducation(e.target.value)} defaultValue={education} placeholder="Education" type="text" name="education" required />
        </Col>
      </Row>
      <Row className='fields'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
          <Form.Label>Address</Form.Label>
          <Form.Control onChange={(e) => setadress(e.target.value)} defaultValue={adress} as="textarea" rows={4} name="adress" required/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control onChange={(e) => setcity(e.target.value)} defaultValue={city} name="city" required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>State</Form.Label>
          <Form.Control onChange={(e) => setstate(e.target.value)} defaultValue={state} name="state" required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Pin Code</Form.Label>
          <Form.Control onChange={(e) => setpincode(e.target.value)} defaultValue={pincode} name="pincode" required/>
        </Form.Group>
      </Row>
        <Button onClick={updatedata} type="submit">Submit</Button>
    </Form>
        </div>
    )
}

export default UpdateUser
