import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";
import './MapDisplay.css';
import axios from 'axios';

const config = {
    headers: {'Authorization': 'Bearer pi67sORoz9nhDUAbIeDVeotZyuh20OSY5c9Z-i9EuEfr3mXGD8TgsOrI8i9srOX77t6vjqknwhntUf-37yx9HpW3YqlTaH4uiUhbtDQOLt7Q61Mv0SeSk7lI3oHgW3Yx'},
    params: {
        method: 'get',
        term: 'tacos'

        }
  };

class MapDisplay extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        selectedLocation: this.props.locations
    }

    componentWillMount() {
        this.props.locations.forEach(element => {
            let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + element.businessId;
            axios.get(url, config)
            .then(response => {element.rating = response.data.rating});
        });

        
    }
    
    onMarkerClick = (props, marker, e) => {
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    })};

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };



    chooseType = (e) => {
        this.test(e);
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
                                <Marker key={index} position={element.pos} animation={this.props.google.maps.Animation.DROP} bID={element.businessId} name={element.name} url={element.url} onClick={this.onMarkerClick}/>
                                )
                    })}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <h2>{this.state.selectedPlace.url}</h2>
                            <h2>Rating: {this.state.selectedPlace.rating} </h2>
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