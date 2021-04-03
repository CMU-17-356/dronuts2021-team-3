import React, {Component} from 'react';
import './Menu.css';
import Donut_1 from './Donut_1.png'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { forInRight } from 'lodash';
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
var count = 1
var order = []
var order_id = -1

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      menu: [],
      quantity: new Map([]),
      order: [],
      order_id: -1
    };

    this.setQuantityValue = this.setQuantityValue.bind(this)
    this.getQuantityValue = this.getQuantityValue.bind(this)
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this)
    this.getCurrentOrder = this.getCurrentOrder.bind(this)
  } 


  componentDidMount = () => {
    console.log("In CDM")

    axios.get("http://localhost:9000/user/getmenu")

    .then(response => {
        this.setState({
        menu: response.data.product
        });

        var i
        var temp = []
        for(i = 0; i < response.data.product.length; i++) {
          temp.push([response.data.product[i].product_id, 0])
        }  
        this.setState({
          order : temp
        })  
        
        order = temp
    })
    .catch(function(error) {
        console.log(error);
    })

    if(cookies.get('token') != null) {
      this.getCurrentOrder()
    }
  };

  getCurrentOrder = () => {

    axios.post("http://localhost:9000/user/getcurrentorder", {
        token: cookies.get('token')
      })
      .then(response => {
        var i
        var temp = order

        for(i = 0; i < response.data.order.products.length; i++) {
          var j
          for(j = 0; j < temp.length; j++) {
            if(temp[j][0] == response.data.order.products[i].product_id)
              temp[j][1] = response.data.order.products[i].OrderProduct.quantity
          }
        }
  
        this.setState({
          order : temp
        }) 

        order = temp
        
        order_id = response.data.order.order_id  

      })
      .catch(function(error) {
          console.log(error);
      })

  }

  setQuantityValue = (id, q) => {

    var i;
    var index = -1
    
    for(i = 0; i < order.length; i++)
    {
      if(order[i][0] == id){
        order[i][1] = q
        break
      }        
    }

    this.setState({
      order: order
    })
  }

  handleAddButtonClick = (id, q) => (event) => {

    if(typeof q === 'undefined')
      q = 0
    
    event.preventDefault();
    console.log(id);
    console.log("Quantity is ", q)
    q = q + 1
    console.log("Order ", order)

    axios.post("http://localhost:9000/user/addtoorder", {
      product_id: id,
      quantity: q,
      token: cookies.get('token')
    })
    .then(response => {
      this.setQuantityValue(id, q)
    })
    .catch(err => {
      console.log(err);
    })
  };

  handleRemoveButtonClick = (id, q) => (event) => {

    if(typeof q === 'undefined')
      q = 0
    
    event.preventDefault();

    if((q-1)>0) {
      axios.post("http://localhost:9000/user/addtoorder", {
        product_id: id,
        quantity: q,
        token: cookies.get('token')
      })
      .then(response => {
        this.setQuantityValue(id, q-1)
      })
      .catch(err => {
        console.log(err);
      })
    }
    else if((q-1)==0) {

      var i

      axios.post("http://localhost:9000/user/removefromorder", {
        order_id: order_id,
        product_id: id,
        token: cookies.get('token')
      })
      .then(response => {
        this.setQuantityValue(id, 0)
      })
      .catch(err => {
        console.log(err);
      })
    }
    else if(q == 0) {
      this.setQuantityValue(id, 0)
        return
    }
  };

  getQuantityValue = (id) => {

    var quantity = 0
    var i

    console.log("order length", order.length)
    for(i = 0; i < order.length; i++)
    {
      if(order[i][0] == id){
        
        console.log("id = ", id)
        quantity = order[i][1]
        console.log(quantity)
        break
      }        
    }

    console.log("GetQuantityValue", quantity)
    return quantity
    
  }

  render() {
  
  return (
    <div>
    <div className="menu-header"><h4>Go nuts for DRONUTS!</h4></div>
    <div className="menu">
      {this.state.menu.map((product, index) => (
      <div key={product.product_id} className="container">
        <div key={product.product_id} ><img key={product.product_id} className="menu-item" src={Donut_1} alt=""></img></div>
        <div key={product.product_id} className="overlay">
          <div key={product.product_id} className="text">
          <div key={product.product_id} className="item-text">{product.name} <br/> ${product.price} </div>
          </div>
          <div key={product.product_id} className="add-to-cart-grid">
            <div key={product.product_id} className="add-to-cart-button"><button id="add-to-cart" onClick={this.handleAddButtonClick(product.product_id, this.getQuantityValue(product.product_id))} type="submit">+</button></div>          
            <div key={product.product_id} className="item-text"> {this.getQuantityValue(product.product_id)} </div>
            <div key={product.product_id} className="add-to-cart-button"><button id="add-to-cart" onClick={this.handleRemoveButtonClick(product.product_id, this.getQuantityValue(product.product_id))} type="submit">-</button></div>
          </div>
        </div>
      </div>
      ))}
    </div>
    </div>
  )
  };
}
