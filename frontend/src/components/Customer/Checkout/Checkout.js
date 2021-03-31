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
      credit_card: -1,
      timed_out: [],
      redirect: false
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

  handleChangeCreditCard = event => {
    this.setState({credit_card: event.target.value});
  }

  handleButtonClick = event => {
      event.preventDefault();
      if(this.state.credit_card === -1)
        return
      axios.post("http://localhost:9000/user/checkout", {
        token: cookies.get('token'),
        credit_card: this.state.credit_card
    }).then(response => 
    {
      this.setState({order: response});
      this.setState({transaction_complete: true});
      this.timed_out = setTimeout(() => this.setState({ redirect: true }), 3000)
      this.render()
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  calculateTotal = () => {
    var total = 0
    this.state.order.products.forEach(product => {
      total += product.price * product.OrderProduct.quantity
    })
    return total
  }

  render() {
    if(this.state.transaction_complete) {
      return this.state.redirect
        ? <Redirect to="/" />
        : <div>
        <div className="checkout-header"><h2>Transaction Completed! <br/> Redirecting in a few seconds... </h2></div>
        </div> 
    }
    else if(typeof this.state.order.products === "undefined") {
      return (
        <div>
        <div className="checkout-header"><h1>Cart is Empty</h1></div>
        </div>  
      )    
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
            <th className="image-col">IMAGE</th>
            <th className="quantity-col">QUANTITY</th>
            <th className="price-col">PRICE</th>
            <th className="price-col">AMOUNT</th>
          </tr>   
        </thead>
        {this.state.order.products.map((product, index) => (
          <tr>
          <td className="item-col">{product.name}</td>
          <td className="image-col"><img className="image-item" src={Donut_1} alt=""></img></td>
          <td className="quantity-col">{product.OrderProduct.quantity}</td>
          <td className="price-col">${product.price}</td>
          <td className="amount-col">${product.price*product.OrderProduct.quantity}</td>
          </tr>
        ))}
      </table>
      </div>
      <div className="total-amount">
        <h2>Total Amount: ${this.calculateTotal()}</h2>
      </div>
      <div className="place-order-button">
      <input type="text" onChange={this.handleChangeCreditCard} placeholder="Enter Credit Card Details"></input>
      <button onClick={this.handleButtonClick} type="submit" >Place Order</button>
      </div>
      </div>
    )
    }
  };
};