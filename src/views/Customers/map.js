import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41] // size of the shadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({lat, lng, address, name}) {
  // console.log(lat, lng);
  const position = [lat, lng]; // latitude and longitude
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        className="rounded-md border border-gray-300 max-[600px]:w-24 w-36 max-[900px]:h-[225px] h-[153px]"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position}
          eventHandlers={{
            click: () => {
              setOpen(true);
              setTimeout(() => setOpen(false), 5000);
            }
          }}
        ></Marker>
      </MapContainer>
      {open && (
        <Tooltip title={name + ", " + address} open>
          <div />
        </Tooltip>
      )}
    </div>
  );
}

export default MapComponent;