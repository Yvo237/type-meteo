import React from "react"
import type { WeatherData } from "../../types"
import WeatherIcon from "./WeatherIcon"
import { formatHumidity, formatPressure, formatTemperature, formatWindSpeed } from "../../utils/helpers"

interface WeatherCardProps extends WeatherData {
  title: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
  lastUpdated?: string
}

export default function WeatherCard({
  title,
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
  pressure,
  feelsLike,
  visibility,
  isFavorite,
  onToggleFavorite,
  lastUpdated,
}: WeatherCardProps) {
  // Dynamic gradient based on weather conditions
  const getWeatherGradient = () => {
    const desc = description?.toLowerCase() || ""
    if (desc.includes("rain") || desc.includes("pluie")) return "from-slate-700/40 via-blue-600/30 to-slate-800/50"
    if (desc.includes("sun") || desc.includes("soleil") || desc.includes("clear")) return "from-amber-400/30 via-orange-500/25 to-yellow-600/40"
    if (desc.includes("cloud") || desc.includes("nuage")) return "from-gray-600/30 via-slate-500/25 to-gray-700/40"
    if (desc.includes("snow") || desc.includes("neige")) return "from-blue-100/40 via-white/30 to-gray-200/50"
    return "from-primary/30 via-blue-500/25 to-secondary/40"
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getWeatherGradient()} backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]`}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="card-body relative space-y-6 p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight">{title}</h2>
              {onToggleFavorite && (
                <button
                  onClick={onToggleFavorite}
                  className="btn btn-sm btn-ghost text-white/80 hover:text-yellow-300 hover:bg-white/20 transition-all duration-300 rounded-xl"
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <span className="text-2xl filter drop-shadow-sm">{isFavorite ? "★" : "☆"}</span>
                </button>
              )}
            </div>
            <p className="text-white/90 text-lg capitalize font-medium drop-shadow">{description}</p>
            {lastUpdated && (
              <p className="text-white/70 text-sm font-light">MAJ : {lastUpdated}</p>
            )}
          </div>
          {icon && (
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl transition-all duration-300 hover:bg-white/30 hover:scale-105 animate-float">
              <WeatherIcon iconUrl={icon} size="lg" description={description} />
            </div>
          )}
        </div>

        <div className="flex items-end gap-6">
          <div className="text-7xl font-black text-white drop-shadow-lg tracking-tight">{formatTemperature(temperature)}</div>
          {feelsLike !== undefined && (
            <div className="text-white/85 text-lg font-medium mb-3 drop-shadow">Ressenti {formatTemperature(feelsLike)}</div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="Humidité" value={formatHumidity(humidity)} />
          <Stat label="Vent" value={formatWindSpeed(windSpeed)} />
          {pressure !== undefined && <Stat label="Pression" value={formatPressure(pressure)} />}
          {visibility !== undefined && <Stat label="Visibilité" value={`${visibility} km`} />}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-white/20 transition-all duration-300 hover:bg-white/25 hover:scale-105 hover:shadow-xl">
      <div className="text-white/80 text-xs font-medium uppercase tracking-wider">{label}</div>
      <div className="text-white font-bold text-lg mt-1 drop-shadow">{value}</div>
    </div>
  )
}
