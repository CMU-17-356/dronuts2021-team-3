import React from 'react';
import './Login.css';
import Dronut_Logo from './Dronut_Logo.png'
import { NavLink } from 'react-router-dom';
// component imports

const Login = () => {
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
                <div className="login-header"><h2>Login</h2></div>
                <div className="login-username"><input type="text" placeholder="Enter Username"></input></div>
                <div className="login-password"><input type="password" id="pass" name="password"
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
                    <div className="login-button"><a href="/#"><h3>Sign In</h3></a></div></div>
                    <div></div>
           </div>
           <div></div>
        </div>
    </div>
  );
};

export default Login;