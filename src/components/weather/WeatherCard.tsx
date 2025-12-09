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
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-secondary text-primary-content shadow-2xl border border-white/10">
      <div className="absolute inset-0 bg-white/10 blur-3xl opacity-30 pointer-events-none" />
      <div className="card-body relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="card-title text-2xl font-semibold">{title}</h2>
              {onToggleFavorite && (
                <button
                  onClick={onToggleFavorite}
                  className="btn btn-sm btn-ghost text-yellow-200 hover:text-yellow-300"
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  {isFavorite ? "★" : "☆"}
                </button>
              )}
            </div>
            <p className="text-sm opacity-90 capitalize">{description}</p>
            {lastUpdated && (
              <p className="text-xs opacity-80">MAJ : {lastUpdated}</p>
            )}
          </div>
          {icon && (
            <div className="p-2 rounded-xl bg-white/15 border border-white/15">
              <WeatherIcon iconUrl={icon} size="lg" description={description} />
            </div>
          )}
        </div>

        <div className="flex items-end gap-4">
          <div className="text-6xl font-black drop-shadow-sm">{formatTemperature(temperature)}</div>
          {feelsLike !== undefined && (
            <div className="text-sm opacity-90 mb-2">Ressenti {formatTemperature(feelsLike)}</div>
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
    <div className="bg-white/15 rounded-xl px-3 py-2 shadow-sm border border-white/10">
      <div className="text-xs opacity-90">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  )
}
