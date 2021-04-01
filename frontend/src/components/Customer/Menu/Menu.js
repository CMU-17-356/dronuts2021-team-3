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
var count = 1

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      menu: [],
      quantity: new Map([]),
      order: []
    };

    this.setQuantityValue = this.setQuantityValue.bind(this)
    this.getQuantityValue = this.getQuantityValue.bind(this)
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this)
  } 


  componentDidMount = () => {
    console.log("In CDM")
    var order_map = new Map([])
    if(cookies.get('token') != null) {
      console.log("In CDM IF")
      axios.post("http://localhost:9000/user/getcurrentorder", {
        token: cookies.get('token')
      })
      .then(response => {
          this.setState({
            order: response.data.order
          })
          console.log(this.state.order)
      })
      .catch(function(error) {
          console.log(error);
      })
      
    }

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

  setQuantityValue = (id, q) => {

    var i;
    var index = -1

    if(this.state.order === 'undefined')
      return 
    
    if(typeof this.state.order.products !== 'undefined')
    {
      for(i = 0; i < this.state.order.products.length; i++)
      {
        if(this.state.order.products[i].product_id == id){
          index = i
          break
        }        
      }
    }
    else {
      return
    }

    var items = this.state.order.products
    var item

    console.log("Items ", items)
    

    if(index != -1)
      item = {...this.state.order.products[index]}
    else
      return

    console.log("Item", item)

    if(typeof item !== 'undefined')
      if(typeof item.OrderProduct !== 'undefined')
        item.OrderProduct.quantity = q
      else
        return 
    else
      return 

    items[index] = item
      
    this.setState({
      order: {
        products: items
    }})

    console.log("Order", this.state.order)
  }

  handleAddButtonClick = (id, q) => (event) => {

    if(typeof q === 'undefined')
      q = 0
    
    event.preventDefault();
    console.log(id);
    console.log("Quantity is ", q)

    axios.post("http://localhost:9000/user/addtoorder", {
      product_id: id,
      quantity: q+1,
      token: cookies.get('token')
    })
    .then(response => {
      console.log(id);
      console.log(response.error);
    })
    .catch(err => {
      console.log(err);
    })

    this.setQuantityValue(id, q+1)
  };

  handleRemoveButtonClick = (id, q) => (event) => {

    if(typeof q === 'undefined')
      q = 0
    
    event.preventDefault();
    console.log(id);
    console.log("Quantity is ", this.state.quantity.get(id))

    if((q-1)>0) {
      axios.post("http://localhost:9000/user/addtoorder", {
        product_id: id,
        quantity: q-1,
        token: cookies.get('token')
      })
      .then(response => {
        console.log(id);
        console.log(response.error);
      })
      .catch(err => {
        console.log(err);
      })
    }
    else if((q-1)==0) {

      var i
      var order_id = 0

      for(i = 0; i < this.state.order.products.length; i++)
      {
        if(this.state.order.products[i].product_id == id){
          order_id = this.state.order.products[i].OrderProduct.order_id
          break
        }        
      }

      axios.post("http://localhost:9000/user/removefromorder", {
        order_id: order_id,
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
    }
  else if(q == 0) {
      this.setQuantityValue(id, q)
      return
    }

    this.setQuantityValue(id, q-1)
  };

  handleChangeQuantity = (id, event) => {

    if(typeof event === 'undefined')
      return

    var q = parseInt(event.target.value)

    if(q > 0)
    {
      axios.post("http://localhost:9000/user/addtoorder", {
        product_id: id,
        quantity: q,
        token: cookies.get('token')
      })
      .then(response => {
        console.log(id);
        console.log(response.error);
      })
      .catch(err => {
        console.log(err);
      })

      this.setQuantityValue(id, q)
    }
    else if(q == 0)
    {
      axios.post("http://localhost:9000/user/removefromorder", {
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

      this.setQuantityValue(id, q)
    }
    
  }

  getQuantityValue = (id) => {

    var quantity = 0
    var i

    if(typeof this.state.order.products !== 'undefined')
    {
      for(i = 0; i < this.state.order.products.length; i++)
      {
        if(this.state.order.products[i].product_id == id){
          quantity = this.state.order.products[i].OrderProduct.quantity
          break
        }        
      }
    }
    else
    {
      return 0
    }

    return quantity
  }

  render() {

  return (
    <div>
    <div className="menu-header"><h4>Go nuts for DRONUTS!</h4></div>
    <div className="menu">
      {this.state.menu.map((product, index) => (
      <div key={index} className="container">
        <img key={index} className="menu-item" src={Donut_1} alt=""></img>
        <div key={index} className="overlay">
          <div key={index} className="text">
            <div key={index} className="item-text">{product.name} <br/> ${product.price} </div>
          </div>
          <div key={index} className="add-to-cart-grid">
            <div key={index} className="add-to-cart-button"><button id="add-to-cart" onClick={this.handleAddButtonClick(product.product_id, this.getQuantityValue(product.product_id))} type="submit">+</button></div>          
            <div key={index} className="item-text"> {this.getQuantityValue(product.product_id)} </div>
            <div key={index} className="add-to-cart-button"><button id="add-to-cart" onClick={this.handleRemoveButtonClick(product.product_id, this.getQuantityValue(product.product_id))} type="submit">-</button></div>
          </div>
        </div>
      </div>
    ))}
    </div>
    </div>
  )
  };
}
