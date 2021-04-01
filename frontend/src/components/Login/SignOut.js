import React, { Component } from 'react';
import './Login.css';
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'


// component imports
const cookies = new Cookies()

export default class SignOut extends Component {
  constructor() {
    super();
    this.state = {
        timed_out: [],
        redirect: false
    };
  }

  render() {
    
    cookies.remove('token')
    
    this.timed_out = setTimeout(() => this.setState({ redirect: true }), 3000)

    return this.state.redirect
    ? <Redirect to="/login" />
    : <div>
    <div className="login-head"><h2>Signed Out! <br/> Redirecting in a few seconds... </h2></div>
    </div>
  }

}