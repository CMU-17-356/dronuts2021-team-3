import React from 'react';
import './Navbar.css';
import Dronut_Logo from './Dronut_Logo.png'
import { NavLink } from 'react-router-dom';
// component imports

const NavbarEmployee = () => {
  return (
    <div className="navbar-emp">
        <div id="nav-emp-left">
            <h4><a href="/#"><img className="nav-emp-logo" src={Dronut_Logo} alt=""></img></a></h4>
        </div>
        <div id="nav-emp-right" className="nav-emp-menu">
            <div className="nav-emp-items">
              <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/employee/orders"
                  exact
              ><h3>Orders</h3></NavLink></div>
            <div className="nav-emp-items">
            <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/employee/drones"
                  exact
              >
              <h3>Drones</h3></NavLink></div>
            <div className="nav-emp-items">
            <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/employee/login"
                  exact
              ><h3>Sign In</h3></NavLink></div>            
        </div>
    </div>
  );
};

export default NavbarEmployee;