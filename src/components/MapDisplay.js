import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";
import './MapDisplay.css';
import ListView from "./ListView";
import axios from 'axios';
import $ from 'jquery'; 


const config = {
    headers: {'Authorization': 'Bearer pi67sORoz9nhDUAbIeDVeotZyuh20OSY5c9Z-i9EuEfr3mXGD8TgsOrI8i9srOX77t6vjqknwhntUf-37yx9HpW3YqlTaH4uiUhbtDQOLt7Q61Mv0SeSk7lI3oHgW3Yx'},
    params: {
        method: 'get'
        }
  };

class MapDisplay extends Component {
    state = {
        display: [],
        allLocation: [],
        categories: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      }
        

    componentWillMount() {
        let locations = [];
        let categories = [];
        this.props.locations.forEach(element => {
            let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + element.businessId;
            axios.get(url, config)
            .then(response => {
                // console.log(response.data);
                locations.push({
                    category:response.data.categories[0].alias,
                    id: response.data.id,
                    name: response.data.name,
                    address: response.data.location.address1,
                    alias: response.data.alias,
                    img: response.data.image_url,
                    rating: response.data.rating,
                    review_count: response.data.review_count,
                    coords: {"lat": response.data.coordinates["latitude"], "lng": response.data.coordinates["longitude"]},
                    url: response.data.url,
                    phone: response.data.display_phone
                })
                categories.push(response.data.categories[0].alias);
                var uniqueNames = [];
                $.each(categories, function(i, el){
                    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                });
                // console.log(locations);
                // console.log(categories);
                if(locations.length === 0) {
                    alert("Error fetching data! Please close this box and click reload to refresh the data");
                }
                this.setState({
                    allLocation: locations,
                    display: locations,
                    categories: uniqueNames
                })
            });
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
        // console.log(e.target.value)
        if(e.target.value !== "all") {
            var arr = this.state.allLocation.filter(function(object){
                return object["category"] === e.target.value;
            })
            // console.log(arr);
            this.setState({
                display: arr
            })
        } else {
            this.setState({
                display: this.state.allLocation
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
                <ListView filter={this.chooseType} categories={this.state.categories} locations={this.state.display}/>
                <h4>Filtered by country</h4>
                <button value={"all"} key={"all"} onClick={this.chooseType}>All countries</button>
                {this.state.categories.map((element)=>{
                    return(<button value={element} key={element} onClick={this.chooseType}>{element}</button>)
                })}
                <Map 
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    google = {this.props.google}
                    initialCenter={center}
                    zoom = {this.props.zoom}
                    onReady = {this.fetchPlaces}
                    onClick={this.onMapClicked}
                >
                    {this.state.display.map((element, index) => {
                        return (
                                <Marker key={element.id} review_count={element.review_count} phone={element.phone} address={element.address} position={element.coords} img={element.img} rating={element.rating} animation={this.props.google.maps.Animation.DROP} category={element.category} name={element.name} url={element.url} onClick={this.onMarkerClick}/>
                                )
                    })}

                    <InfoWindow 
                        style={{maxWidth: 200}}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div className="infoWindows">
                            <h4>{this.state.selectedPlace.name}</h4>
                            <h5>{this.state.selectedPlace.address}</h5>
                            <h5>Rating: {this.state.selectedPlace.rating} </h5>
                            <button className="btn btn-info">View Details</button>
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