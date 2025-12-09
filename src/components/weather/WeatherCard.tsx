import React from "react"
import type { WeatherData } from "../../types"
import WeatherIcon from "./WeatherIcon"
import { formatHumidity, formatPressure, formatTemperature, formatWindSpeed } from "../../utils/helpers"

interface WeatherCardProps extends WeatherData {
  title: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
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
}: WeatherCardProps) {
  return (
    <div className="card w-full bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl transition-transform duration-300 hover:-translate-y-1">
      <div className="card-body space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="card-title text-2xl font-semibold">{title}</h2>
              {onToggleFavorite && (
                <button
                  onClick={onToggleFavorite}
                  className="btn btn-sm btn-ghost text-yellow-300"
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  {isFavorite ? "★" : "☆"}
                </button>
              )}
            </div>
            <p className="text-sm opacity-80 capitalize">{description}</p>
          </div>
          {icon && <WeatherIcon iconUrl={icon} size="lg" description={description} />}
        </div>
        <div className="flex items-end gap-4">
          <div className="text-6xl font-bold">{formatTemperature(temperature)}</div>
          {feelsLike !== undefined && (
            <div className="text-sm opacity-80 mb-2">Ressenti {formatTemperature(feelsLike)}</div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
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
    <div className="bg-white/15 rounded-lg px-3 py-2 shadow-sm">
      <div className="text-xs opacity-80">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  )
}
