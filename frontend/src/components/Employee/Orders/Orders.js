import React from 'react';
import './Orders.css';
// component imports

const Orders = () => {
  return (
    <div className="orders">
      <div className="orders-header"><h1 >Orders</h1></div>
      <div className="order-grid">

        <div>
        <div className="order-item">
          <div className="order-num"><h3>Order #347189</h3></div>
          <div className="order-list">
            <ul>
              <div className="list-item">
                <div><li> Vanilla Icing with Buttercream and Cookies Donut <br/> Quantity: 4 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Chocolate Caramel Crust Donut <br/> Quantity: 2 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Blueberry Crush Donut <br/> Quantity: 3 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
            </ul>
          </div>
          <div className="order-done-button">
            <button>Order Done</button>
          </div>
        </div>
        </div>

        <div>
        <div className="order-item">
          <div className="order-num"><h3>Order #347189</h3></div>
          <div className="order-list">
            <ul>
              <div className="list-item">
                <div><li> Vanilla Icing with Buttercream and Cookies Donut <br/> Quantity: 4 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Chocolate Caramel Crust Donut <br/> Quantity: 2 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Blueberry Crush Donut <br/> Quantity: 3 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
            </ul>
          </div>
          <div className="order-done-button">
            <button>Order Done</button>
          </div>
        </div>
        </div>

        <div>
        <div className="order-item">
          <div className="order-num"><h3>Order #347189</h3></div>
          <div className="order-list">
            <ul>
              <div className="list-item">
                <div><li> Vanilla Icing with Buttercream and Cookies Donut <br/> Quantity: 4 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Chocolate Caramel Crust Donut <br/> Quantity: 2 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Blueberry Crush Donut <br/> Quantity: 3 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Vanilla Icing with Buttercream and Cookies Donut <br/> Quantity: 4 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Chocolate Caramel Crust Donut <br/> Quantity: 2 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>
              <div className="list-item">
                <div><li> Blueberry Crush Donut <br/> Quantity: 3 </li></div>
                <div><input type="checkbox" id="item1" /></div>
              </div>              
            </ul>
          </div>
          <div className="order-done-button">
            <button>Order Done</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
