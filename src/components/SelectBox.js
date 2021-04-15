import React, { useState, useEffect } from 'react';
import Select from 'react-select'

const SelectBox = (props) => {
    const { options ,optionsMoto,setSelectedSort,cars} = props; 
    const [search, setSearch] = useState("");
    const [searchAddress, setSearchddress] = useState("");

    const [optionsAdrr, setOptionsAdrr] = useState([
    ]);
    console.log(cars);
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
    );
  };

  export default SelectBox;