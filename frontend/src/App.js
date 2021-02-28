import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar/Navbar';

// Employee view components
import Orders from './components/Employee/Orders/Orders';
import Drones from './components/Employee/Drones/Drones';

// Customer view components
import Menu from './components/Customer/Menu/Menu';
import Cart from './components/Customer/Cart/Cart';
import Checkout from './components/Customer/Checkout/Checkout';

function App() {
  // TODO: Add Login Tokens
  if(true) {
    return (
      <div>
        <Navbar />
        <Checkout />
      </div>
    )
  };

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
