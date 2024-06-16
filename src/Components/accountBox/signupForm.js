// SignUpForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const SignUpForm = () => {

  const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      setError("Password must contain at least one capital letter and be at least 8 characters long.");
    }
    else{
		try {
			const url = "https://final-ps-backend.vercel.app/api/loginusers";
			await axios.post(url, data);
			navigate("/Successpage");

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
      console.log(error)
		}
  }
	};


  return (
    <form onSubmit={handleSubmit} className="sign-up-form2">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input onChange={handleChange} type="text" placeholder="Name" name="name" />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input onChange={handleChange} type="email" placeholder="Email" name="email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input onChange={handleChange} type="password" placeholder="Password" name="password" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Confirm Password" name="cpassword" />
      </div>
      {error && <div className={styles.error_msg}>{error}</div>}
      <button type="submit" className="btn">Sign Up</button>
    </form>
  );
};

export default SignUpForm;