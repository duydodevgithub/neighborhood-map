import React, { Component } from 'react';
import './App.css';
import MapDisplay from "./components/MapDisplay";
import locations from "./data/locations.json"

class App extends Component {
  state = {
    lat: 29.965921,
    lng: -95.5534827,
    zoom: 13,
    allLocations: locations
  }
  render() {
    return (
      <div className="App">
        <h1>Vietnamese Restaurant near Spring TX</h1>
        <MapDisplay
          className="jumbotron"
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
