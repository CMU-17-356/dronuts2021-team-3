import React, { useState, useEffect} from 'react';
import './Menu.css';
import Donut_1 from './Donut_1.png'
import Donut_2 from './Donut_2.png'
import Donut_3 from './Donut_3.png'
import Donut_4 from './Donut_4.png'
import Donut_5 from './Donut_5.png'
import Donut_6 from './Donut_6.png'
import Donut_7 from './Donut_7.png'
import Donut_8 from './Donut_8.png'
import Donut_9 from './Donut_9.png'
import Donut_10 from './Donut_10.png'
import Donut_11 from './Donut_11.png'
import Donut_12 from './Donut_12.png'
// component imports

const axios = require('axios')

const Menu = () => {

  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://localhost:9000/user/getmenu');
      response = await response.text();
      setMenu(response); 
      setIsLoaded(true);
    }

    fetchMyAPI()
  }, [])

  //console.log(menu);
  var menuJson = JSON.parse(menu);

  const MenuItem = ({props}) => {
    return (
     <div className="container">
        <div><img className="menu-item" src={Donut_1} alt=""></img></div>
        <div className="overlay">
          <div className="text">
          <div className="item-text">{props.name} <br/> {props.price} </div>
          </div>
          <div className="add-to-cart-button"><button>Add to Cart</button></div>
        </div>
      </div>
    );  
  };

  const items = []

  for(var i = 0; (menuJson != null) && (i < menuJson.product.length); i++) {  
    items.push(<MenuItem key={i} props={menuJson.product[i]}/>)
      console.log(i);
  }

  if (error) {
    return <div className="menu-header">Error: {error.message}</div>;
  } 
  else if (!isLoaded) {
    return <div className="menu-header">Loading...</div>;
  }
  else {
  return (
    <div>
    <div className="menu-header"><h4>Go nuts for DRONUTS!</h4></div>
    <div className="menu">
      {items}
    </div>
    </div>
  );
  }
};

export default Menu;
