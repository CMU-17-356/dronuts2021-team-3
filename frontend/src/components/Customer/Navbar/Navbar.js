import React, { Component } from 'react';
import './Navbar.css';
import Dronut_Logo from './Dronut_Logo.png'
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie'
// component imports

const cookies = new Cookies()
var token = []
var component = []

export default class NavbarCustomer extends Component {

  openLinks() {
    var x = document.getElementById("nav-cust-items-group");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }

  render() {
    
    token = cookies.get('token')

    if(token == null)
    {
      component = <NavLink
      className="navbar-item"
      activeClassName="is-active"
      to="/login"
      exact><h3>Sign In</h3></NavLink>
    }
    else
    {
      component = <NavLink
      className="navbar-item"
      activeClassName="is-active"
      to="/signedout"
      exact><h3>Sign Out</h3></NavLink>
    }
  
  return (
    <div className="navbar-cust">
        <div id="nav-cust-left">
            <a href="/#"><img className="nav-cust-logo" src={Dronut_Logo} alt=""></img></a>
        </div>

        <div id="nav-cust-right" className="nav-cust-menu">
          <button class="icon" onClick={() => this.openLinks()}>
            <div></div>
            <div></div>
            <div></div>
          </button>
          <div id="nav-cust-items-group">
            <div className="nav-cust-items"><a href="/#"><h3>Menu</h3></a></div>
            <div className="nav-cust-items">
            <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/profile"
                  exact
              ><h3>Your Profile</h3></NavLink></div>
            <div className="nav-cust-items">
              <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/login"
                  exact
              ><h3>Sign In</h3></NavLink></div>
            <div className="nav-cust-items">
            <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/orderstatus"
                  exact
              ><h3>Your Orders</h3></NavLink></div>
            <div className="nav-cust-button">
            <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/checkout"
                  exact
              ><h3>Checkout</h3></NavLink></div>            
          </div>
        </div>
    </div>
  );
  };
};    