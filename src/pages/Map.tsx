import React, { useState, useEffect } from "react"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"
import { WeatherMap } from "../components/weather/WeatherMap"
import Card from "../components/ui/Card"
import Skeleton from "../components/ui/Skeleton"

interface MapMarker {
  position: [number, number]
  popup: string
  city: string
  temp: number
}

export default function Map() {
  const [selectedCity, setSelectedCity] = useState("")
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [center, setCenter] = useState<[number, number]>([3.848, 11.5021]) // Yaoundé par défaut
  const [zoom, setZoom] = useState(6)
  const { geocode } = useGeocoding()
  const { getWeather, weather, loading } = useWeather()

  useEffect(() => {
    // Géolocalisation automatique au chargement
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter([pos.coords.latitude, pos.coords.longitude])
          setZoom(10)
        },
        () => {
          // Garder Yaoundé par défaut si géoloc échoue
        }
      )
    }
  }, [])

  const handleSearch = async (city: string) => {
    if (!city.trim()) return
    try {
      const coords = await geocode(city)
      if (coords) {
        setCenter([coords.lat, coords.lon])
        setZoom(10)
        const result = await getWeather(coords.lat, coords.lon)
        if (result?.current) {
          const newMarker: MapMarker = {
            position: [coords.lat, coords.lon],
            popup: `${city}: ${result.current.temperature}°C - ${result.current.description}`,
            city,
            temp: result.current.temperature,
          }
          setMarkers([newMarker])
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addPopularCities = async () => {
    const cities = [
      { name: "Yaoundé", lat: 3.848, lon: 11.5021 },
      { name: "Douala", lat: 4.0511, lon: 9.7679 },
      { name: "Dakar", lat: 14.7167, lon: -17.4677 },
      { name: "Abidjan", lat: 5.35995, lon: -4.00826 },
      { name: "Lagos", lat: 6.5244, lon: 3.3792 },
    ]

    const newMarkers: MapMarker[] = []
    for (const city of cities) {
      try {
        const result = await getWeather(city.lat, city.lon)
        if (result?.current) {
          newMarkers.push({
            position: [city.lat, city.lon],
            popup: `${city.name}: ${result.current.temperature}°C - ${result.current.description}`,
            city: city.name,
            temp: result.current.temperature,
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
    setMarkers(newMarkers)
    if (newMarkers.length > 0) {
      setCenter([3.848, 11.5021]) // Centrer sur l'Afrique
      setZoom(5)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary font-semibold">Carte interactive</p>
        <h1 className="text-3xl font-black leading-tight">Météo sur la carte</h1>
        <p className="text-sm text-gray-500">
          Visualisez les conditions météo sur une carte interactive avec marqueurs.
        </p>
      </header>

      <Card className="border border-primary/20">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              className="input input-bordered input-primary"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(selectedCity)
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleSearch(selectedCity)}
            disabled={loading || !selectedCity.trim()}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Recherche...
              </>
            ) : (
              "Rechercher"
            )}
          </button>
          <button className="btn btn-outline btn-primary" onClick={addPopularCities}>
            Charger villes populaires
          </button>
        </div>
      </Card>

      {loading && markers.length === 0 && (
        <Skeleton className="h-96 w-full" />
      )}

      {!loading && (
        <Card className="border border-base-300/60 p-0 overflow-hidden">
          <div style={{ height: "500px", width: "100%" }}>
            <WeatherMap center={center} zoom={zoom} markers={markers.map((m) => ({
              position: m.position,
              popup: m.popup,
            }))} />
          </div>
        </Card>
      )}

      {markers.length > 0 && (
        <Card className="border border-base-300/60">
          <h3 className="font-semibold mb-3">
            {markers.length} marqueur{markers.length > 1 ? "s" : ""} sur la carte
          </h3>
          <div className="grid gap-2 text-sm">
            {markers.map((marker, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-base-200 rounded">
                <span className="font-medium">{marker.city}</span>
                <span className="text-primary font-bold">{marker.temp}°C</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {markers.length === 0 && !loading && (
        <Card className="border border-dashed border-base-300">
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3">🗺️</div>
            <p>Recherchez une ville ou chargez les villes populaires pour voir la météo sur la carte</p>
          </div>
        </Card>
      )}
    </div>
  )
}

