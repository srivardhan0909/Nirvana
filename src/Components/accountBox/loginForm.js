// SignInForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate} from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import MicrosoftLogin from 'react-microsoft-login';
import aJwtDecode from "./authi";
import styles from "./styles.module.css";
import './AuthForm.css';

const SignInForm = () => {

  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
  const [loginemail, setloginemail] = useState()
  const [userData, setUserData] = useState([]);
  const l = []
  const navigate = useNavigate()

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  useEffect(() =>{
    fetch("https://final-ps-backend.vercel.app/getemail", {
      method: "GET",
      crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: true,
            "Access-Control-Allow-Credentials": true,
        },
    })
    .then((res) => res.json())
    .then((data) => {
      setloginemail(data.allEmail)
    })

    fetch("https://final-ps-backend.vercel.app/getusers", {
      method: "GET",
      crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: true,
            "Access-Control-Allow-Credentials": true,
        },
    })
    .then((res) => res.json())
    .then((data) => {
      setUserData(data.allUser)
    })
  },[])

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://final-ps-backend.vercel.app/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
      const decodedToken = aJwtDecode();
      const { _id } = decodedToken;

      loginemail.filter(person => person._id === _id).map((i) => {
          localStorage.setItem("email", i.email)
          localStorage.setItem("name", i.name)
          l.unshift(i.email)
          navigate("/")
          return(i)
      })
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  const onSuccess = async (response) => {
    try {
      const exchangeResponse = await fetch('https://final-ps-backend.vercel.app/api/exchange-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: response.code,
        }),
      });

      if (exchangeResponse.ok) {
        const userData = await exchangeResponse.json();
        localStorage.setItem("name", userData.user.name != null?(userData.user.name) : userData.user.login)
        localStorage.setItem("email", userData.user.email)
        navigate("/")

      } else {
        console.error('Error exchanging code for access token:', exchangeResponse.statusText);
      }
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
    }
  };

  const onFailure = (response) => {
    console.error('GitHub login failed:', response);
  };

const handleMicrosoftLogin = async (err, data) => {
  try {
    const { accessToken } = data;

      const userResponse = await axios.get('https://final-ps-backend.vercel.app/microsoft/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const microsoftUser = userResponse.data;
      console.log('Microsoft User Details:', microsoftUser);
      localStorage.setItem("name", microsoftUser.displayName !== ""?(microsoftUser.displayName) : microsoftUser.mail)
      localStorage.setItem("email", microsoftUser.mail)
      navigate("/")
  } catch (error) {
    console.error('Microsoft Login Error:', error);
  }
};

  return (
    <form onSubmit={handleSubmit} className="sign-in-form2">
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input onChange={handleChange} name="email" type="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input onChange={handleChange} name="password" type="password" placeholder="Password" />
      </div>
      {error && <div className={styles.error_msg}>{error}</div>}
      <button type="submit" className="btn solid" >Login</button>
      <Link to="/forgot-password">Forgot Password</Link>
      {/*<p className="social-text">Or Sign in with social platforms</p>
      <GoogleOAuthProvider 
       clientId="435060184268-800es5la9dbj0atuo40grfa4vs20o7ju.apps.googleusercontent.com">
      <GoogleLogin
        type="submit"
        onSuccess={res => {
          var decode = jwtDecode(res.credential)
          localStorage.setItem("name", decode.name)
          localStorage.setItem("email", decode.email)
          navigate("/")
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      >
      </GoogleLogin>
      </GoogleOAuthProvider>
      <div className="social-media">
        <div className="social-icon">
      <FacebookLogin
        className="git"
            appId="257585390568552"
        onSuccess={(response) => {
          console.log('Login Success!', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
          localStorage.setItem("name", response.name)
          localStorage.setItem("email", response.email)
          navigate("/")
        }}
        >
          <button style={{backgroundImage:"url('https://freepngimg.com/thumb/facebook/62487-bluetie-icons-computer-facebook-login-icon-email.png')",backgroundSize:"cover", border:"none", padding:"0", borderRadius:"50%", width:"50px", height:"50px"}}></button>
        </FacebookLogin>
        </div>
        <div style={{height:"10px",marginTop:"20px"}}>
      <MicrosoftLogin
         clientId="1b35cd14-f54b-4c74-871a-429a90886ae4"
        authCallback={handleMicrosoftLogin}
        onError={(error) => console.error('Microsoft Login Failure:', error)}
      >  
      <button style={{backgroundImage:"url('https://vectorified.com/images/microsoft-icon-free-36.png')",backgroundSize:"cover", border:"none", padding:"0", borderRadius:"50%", width:"50px", height:"50px"}}></button>
      </MicrosoftLogin>
      </div>
      <div className="social-icon">
      <GitHubLogin 
        className="git"
        clientId="a9c2dea3c6f7faa3ddd5"
        redirectUri='https://final-ps.vercel.app/api/exchange-code'
        onSuccess={onSuccess}
        onFailure={onFailure}
      >
      <button style={{border:"none", padding:"0", background:"none", backgroundImage:"url('https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png')",backgroundSize:"cover", borderRadius:"50%",top:"-10px", width:"50px", height:"50px"}}></button>
      </GitHubLogin>
      
      </div>
      </div>*/}

    </form>
  );
};
//https://final-ps.vercel.app/api/exchange-code
export default SignInForm;