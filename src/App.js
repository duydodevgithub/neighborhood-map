import React, { Component } from 'react';
import './App.css';
import MapDisplay from "./components/MapDisplay";
import locations from "./data/locations.json"

class App extends Component {
  state = {
    lat: 29.965921,
    lng: -95.5534827,
    zoom: 12,
    allLocations: locations
  }
  render() {
    return (
      <div className="App">
        <h1>Google API</h1>
        <MapDisplay
          lat = {this.state.lat}
          lng = {this.state.lng}
          zoom = {this.state.zoom}
          locations = {this.state.allLocations}
        />
      </div>
    );
  }
}

export default App;
