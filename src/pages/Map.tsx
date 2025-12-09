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
      console.error('Erreur recherche:', err)
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
    <div className="container mx-auto px-4 py-12 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-md border border-white/20">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Carte interactive
          </span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-white drop-shadow-2xl">
            Météo sur la carte
          </h1>
          <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            Visualisez les conditions météo sur une carte interactive avec marqueurs géolocalisés en temps réel.
          </p>
        </div>
      </header>

      {/* Search Controls */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/10 transition-shadow duration-500">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher une ville sur la carte..."
              className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(selectedCity)
                }
              }}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg whitespace-nowrap"
              onClick={() => handleSearch(selectedCity)}
              disabled={loading || !selectedCity.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Recherche...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  🔍 Rechercher
                </span>
              )}
            </button>
            
            <button 
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
              onClick={addPopularCities}
            >
              <span className="flex items-center gap-2">
                🌍 Villes populaires
              </span>
            </button>
          </div>
        </div>
      </Card>

      {/* Map Container */}
      {loading && markers.length === 0 && (
        <div className="rounded-3xl overflow-hidden">
          <Skeleton className="h-[600px] w-full" />
        </div>
      )}

      {!loading && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-0">
          <div style={{ height: "600px", width: "100%" }} className="relative">
            <WeatherMap 
              center={center} 
              zoom={zoom} 
              markers={markers.map((m) => ({
                position: m.position,
                popup: m.popup,
              }))} 
            />
          </div>
        </Card>
      )}

      {/* Markers Summary */}
      {markers.length > 0 && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">📍</span>
              Marqueurs actifs
            </h3>
            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
              <span className="text-white font-bold">
                {markers.length} ville{markers.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          
          <div className="grid gap-3">
            {markers.map((marker, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                    📍
                  </span>
                  <span className="font-semibold text-white text-lg">
                    {marker.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-white">
                    {marker.temp}°C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {markers.length === 0 && !loading && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-white/20 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5"></div>
          <div className="relative text-center py-24 px-6">
            <div className="text-8xl mb-6 animate-bounce">🗺️</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Explorez la météo mondiale
            </h3>
            <p className="text-lg text-white/70 font-light max-w-md mx-auto">
              Recherchez une ville ou chargez les villes populaires pour visualiser la météo sur la carte interactive.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}