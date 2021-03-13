import React from 'react';
import './Drones.css';
// component imports

const Drones = () => {
  return (
    <div className="drones">
      <div className="drones-header"><h1 >Drones</h1></div>
      <div className="drone-grid">

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
};

export default Drones;