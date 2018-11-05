import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";
import './MapDisplay.css';

  

class MapDisplay extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        selectedLocation: this.props.locations
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



    chooseType = (e) => {
        if(e.target.value !== "all") {
            var arr = this.props.locations.filter(function(object){
                return object["type"] === e.target.value;
            })
            // console.log(arr);
            this.setState({
                selectedLocation: arr
            })
        } else {
            this.setState({
                selectedLocation: this.props.locations
            })
        }
    }

    render(){
        const center = {
            lat: this.props.lat,
            lng: this.props.lng
        }   
        return(
            <div>
                <div id="buttonList" className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-primary" value="bbh" onClick={this.chooseType}>Bun Bo Hue</button>
                    <button type="button" value="all" className="btn btn-default" onClick={this.chooseType}>All Restaurant</button>
                    <button type="button" value="pho" className="btn btn-info" onClick={this.chooseType}>Vietnamese Pho</button>
                </div>
                <Map 
                    google = {this.props.google}
                    initialCenter={center}
                    zoom = {this.props.zoom}
                    onReady = {this.fetchPlaces}
                    onClick={this.onMapClicked}
                >
                    {this.state.selectedLocation.map((element, index) => {
                        return (
                                <Marker key={index} position={element.pos} animation={this.props.google.maps.Animation.DROP} name={element.name} url={element.url} onClick={this.onMarkerClick}/>
                                )
                    })}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <h2>{this.state.selectedPlace.url}</h2>
                            {/* {console.log(this.state.selectedPlace)} */}
                        </div>
                    </InfoWindow>

                </Map>
            </div>
        )  
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBHCyjMDVNauHbBbYo7q8ghTd0maJc2QsM"
  })(MapDisplay)