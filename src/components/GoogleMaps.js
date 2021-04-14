import React from 'react';

import { Map , InfoWindow, Marker} from 'google-maps-react';
import InfoContent from './InfoContent.js';
import Icon from '../images/car.png';
import * as APIConfig from '../constants/APIConfig'

const infoWindow = {
  color: 'red'
};

const GoogleMaps = ({ latitude, longitude ,cars ,options,motorisation}) => {

        let renderMarkers;
  const [state, setState] = React.useState({
    lat: -21,
    lng: 55.5,
    stores: [],
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {marque:"",motorisation:"",model:""},

  })
  const onMarkerClick = (props, marker, e) =>
  setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  const onClose = props => {
    if (state.showingInfoWindow) {
      setState({
        selectedPlace: "",
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  if(cars){

 renderMarkers= cars.map((data,index)=>{
    const type=options.filter(options => options.value ===  data.type ).map(options=>options.label)[0];
    const moto=motorisation.filter(motorisation => motorisation.value ===  data.motorisation ).map(motorisation=>motorisation.label)[0];

    return  <Marker
              icon={{
                width:"10%",
              url:Icon,
              anchor: window.google.maps.Point(16,16),
              scaledSize: window.google.maps.Size(32,32)
            }}
             key={index} id={index} position={{
                         lat: data.latitude,
                         lng: data.longitude
             }}
             title={data.marque+" "+data.model }
             name={{marque:data.marque,motorisation:moto ,type:type  ,model:data.model , img :data.photo ,adresse :data.adresse}}
             color="red"
             onClick={onMarkerClick}
                    />
    });
  }


 return (

    <Map  style={{width:'90%',height:"70%"}}
          google={window.google} 
          zoom={APIConfig.Zoom}     
          center={{ lat: latitude, lng: longitude }}
      >    
       {renderMarkers}

        <InfoWindow
          marker={state.activeMarker}
          visible={state.showingInfoWindow}
          style={infoWindow}
          onClose={onClose}>
              <InfoContent name={state.selectedPlace.name}> </InfoContent>
        </InfoWindow>
      </Map>
 );
};

export default GoogleMaps;