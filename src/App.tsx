import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix pour icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const OPEN_CAGE_KEY = "41cc25f722dd4dc4ad724a5274723590";

type Coords = {
  lat: number;
  lon: number;
};

type Weather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
};

type ChangeViewProps = {
  center: [number, number];
};

//  Composant pour recentrer dynamiquement la carte
function ChangeView({ center }: ChangeViewProps): null {
  const map = useMap();
  map.setView(center);
  return null;
}

function App() {
  const [city, setCity] = useState<string>("Douala");
  const [coords, setCoords] = useState<Coords>({ lat: 4.0511, lon: 9.7679 });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  // Charger la météo dès que les coordonnées changent
  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather));
  }, [coords]);

  // Détection de saisie automatique dans le champ avec délai
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!city.trim()) return;

      const fetchCoords = async () => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPEN_CAGE_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setCoords({ lat, lon: lng });

          setHistory((prev) =>
            prev.includes(city) ? prev : [city, ...prev].slice(0, 10)
          );
        }
      };

      fetchCoords();
    }, 1000); // ⏳ délai de 1 seconde

    return () => clearTimeout(timeout);
  }, [city]);

  const getWeatherIcon = (temp: number): string => {
    if (temp < 5) return "❄️";
    if (temp < 15) return "🌥️";
    if (temp < 25) return "⛅";
    return "☀️";
  };

  const handleHistoryClick = (ville: string) => {
    setCity(ville);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Météo en temps réel 🌍</h1>

      {/* Champ de recherche sans bouton */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Entrer une ville"
        style={{ padding: "0.5rem", fontSize: "1rem", width: "300px" }}
      />

{weather && (
  <>
    <div className="weather-box">
      <h2>{city}</h2>
      <p>
        {getWeatherIcon(weather.temperature)} Température : {weather.temperature}°C
      </p>
      <p>💨 Vent : {weather.windspeed} km/h</p>
      <p>🧭 Direction du vent : {weather.winddirection}°</p>
    </div>

    <div className="map-wrapper">
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={10}
        style={{ height: "400px", width: "100%" }}
      >
        <ChangeView center={[coords.lat, coords.lon]} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[coords.lat, coords.lon]}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  </>
)}
     {/* Historique */}
      {history.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Historique :</h3>
          <ul>
            {history.map((ville, i) => (
              <li
                key={i}
                onClick={() => handleHistoryClick(ville)}
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                  marginBottom: "4px",
                }}
              >
                {ville}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
