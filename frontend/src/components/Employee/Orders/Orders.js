import React, { Component } from 'react';
import './Orders.css';
import Cookies from 'universal-cookie'
import axios from "axios";

// component imports
const cookies = new Cookies()

export default class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount = () => {
    axios.post("http://localhost:9000/employee/getpendingorders", {
      token: cookies.get('token')
    })
    .then(response => {
      this.setState({
        orders: response.data.order
      });
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  handleButtonClick = (orderid) => {
    axios.post("http://localhost:9000/employee/completeorder", {
        token: cookies.get('token'),
        order_id: orderid
    }).then(response => {
      console.log(response)
      this.setState({ orders: [] })
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  render() {
    return (

    <div className="orders">
      <div className="orders-header"><h1 >Orders</h1></div>
      <div className="order-grid">

        {this.state.orders.map((order, index) => (
        <div className="order-item">
          <div className="order-num"><h3>Order {order.order_id}</h3></div>
          <div className="order-list">
            <ul>
              {order.products.map((product, index) =>
              <div className="list-item">
                <div><li>{product.name}<br/> Quantity: {product.OrderProduct.quantity}</li></div>
              </div>
              )}
            </ul>
          </div>
          <div className="order-done-button">
            <button onClick={() => this.handleButtonClick(order.order_id)}>Order Done</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )};
}