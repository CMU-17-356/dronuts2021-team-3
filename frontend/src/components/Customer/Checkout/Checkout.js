import React, {Component} from 'react';
import './Checkout.css';
import Donut_1 from '../Menu/Donut_1.png'
import axios from "axios";
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'

// component imports
const cookies = new Cookies()

export default class Checkout extends Component {

  constructor() {
    super();
    this.state = {
      order: [],
      transaction_complete: false
    };
  }

  componentDidMount = () => {
      axios.post("http://localhost:9000/user/getcurrentorder", {
          token: cookies.get('token')
      })
      .then(response => {
          this.setState({
          order: response.data.order
          });
          console.log(response);
      })
      .catch(function(error) {
          console.log(error);
      })
  };

/*   handleButtonClick = event => {
      event.preventDefault();
      axios.post("http://localhost:9000/user/checkout", {
        token: cookies.get('token')
    }).then(response => 
    {
      this.setState({order: response});
      this.setState({transaction_complete: true});
      this.render()
    })
    .catch(function(error) {
      console.log(error);
    })
  }; */

  render() {
    if(this.state.transaction_complete) {
      return <Redirect to="/" />
    }
    else {
    return (
      <div>
      <div className="checkout-header"><h1>Checkout</h1></div>
      <div className="checkout-table">
      <table>
        <thead>
          <tr>
            <th>ITEM </th>
            <th>IMAGE</th>
            <th className="quantity-col">QUANTITY</th>
            <th className="price-col">PRICE</th>
            <th className="price-col">AMOUNT</th>
          </tr>   
        </thead>

      </table>
      </div>
      <div className="total-amount">
        <h2>Total Amount: {this.state.order.total_cost}</h2>
      </div>
      <div className="place-order-button">
          
      </div>
      </div>
    )
    }
  };
};