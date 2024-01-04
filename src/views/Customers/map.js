import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationPin = ({ text }) => (
  <div className="pin">
    {/* <Icon icon={LocationOnIcon} className="pin-icon" /> */}
    <LocationOnIcon className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

function Map({ location, zoomLevel }) {
  return (
    <div className="google-map">
      <GoogleMapReact bootstrapURLKeys={{ key: '' }} defaultCenter={location} defaultZoom={zoomLevel}>
        <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
