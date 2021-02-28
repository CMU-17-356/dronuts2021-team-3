import React from 'react';
import './Navbar.css';

// component imports

const Navbar = () => {
  return (
    <div class="navbar">
        <div id="nav-left">
            <h4><a>Dronuts</a></h4>
        </div>
        <div id="nav-right">
            <a>Link 1</a>
            <a>Link 2</a>
            <a>Link 3</a>
        </div>
    </div>
  );
};

export default Navbar;