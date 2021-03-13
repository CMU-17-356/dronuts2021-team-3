import React from 'react';
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

const Menu = () => {

  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/getmenu')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMenu(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const MenuItem = ({props}) => {
     <div className="container">
        <div><img className="menu-item" src={Donut_1} alt=""></img></div>
        <div className="overlay">
          <div className="text">
          <div className="item-text">{props.name} <br/> {props.price} </div>
          </div>
          <div className="add-to-cart-button"><button>Add to Cart</button></div>
        </div>
      </div>  
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
      {menu.map((value, index) => {
        return <MenuItem key={index} props={value}/>
      })}                                       
    </div>
    </div>
  );
  }
};

export default Menu;
