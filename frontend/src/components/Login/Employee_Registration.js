import React, { Component } from 'react';
import './Registration.css';
import Dronut_Logo from './Dronut_Logo.png'
import axios from "axios";
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'
import { faPray } from '@fortawesome/free-solid-svg-icons';

// component imports
const cookies = new Cookies()

export default class Registration extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        user_type: 'employee',
        email: '',
        logged_in: false
      };
    }
    
    handleChangeUsername = event => {
      this.setState({username: event.target.value});
    }

    handleChangePassword = event => {
      this.setState({password: event.target.value});
    }

    handleChangeFirstName = event => {
      this.setState({first_name: event.target.value});
    }

    handleChangeLastName = event => {
      this.setState({last_name: event.target.value});
    }

    handleChangeEmail = event => {
      this.setState({email: event.target.value});
    }

    handleButtonClick = event => {
      event.preventDefault();
      axios.post("http://localhost:9000/auth/register", {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          user_type: 'customer', //hardcoded here. will have separate page for employees
          email: this.state.email
      }).then(response => 
      {
        cookies.set('token',response.data.token,{ path: "/" })
        console.log(response)
        this.setState({logged_in: true});
      })
      .catch(function(error) {
        console.log(error);
      })
    };
  
    render() {
      if (this.state.logged_in && this.state.user_type === "customer") {
        return <Redirect to="/" />
      }
      else if (this.state.logged_in && this.state.user_type === "employee") {
        return <Redirect to="/employee/orders" />
      }
      return (
      
        <div className="register">
        <div className="register-left">
            <div></div>
            <div>
                <h2> Looking for a donut delivered by a drone?</h2>
                <img className="register-logo" src={Dronut_Logo} alt=""></img>
                <h2> is here for you! </h2>
            </div>
            <div></div>
        </div>
        <div id="register-right" className="register-form">
            <div></div>
            <div>
              <form onSubmit={this.handleButtonClick}>
                <div className="register-header"><h2>Create Account</h2></div>
                <div className="register-firstname"><input type="text" onChange={this.handleChangeFirstName} placeholder="Enter First Name"></input></div>
                <div className="register-lastname"><input type="text" onChange={this.handleChangeLastName} placeholder="Enter Last Name"></input></div>
                <div className="register-email"><input type="text" onChange={this.handleChangeEmail} placeholder="Enter Email"></input></div>
                <div className="register-username"><input type="text" onChange={this.handleChangeUsername} placeholder="Choose Username"></input></div>
                <div className="register-password"><input type="password" id="pass" name="password"
            minlength="8" onChange={this.handleChangePassword} required placeholder="Choose Password"></input></div>
                <div className="register-container">
                    <div></div>
                    <button className="register-button" type="submit" >Register</button>
                    </div>
                    <div></div> 
                    
                    </form>
           </div>
           <div></div>
        </div>
    </div>
  
  
      );
    }
  
  }


// const Registration = () => {
//   return (
//     <div className="register">
//         <div className="register-left">
//             <div></div>
//             <div>
//                 <h2> Looking for a donut delivered by a drone?</h2>
//                 <img className="register-logo" src={Dronut_Logo} alt=""></img>
//                 <h2> is here for you! </h2>
//             </div>
//             <div></div>
//         </div>
//         <div id="register-right" className="register-form">
//             <div></div>
//             <div>
//                 <div className="register-header"><h2>Create Account</h2></div>
//                 <div className="register-firstname"><input type="text" placeholder="Enter First Name"></input></div>
//                 <div className="register-lastname"><input type="text" placeholder="Enter Last Name"></input></div>
//                 <div className="register-address"><input type="text" placeholder="Enter Address"></input></div>
//                 <div className="register-contact"><input type="text" placeholder="Enter Contact Number"></input></div>
//                 <div className="register-email"><input type="text" placeholder="Enter Email"></input></div>
//                 <div className="register-username"><input type="text" placeholder="Choose Username"></input></div>
//                 <div className="register-password"><input type="password" id="pass" name="password"
//             minlength="8" required placeholder="Choose Password"></input></div>
//                 <div className="register-container">
//                     <div></div>
//                     <div className="register-button"><a href="/#"><h3>Register</h3></a></div></div>
//                     <div></div>
//            </div>
//            <div></div>
//         </div>
//     </div>
//   );
// };

// export default Registration;