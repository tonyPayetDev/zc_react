import {GoogleApiWrapper } from 'google-maps-react';
import GoogleMaps from './components/GoogleMaps';
import SearchLocationInput from './components/SearchLocationInput';
import React, { useState, useEffect } from 'react';
import * as APIConfig from './constants/APIConfig'
import Select from 'react-select'

  
const App = () => {
  const [state, updateState] = React.useState({
    lat: -21,
    lng: 55.5,
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},

  })

  const [cars, setCars] = useState();
  const [selectedSort, setSelectedSort] = useState()
  const [search, setSearch] = useState("");
  const [searchAddress, setSearchddress] = useState("");
  const [optionsMoto, setOptionsMoto] = useState([
  ]);
  const [options, setOptions] = useState([
  ]);
    const [optionsAdrr, setOptionsAdrr] = useState([
  ]);

  useEffect(() => {
      APIConfig.getItems().then(data => setCars(data));
    }, []);

  useEffect(() => {
      APIConfig.getItemsType().then(data => setOptions(data));
    }, []);

  useEffect(() => {
      APIConfig.getItemsMoto().then(data => setOptionsMoto(data));
    }, []);


    // filter 
   useEffect((props) => {

    if(search && searchAddress == ""  ){
     setSelectedSort(
         cars.filter(cars => cars.type ==  search.value ).map(cars=>cars)
       );    
     }
     
    else if(search  == ""  && searchAddress ){
     setSelectedSort(
         cars.filter(cars =>  cars.id  == searchAddress.value ).map(cars=>cars)
       );    
     }
    else if(search && searchAddress ){
      setSelectedSort(
         cars.filter(cars => cars.type  ==  search.value &&  cars.id  ==  searchAddress.value).map(cars=>cars)
       );    

     }
     else{
       if(cars){

        const adresse= cars.map((a) => {
          return {"value":a.id,"label":a.adresse} 
         });
        setOptionsAdrr(adresse);
       }

       setSelectedSort(cars);    
     }
  
  }, [search,searchAddress, cars]);

  return (
      <div class="container">
      <h3>Recherche une voiture a proximité</h3>

      <SearchLocationInput  state={state}  updateState={updateState} ></SearchLocationInput>

      <div class="row justify-content-center m-4">
              <div class="col-6">
                <h6>Filtrer</h6>
              </div>
                <div class="col-2">
                <Select placeholder={<div>Type de voiture</div>} options={options}  onChange={(e) => setSearch(e)} />
              </div>
              <div class="col-2">
                <Select  placeholder={<div>Adresse</div>} options={optionsAdrr} onChange={(e) => setSearchddress(e)} />
              </div>
              <div class="col-2">
               <Select  placeholder={<div>Motorisation</div>} options={optionsMoto} />
              </div>
            
      </div>

      <GoogleMaps  options={options} motorisation={optionsMoto}   latitude={state.lat} longitude={state.lng} cars={selectedSort} ></GoogleMaps>

    </div>)
};

export default GoogleApiWrapper({
  apiKey: APIConfig.KEY_MAP
})(App);
