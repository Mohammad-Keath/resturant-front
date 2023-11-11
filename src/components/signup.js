import React, { useState } from "react";
import { axiosHandler } from "../handlers/axiosHandler";
import CircularProgress from '@mui/material/CircularProgress';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading,setLoading]= useState(false)
  const [error, setError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setError(false)
    setLoading(true)
    try{
      const response =await axiosHandler("POST",'/signup',{username,email,password})
      if(response.status == 200){
        setLoading(false)
      }else{
        setLoading(false)
        setError(true)
      }
    }
    catch(e){
      setLoading(false)
      setError(true)
    }

  };

  return (
    <div id="signup-tab-content" class="tabcontent" style={{ display: "block" }}>
      <form class="signup-form" action="" method="post" onSubmit={handleSubmit} >
        {error && <p className="error">This email exists, sign in</p>}
        <input className="input" autocomplete="off" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="email" className="input" id="user_email" autocomplete="off" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="password" className="input" id="user_password" autocomplete="off" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        {/* <input type="password" class="input" id="user_pass_confirm" autocomplete="off" placeholder="Confirm Password" value={passwordConfirm} onChange={handlePasswordConfirmChange} /> */}
        <button type="submit" className="button" >
          {!loading?'Sign up':<CircularProgress color="inherit" />}
        </button>
      </form>
      <div class="help-text">
        <p>By signing up, you agree to our</p>
        <p>
          {/* <a href="#"> */}
            Terms of service
            {/* </a> */}
        </p>
      </div>
    </div>
  );
}

export default Signup;