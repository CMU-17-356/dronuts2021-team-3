import React, { Component } from 'react';
import './Drones.css';
import Cookies from 'universal-cookie'
import axios from "axios";

// component imports
const cookies = new Cookies()

export default class Drones extends Component {
  constructor() {
    super();
    this.state = {
      drones: []
    };
  }
  componentDidMount = () => {
    axios.post("http://localhost:9000/employee/getalldrones", {
      token: cookies.get('token')
    })
    .then(response => {
      console.log(response)
      this.setState({
        drones: response.data.drones
      });
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  render() {
    return (
      <div className="drones">
        <div className="drones-header"><h1 >Drones</h1></div>
        <div className="drone-grid">

          {this.state.drones.map((drone, index) => (
            <div className="drone-item">
              <div className="drone-num"><h3>Drone #{drone.id}</h3></div>

              <div className="drone-list">
                <ul>
                  <div className="drone-list-item">
                    <div><li className="drone-name">Name: {drone.drone_name}</li></div>
                  </div>
                  <div className="drone-list-item">
                    <div><li className="battery-level">Battery Level: {(100 * drone.battery.charge) / drone.battery.capacity}</li></div>
                  </div>
                  <div className="drone-list-item">
                    <div><li className="location">Location: {drone.location.lat}, {drone.location.lng}</li></div>
                  </div>
                  <div className="drone-list-item">
                    <div><li className="status">Status: {drone.current_delivery ? drone.current_delivery.status : "Available"}</li></div>
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
  )};
}