import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function SearchLocationInput({ state, updateState }) {
  console.log(state);
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div class="row justify-content-center m-4">
              <div class="col-4">
                <label for="formGroupExampleInput">
                  Lieux de prise en charge
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  {...getInputProps({ placeholder: "Saisir une adresse" })}
                />
              </div>
              <div class="col-4">
                <button
                  class="btn btn-success  mt-4"
                  onClick={() =>
                    updateState({
                      lat: coordinates.lat,
                      lng: coordinates.lng,
                    })
                  }
                >
                  Rechercher
                </button>
              </div>
            </div>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#32B298" : "#fff",
                  color: "#252525",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
