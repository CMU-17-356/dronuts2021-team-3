import React from 'react';
import './Navbar.css';
import Dronut_Logo from './Dronut_Logo.png'
import { NavLink } from 'react-router-dom';
// component imports

const NavbarCustomer = () => {
  return (
    <div className="navbar-cust">
        <div id="nav-cust-left">
            <h4><a href="/#"><img className="nav-cust-logo" src={Dronut_Logo} alt=""></img></a></h4>
        </div>
        <div id="nav-cust-right" className="nav-cust-menu">
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
                  to="/orderstatus"
                  exact
              ><h3>Order Status</h3></NavLink></div>
            <div className="nav-cust-items">
              <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/login"
                  exact
              ><h3>Sign In</h3></NavLink></div>
            <div className="nav-cust-button">
            <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/checkout"
                  exact
              ><h3>Checkout</h3></NavLink></div>            
        </div>
    </div>
  );
};

export default NavbarCustomer;