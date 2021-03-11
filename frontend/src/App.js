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
import Checkout from './components/Customer/Checkout/Checkout';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import Profile from './components/Customer/Profile/Profile';

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
              <Route path="/login" exact>
                <NavbarCustomer />
                <Login />
              </Route>
              <Route path="/register" exact>
                <NavbarCustomer />
                <Registration />
              </Route>
              <Route path="/checkout" exact>
                <NavbarCustomer />
                <Checkout />
              </Route>
              <Route path="/profile" exact>
                <NavbarCustomer />
                <Profile />
              </Route>
              <Route path="/employee/orders" exact>
                <NavbarEmployee />
                <Orders />
              </Route>
              <Route path="/employee/login" exact>
                <NavbarEmployee />
                <Login />
              </Route>
              <Route path="/employee/register" exact>
                <NavbarEmployee />
                <Registration />
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
