import React from 'react';
import './Checkout.css';
import Donut_1 from '../Menu/Donut_1.png'
import Donut_2 from '../Menu/Donut_2.png'
import Donut_3 from '../Menu/Donut_3.png'
import Donut_4 from '../Menu/Donut_4.png'

// component imports

useEffect(() => {
  fetch('/getcurrentorder')
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

const Checkout = () => {
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
        <tr>
          <td className="item-col">Vanilla Icing with Buttercream and Cookies  </td>
          <td><img className="image-item" src={Donut_1} alt=""></img></td>
          <td className="quantity-col">3</td>
          <td className="price-col">$2.49</td>
          <td className="amount-col">$7.47</td>
        </tr>
        <tr>
          <td className="item-col">Mango Donut with Pancake Syrup  </td>
          <td><img className="image-item" src={Donut_2} alt=""></img></td>
          <td className="quantity-col">3</td>
          <td className="price-col">$2.49</td>
          <td className="amount-col">$7.47</td>
        </tr>
        <tr>
          <td className="item-col">Coconut Donut with Frosting  </td>
          <td><img className="image-item" src={Donut_3} alt=""></img></td>
          <td className="quantity-col">3</td>
          <td className="price-col">$2.49</td>
          <td className="amount-col">$7.47</td>
        </tr>
        <tr>
          <td className="item-col">Chocolate Chip and Hazelnut</td>
          <td><img className="image-item" src={Donut_4} alt=""></img></td>
          <td className="quantity-col">3</td>
          <td className="price-col">$2.49</td>
          <td className="amount-col">$7.47</td>
        </tr>
      </thead>
    </table>
    </div>
    <div className="total-amount">
      <h2>Total Amount: $29.88</h2>
    </div>
    <div className="place-order-button">
            <h2>Place Order</h2>
    </div>
    </div>
  );
};

export default Checkout;