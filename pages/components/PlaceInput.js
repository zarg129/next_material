import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {useSelector, useDispatch} from 'react-redux';

export default function PlaceInput() {
  const address = useSelector(state => state.address);
  const dispatch = useDispatch();

  const setAddress = (data) => {
    geocodeByAddress(data)
      .then(results => getLatLng(results[0]))
      .then(latLng => setId(latLng))

    return dispatch({
      type: 'SET_ADDRESS',
      address: data,
    })
  }

  const setId = (data) => {
    return dispatch({
      type: 'SET_PLACE_ID',
      id: data,
    })
  }
  
  const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
    <div>
      <TextField label='Address' fullWidth {...getInputProps()} required={true} />
      <div >
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
          setId(getSuggestionItemProps(suggestion.active))
          const style = suggestion.active
            ? { backgroundColor: 'white', cursor: 'pointer',border: 'none', color: 'blue', fontWeigth: '700' }
            : { backgroundColor: '#ffffff', cursor: 'pointer', border: 'none' };
          
          return (<div {...getSuggestionItemProps(suggestion,{className,style})}>
            <span>{suggestion.description}</span> 
          </div>
          )
        })}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Place*
      </Typography>
      <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          searchOptions={{componentRestrictions: { country: ['ua'] }, types: ['address']}}
        >
          {renderFunc}
      </PlacesAutocomplete>
    </React.Fragment>
  );
}