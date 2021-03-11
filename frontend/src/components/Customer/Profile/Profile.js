import React from 'react';
import './Profile.css';
import Dronut_Logo from './Dronut_Logo.png'
// component imports

const Registration = () => {
  return (
    <div className="profile">
        <div className="profile-left">
            <div></div>
            <div>
                <h2> Looking for a donut delivered by a drone?</h2>
                <img className="profile-logo" src={Dronut_Logo} alt=""></img>
                <h2> is here for you! </h2>
            </div>
            <div></div>
        </div>
        <div id="profile-right" className="profile-form">
            <div></div>
            <div>
                <div className="profile-header"><h2>Your Profile</h2></div>
                <div className="profile-firstname">First Name: John<button type="submit" id="fname-edit">Edit</button></div>
                <div className="profile-lastname">Last Name: Doe<button type="submit" id="lname-edit">Edit</button></div>
                <div className="profile-address">Address: 5000, Forbes Ave, Pittsburgh, PA 15213<button type="submit" id="address-edit">Edit</button></div>
                <div className="profile-contact">Contact Number: 754-676-8779<button type="submit" id="contact-edit">Edit</button></div>
                <div className="profile-email">Email: abc@gmail.com<button type="submit" id="email-edit">Edit</button></div>
                <div className="profile-username">Username: jdoe123</div>
                <div className="change-password"><button type="submit" id="email-edit">Change Password</button></div>
            </div>
           <div></div>
        </div>
    </div>
  );
};

export default Registration;