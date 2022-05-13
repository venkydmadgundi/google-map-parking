import React, { useState } from 'react';
// import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as parkData from 'parking.json'

function Map() {
  const [selectedPark, setSelectedPark] = useState(null); 
  console.log(selectedPark);
  return (
    <GoogleMap 
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      {parkData.features.map((p) => (
        <Marker 
          key={p.properties.PARK_ID} 
          position={{
             lat: p.geometry.coordinates[1], 
             lng: p.geometry.coordinates[0] 
            }} 
          onClick={()=> {
            setSelectedPark(p)
          }}    
        />
      ))}

      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.geometry.coordinates[1] ,
            lng: selectedPark.geometry.coordinates[0]
          }}
          onCloseClick={()=> {setSelectedPark(null)}}
          >
           
            <div>park details</div>
        </InfoWindow>
      )}
      </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCpM9Lu-TpVfDH1VSvOwbUmzYJl7fe1pHs`}
        loadingElement={<div style={{ height: "100%" }}></div>}
        containerElement={<div style={{ height: "100%" }}></div>}
        mapElement={<div style={{ height: "100%" }}></div>}
      />
    </div>
  );
}

export default App;
