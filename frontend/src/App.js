import './App.css';
import React from 'react';
import NavbarCustomer from './components/Customer/Navbar/Navbar';
import NavbarEmployee from './components/Employee/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Employee view components
import Orders from './components/Employee/Orders/Orders';
// import Drones from './components/Employee/Drones/Drones';

// Customer view components
import Menu from './components/Customer/Menu/Menu';
// import Cart from './components/Customer/Cart/Cart';
//import Checkout from './components/Customer/Checkout/Checkout';

function App() {
  if(true) {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <Switch>
              <Route path="/" exact>
                <NavbarCustomer />
                <Menu />
              </Route>
              <Route path="/employee" exact>
                <NavbarEmployee />
                <Orders />
              </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  };

  return (
    <div>
      <NavbarCustomer />
    </div>
  );
}

export default App;
