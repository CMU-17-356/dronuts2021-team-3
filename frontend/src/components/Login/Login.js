import React, { Component } from 'react';
import './Login.css';
import Dronut_Logo from './Dronut_Logo.png'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'


// component imports
const cookies = new Cookies()
export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      user_type: 'customer',
      logged_in: false,
      timed_out: [],
      redirect: false
    };
  }

  handleChangeUsername = event => {
    this.setState({username: event.target.value});
  }

  handleChangePassword = event => {
    this.setState({password: event.target.value});
  }

  handleButtonClick = event => {
    event.preventDefault();
    axios.post("http://localhost:9000/auth/login", {
        username: this.state.username,
        password: this.state.password,
    }).then(response => 
    {
      cookies.set('token',response.data.token,{ path: "/" })
      this.setState({logged_in: true});
      this.timed_out = setTimeout(() => this.setState({ redirect: true }), 3000)
      this.render()
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  render() {
    if (this.state.logged_in && this.state.user_type === "customer") {
      return this.state.redirect
        ? <Redirect to="/" />
        : <div>
        <div className="login-head"><h2>Logged in! <br/> Redirecting in a few seconds... </h2></div>
        </div> 
    }
    else if (this.state.logged_in && this.state.user_type === "employee") {
      return this.state.redirect
        ? <Redirect to="/employee/orders" />
        : <div>
        <div className="login-head"><h2>Logged in! <br/> Redirecting in a few seconds... </h2></div>
        </div> 
    }
    return (
      <div className="login">
      <div className="login-left">
          <div></div>
          <div>
              <h2> Looking for a donut delivered by a drone?</h2>
              <img className="login-logo" src={Dronut_Logo} alt=""></img>
              <h2> is here for you! </h2>
          </div>
          <div></div>
      </div>
      <div id="login-right" className="login-form">
          <div></div>
          <div>
          <form onSubmit={this.handleButtonClick}>
              <div className="login-header"><h2>Login</h2></div>
              <div className="login-username"><input type="text" onChange={this.handleChangeUsername} placeholder="Enter Username"></input></div>
              <div className="login-password"><input type="password" onChange={this.handleChangePassword} id="pass" name="password"
          minlength="8" required placeholder="Enter Password"></input></div>
              <div className="create-account">
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/register"
                exact
            ><p>Haven't made an account? Sign up here</p></NavLink></div>
              <div className="button-container">
                  <div></div>
                  <button className="login-button" type="submit" >Sign In</button>
                  </div>
                  <div></div>
                  </form>
         </div>
         <div></div>
      </div>
  </div>


    );
  }

}