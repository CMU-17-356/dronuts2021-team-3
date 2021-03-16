import React, { Component } from 'react';
import './Drones.css';
import axios from "axios";
// component imports

export default class Drones extends Component {
  constructor() {
    super();
    this.state = {
      drone1_name: "not yet",
      drone1_battery: "not yet"
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:9000/employee/getalldrones", {
      headers: {
        Cookies: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjE1ODcxNTkzLCJleHAiOjE2MTU5NTc5OTN9.fdM9set71eoLyfU1sA34fvbb-vVEIqPGzztjrQp-UpI"
      }
    }
    ).then(response => {
      this.setState({
        drone1_name: "hello"
        // drone1_name: response.drones[0].drone_name,
        // drone1_battery: response.drones[0].battery.charge
      });
    });    
  };

  render() {
    return (
      <div className="drones">
      <div className="drones-header"><h1 >Drones</h1></div>
      <div className="drone-grid">

        <div>
        <div className="drone-item">
          <div className="drone-num"><h3> {this.state.drone1_name}</h3></div>
          <div className="drone-list">
            <ul>
              <div className="drone-list-item">
                <div><li className="battery-level">Battery Level: 54%</li></div>
              </div>
              <div className="drone-list-item">
                <div><li className="allocation">Allocated to: Order #3476541</li></div>
              </div>
              <div className="drone-list-item">
                <div><li className="status">Status: Active</li></div>
              </div>
            </ul>
          </div>
          </div>
        </div>

        <div>
        <div className="drone-item">
          <div className="drone-num"><h3>Drone #21</h3></div>
          <div className="drone-list">
            <ul>
              <div className="drone-list-item">
                <div><li className="battery-level">Battery Level: 54%</li></div>
              </div>
              <div className="drone-list-item">
                <div><li className="allocation">Allocated to: Order #3476541</li></div>
              </div>
              <div className="drone-list-item">
                <div><li className="status">Status: Active</li></div>
              </div>
            </ul>
          </div>
          </div>
        </div>

        <div>
        <div className="drone-item">
          <div className="drone-num"><h3>Drone #21</h3></div>
          <div className="drone-list">
            <ul>
              <div className="drone-list-item">
                <div><li className="battery-level">Battery Level: 54%</li></div>
              </div>
              <div className="drone-list-item">
                <div><li className="allocation">Allocated to: Order #3476541</li></div>
              </div>
              <div className="drone-list-item">
                <div><li className="status">Status: Active</li></div>
              </div>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>


    );
  }

}

// const Drones = () => {
//   return (
//     <div className="drones">
//       <div className="drones-header"><h1 >Drones</h1></div>
//       <div className="drone-grid">

//         <div>
//         <div className="drone-item">
//           <div className="drone-num"><h3>Drone #21</h3></div>
//           <div className="drone-list">
//             <ul>
//               <div className="drone-list-item">
//                 <div><li className="battery-level">Battery Level: 54%</li></div>
//               </div>
//               <div className="drone-list-item">
//                 <div><li className="allocation">Allocated to: Order #3476541</li></div>
//               </div>
//               <div className="drone-list-item">
//                 <div><li className="status">Status: Active</li></div>
//               </div>
//             </ul>
//           </div>
//           </div>
//         </div>

//         <div>
//         <div className="drone-item">
//           <div className="drone-num"><h3>Drone #21</h3></div>
//           <div className="drone-list">
//             <ul>
//               <div className="drone-list-item">
//                 <div><li className="battery-level">Battery Level: 54%</li></div>
//               </div>
//               <div className="drone-list-item">
//                 <div><li className="allocation">Allocated to: Order #3476541</li></div>
//               </div>
//               <div className="drone-list-item">
//                 <div><li className="status">Status: Active</li></div>
//               </div>
//             </ul>
//           </div>
//           </div>
//         </div>

//         <div>
//         <div className="drone-item">
//           <div className="drone-num"><h3>Drone #21</h3></div>
//           <div className="drone-list">
//             <ul>
//               <div className="drone-list-item">
//                 <div><li className="battery-level">Battery Level: 54%</li></div>
//               </div>
//               <div className="drone-list-item">
//                 <div><li className="allocation">Allocated to: Order #3476541</li></div>
//               </div>
//               <div className="drone-list-item">
//                 <div><li className="status">Status: Active</li></div>
//               </div>
//             </ul>
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Drones;