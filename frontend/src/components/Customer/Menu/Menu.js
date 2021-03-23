import React, {Component} from 'react';
import './Menu.css';
import Donut_1 from './Donut_1.png'
import axios from 'axios'
import Cookies from 'universal-cookie'
// import Donut_2 from './Donut_2.png'
// import Donut_3 from './Donut_3.png'
// import Donut_4 from './Donut_4.png'
// import Donut_5 from './Donut_5.png'
// import Donut_6 from './Donut_6.png'
// import Donut_7 from './Donut_7.png'
// import Donut_8 from './Donut_8.png'
// import Donut_9 from './Donut_9.png'
// import Donut_10 from './Donut_10.png'
// import Donut_11 from './Donut_11.png'
// import Donut_12 from './Donut_12.png'
// component imports

const cookies = new Cookies()

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      menu: []
    };
  }

  componentDidMount = () => {
      axios.get("http://localhost:9000/user/getmenu")
      .then(response => {
          this.setState({
          menu: response.data.product
          });
      })
      .catch(function(error) {
          console.log(error);
      })
  };

  handleButtonClick = (id) => (event) => {
    event.preventDefault();
    console.log(id);
    axios.post("http://localhost:9000/user/addtoorder", {
      product_id: id,
      token: cookies.get('token')
  })
  .then(response => {
    console.log(id);
    console.log(response.error);
  })
  .catch(err => {
    console.log(err);
  })
  };

  render() {
  return (
    <div>
    <div className="menu-header"><h4>Go nuts for DRONUTS!</h4></div>
    <div className="menu">
      {this.state.menu.map((product, index) => (
      <div key={index} className="container">
        <div key={index} ><img key={index} className="menu-item" src={Donut_1} alt=""></img></div>
        <div key={index} className="overlay">
          <div key={index} className="text">
          <div key={index} className="item-text">{product.name} <br/> ${product.price} </div>
          </div>
          <div key={index} className="add-to-cart-button"><button id="add-to-cart" onClick={this.handleButtonClick(product.product_id)} type="submit">Add to Cart</button></div>
        </div>
      </div>
      ))}
    </div>
    </div>
  )
  };
}
