import React, { useState, useEffect, Component} from 'react';
import './Profile.css';
import Dronut_Logo from './Dronut_Logo.png'
import Cookies from 'universal-cookie'
import axios from 'axios'
// component imports

const cookies = new Cookies()

export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
          user: []
        };
      }
  
    componentDidMount = () => {
        axios.post("http://localhost:9000/user/getuser", {
            token: cookies.get('token')
        })
        .then(response => {
            this.setState({
            user: response.data.user
            });
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
    };

    render() {
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
                        <div className="profile-firstname">First Name: {this.state.user.first_name}<button type="submit" id="fname-edit">Edit</button></div>
                        <div className="profile-lastname">Last Name: {this.state.user.last_name}<button type="submit" id="lname-edit">Edit</button></div>
                        <div className="profile-address">Address: 5000, Forbes Ave, Pittsburgh, PA 15213<button type="submit" id="address-edit">Edit</button></div>
                        <div className="profile-contact">Contact Number: {this.state.user.contact_number}<button type="submit" id="contact-edit">Edit</button></div>
                        <div className="profile-email">Email: {this.state.user.email}<button type="submit" id="email-edit">Edit</button></div>
                        <div className="profile-username">Username: {this.state.user.username}</div>
                        <div className="change-password"><button type="submit" id="email-edit">Change Password</button></div>                        
                    </div>
                <div></div>
                </div>
            </div>
        );
    };
}