import React from "react";

import Signup from "../components/signup";
import Login from "../components/signin";

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab content and add the "active" class to the clicked tab link
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function Auth() {
  return (
    <div className="authPage">
      <h1>Welcome to Our Restaurant</h1>
      <div className="form-wrap">
        <div class="tabs">
          <h3 class="signup-tab">
            <a class="tablink active" onClick={(e) => openTab(e, "signup-tab-content")}>
              Sign Up
            </a>
          </h3>
          <h3 class="login-tab">
            <a class="tablink" onClick={(e) => openTab(e, "login-tab-content")}>
              Login
            </a>
          </h3>
        </div>

        <div class="tabs-content">
          <Signup />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Auth;