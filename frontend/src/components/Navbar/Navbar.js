import React from 'react';
import './Navbar.css';

// component imports

const Navbar = () => {
  return (
    <div class="navbar">
        <div id="nav-left">
            <h4><a href="/#">Dronuts</a></h4>
        </div>
        <div id="nav-right">
            <a href="/#">Link 1</a>
            <a href="/#">Link 2</a>
            <a href="/#">Link 3</a>
        </div>
    </div>
  );
};

export default Navbar;