import React, { useState, useEffect} from 'react';
import './Checkout.css';
import Donut_1 from '../Menu/Donut_1.png'

// component imports

const Checkout = () => {

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://localhost:9000/user/getuser');
      response = await response.text();
      setOrder(response); 
      setIsLoaded(true);
    }

    fetchMyAPI()
  }, [])

  var orderJson = JSON.parse(order);

  const TableRow = (props) => {
    return (<tr>
    <td className="item-col">{props.name}</td>
    <td><img className="image-item" src={Donut_1} alt=""></img></td>
    <td className="quantity-col">{props.quantity}</td>
    <td className="price-col">${props.price}</td>
    <td className="amount-col">${props.price*props.quantity}</td>
    </tr>);
  };

/*   const items = []

  for(var i = 0; (orderJson != null) && (i < 2); i++) {  
    items.push(<TableRow key={i} props={orderJson.order[i]}/>)
      console.log(i);
  } */

  if (error) {
    return <div className="menu-header">Error: {error.message}</div>;
  } 
  else if (!isLoaded) {
  return <div className="menu-header">Loading...</div>;
  }
  else
  {
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
          {order.map((value, index) => {
          return <TableRow key={index} props={value}/>
          })}        
        </thead>
      </table>
      </div>
      <div className="total-amount">
        <h2>Total Amount: {order.total_cost}</h2>
      </div>
      <div className="place-order-button">
          <a href=""><h2>Place Order</h2></a>
      </div>
      </div>
    );
  }
};

export default Checkout;