import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";

class MapDisplay extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };

    fetchPlaces = () => {
        
    }

    render(){
        const center = {
            lat: this.props.lat,
            lng: this.props.lng
        }   
        return(
            <div>
                <Map 
                    google = {this.props.google}
                    initialCenter={center}
                    zoom = {this.props.zoom}
                    onReady = {this.fetchPlaces}
                >
                    
                </Map>
            </div>
        )  
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBHCyjMDVNauHbBbYo7q8ghTd0maJc2QsM"
  })(MapDisplay)