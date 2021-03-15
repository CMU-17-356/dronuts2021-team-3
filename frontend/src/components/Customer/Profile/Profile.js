import React, { useState, useEffect} from 'react';
import './Profile.css';
import Dronut_Logo from './Dronut_Logo.png'
// component imports

const Registration = () => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
        fetch('https://40.83.140.149/getuser')
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUser(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    if (error) {
        return <div className="menu-header">Error: {error.message}</div>;
      } 
    else if (!isLoaded) {
    return <div className="menu-header">Loading...</div>;
    }
    else
    {
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
                        <div className="profile-firstname">First Name: {user.first_name}<button type="submit" id="fname-edit">Edit</button></div>
                        <div className="profile-lastname">Last Name: {user.last_name}<button type="submit" id="lname-edit">Edit</button></div>
                        <div className="profile-address">Address: 5000, Forbes Ave, Pittsburgh, PA 15213<button type="submit" id="address-edit">Edit</button></div>
                        <div className="profile-contact">Contact Number: {user.contact_number}<button type="submit" id="contact-edit">Edit</button></div>
                        <div className="profile-email">Email: {user.email}<button type="submit" id="email-edit">Edit</button></div>
                        <div className="profile-username">Username: {user.username}</div>
                        <div className="change-password"><button type="submit" id="email-edit">Change Password</button></div>
                    </div>
                <div></div>
                </div>
            </div>
        );
    }
};

export default Registration;