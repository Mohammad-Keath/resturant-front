import React, { useState } from "react";
import base64 from 'base-64'
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]= useState(false)
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function signin() {
    try{
      const url = "http://localhost:4000/signin";
      const encodedAuth = base64.encode(`${email}:${password}`)
      const response = await axios({
        method: 'POST',
        url: url,
        headers: {
          authorization: `Basic ${encodedAuth}`,
        },
      });
      if(response.status == 200){
        return response
      }else{
        setError(true)
      }
    }
    catch(e){
      setError(true)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    setError(false)
    setLoading(true)
    const user =await signin()
    if(!user){
      setLoading(false)
      return
    }
    Cookies.set('user_info',JSON.stringify(user.data))
    Cookies.set('user_token',user.data.token)
    navigate('/');
    setLoading(false)
  };

  return (
    <div id="login-tab-content" className="tabcontent">
      <form className="login-form" action="" method="post" onSubmit={handleSubmit}>
        {error && <p className="error">Invalid credintial</p>}
        <input type="text" className="input" id="user_login" autocomplete="off" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" className="input" id="user_pass" autocomplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <input 
          type="checkbox" 
          className="checkbox" 
          id="remember_me" 
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        <label htmlFor="remember_me">Remember me</label>

        <button type="submit" className="button" >
          {!loading?'Sign in':<CircularProgress color="inherit" />}
        </button>
      </form>
      <div className="help-text">
        {/* <p>
          <a href="#">Forget your password?</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;