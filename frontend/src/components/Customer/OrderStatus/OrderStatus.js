import React, {Component} from 'react';
import './OrderStatus.css';
import axios from 'axios'
import Cookies from 'universal-cookie'
// component imports

const cookies = new Cookies()

export default class OrderStatus extends Component {

  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount = () => {
      axios.post("http://localhost:9000/user/getplacedorders", {
        token: cookies.get('token')
      })
      .then(response => {
        console.log(response)
        this.setState({
          orders: response.data.order
        });
      })
      .catch(function(error) {
          console.log(error);
      })
  };

  calculateTotal = (products) => {
    var total = 0
    products.forEach(product => {
      total += product.price * product.OrderProduct.quantity
    })
    return total
  }

  render() {
  return (
    <div className="content">
    <div className="menu-header"><h4>Order History</h4></div>
    <div className="orders">
      <div className="order">
        <h3>Order</h3>
        <h3>Total</h3>
        <h3>Products</h3>
        <h3>Status</h3>
      </div>
      {this.state.orders.map((order, index) => (
      <div key={index} className="order">
        <div><p>Order {order.order_id}</p></div>
        <div><p>${this.calculateTotal(order.products)}</p></div>
        <div className="products-map">{order.products.map((product) => (
          <p>{product.name}: {product.OrderProduct.quantity}</p>
        ))}</div>
        <div><p>{order.delivery_status}</p></div>
      </div>
      ))}
    </div>
    </div>
  )
  };
}
