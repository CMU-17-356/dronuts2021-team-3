import React from 'react';
import './Registration.css';
import Dronut_Logo from './Dronut_Logo.png'
// component imports

const Registration = () => {
  return (
    <div className="register">
        <div className="register-left">
            <div></div>
            <div>
                <h2> Looking for a donut delivered by a drone?</h2>
                <img className="register-logo" src={Dronut_Logo} alt=""></img>
                <h2> is here for you! </h2>
            </div>
            <div></div>
        </div>
        <div id="register-right" className="register-form">
            <div></div>
            <div>
                <div className="register-header"><h2>Create Account</h2></div>
                <div className="register-firstname"><input type="text" placeholder="Enter First Name"></input></div>
                <div className="register-lastname"><input type="text" placeholder="Enter Last Name"></input></div>
                <div className="register-address"><input type="text" placeholder="Enter Address"></input></div>
                <div className="register-contact"><input type="text" placeholder="Enter Contact Number"></input></div>
                <div className="register-email"><input type="text" placeholder="Enter Email"></input></div>
                <div className="register-username"><input type="text" placeholder="Choose Username"></input></div>
                <div className="register-password"><input type="password" id="pass" name="password"
            minlength="8" required placeholder="Choose Password"></input></div>
                <div className="register-container">
                    <div></div>
                    <div className="register-button"><a href="/#"><h3>Register</h3></a></div></div>
                    <div></div>
           </div>
           <div></div>
        </div>
    </div>
  );
};

export default Registration;