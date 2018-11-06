import React, { Component } from 'react';
import './App.css';
import MapDisplay from "./components/MapDisplay";
import locations from "./data/locations.json";


class App extends Component {
  state = {
    lat: 30.00018,
    lng: -95.5534827,
    zoom: 13,
    allLocations: locations
  }
  reload = () => {
    document.location.reload(true);
  }
  render() {
    return (
      <div className="container-fluid App">
        <div className="page-header">
          <h2>Restaurants near Spring TX</h2>
          <input type="button" value="Reload Page" onClick={this.reload}></input>
        </div>
        <div className="row">
          <div id="map" className="z-depth-1">
              <MapDisplay
              id = "mapdisplay"
              lat = {this.state.lat}
              lng = {this.state.lng}
              zoom = {this.state.zoom}
              locations = {this.state.allLocations}
            />
          </div>         
        </div>
        
      </div>
    );
  }
}

export default App;
