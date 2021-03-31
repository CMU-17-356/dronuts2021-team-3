import React from 'react';
import './Navbar.css';
import Dronut_Logo from './Dronut_Logo.png'
import { NavLink } from 'react-router-dom';
// component imports

const NavbarEmployee = () => {
  function openLinks() {
    var x = document.getElementById("nav-cust-items-group");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }

  return (
    <div className="navbar-emp">
      <div id="nav-emp-left">
          <a href="/#"><img className="nav-emp-logo" src={Dronut_Logo} alt=""></img></a>
      </div>
      <div id="nav-emp-right" className="nav-emp-menu">
        <button class="icon" onClick={() => openLinks()}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div id="nav-cust-items-group">
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
    </div>
  );
};

export default NavbarEmployee;