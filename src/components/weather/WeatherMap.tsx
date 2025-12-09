import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in react-leaflet
delete (window as any).L.Icon.Default.prototype._getIconUrl;
(window as any).L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

interface WeatherMapProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
  }>;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ 
  center, 
  zoom, 
  markers = [] 
}) => {
  const MapComponent = MapContainer as any;
  const TileComponent = TileLayer as any;
  const MarkerComponent = Marker as any;
  const PopupComponent = Popup as any;

  return (
    <MapComponent
      center={center}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
    >
      <TileComponent
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <MarkerComponent key={index} position={marker.position}>
          {marker.popup && <PopupComponent>{marker.popup}</PopupComponent>}
        </MarkerComponent>
      ))}
    </MapComponent>
  );
};