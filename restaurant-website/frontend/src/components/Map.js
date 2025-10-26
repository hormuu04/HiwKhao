import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ location, name }) => {
  if (!location || !location.latitude || !location.longitude) {
    return <div className="map-placeholder">ไม่มีข้อมูลพิกัดสำหรับแสดงแผนที่</div>;
  }

  const position = [location.latitude, location.longitude];

  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map; 