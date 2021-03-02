import React from 'react';
import './Navbar.css';
import Dronut_Logo from './Dronut_Logo.png'
// component imports

const NavbarCustomer = () => {
  return (
    <div className="navbar-cust">
        <div id="nav-cust-left">
            <h4><a href="/#"><img className="nav-cust-logo" src={Dronut_Logo} alt=""></img></a></h4>
        </div>
        <div id="nav-cust-right" className="nav-cust-menu">
            <div className="nav-cust-items"><a href="/#"><h3>Menu</h3></a></div>
            <div className="nav-cust-items"><a href="/#"><h3>Your Orders</h3></a></div>
            <div className="nav-cust-items"><a href="/#"><h3>Sign In</h3></a></div>
            <div className="nav-cust-button"><a href="/#"><h3>Checkout</h3></a></div>            
        </div>
    </div>
  );
};

export default NavbarCustomer;