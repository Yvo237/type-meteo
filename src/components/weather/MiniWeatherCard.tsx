import React from "react"
import WeatherIcon from "./WeatherIcon"
import { formatTemperature, formatHumidity, formatWindSpeed } from "../../utils/helpers"

interface MiniWeatherCardProps {
  title: string
  temperature: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  footer?: string
}

export default function MiniWeatherCard({
  title,
  temperature,
  description,
  icon,
  humidity,
  windSpeed,
  footer,
}: MiniWeatherCardProps) {
  return (
    <div className="p-4 rounded-xl border border-base-300/60 bg-base-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs opacity-70 capitalize">{description}</div>
        </div>
        <WeatherIcon iconUrl={icon} size="sm" description={description} />
      </div>
      <div className="text-3xl font-bold mt-2">{formatTemperature(temperature)}</div>
      <div className="text-xs opacity-70 mt-1 flex gap-3">
        <span>{formatHumidity(humidity)}</span>
        <span>{formatWindSpeed(windSpeed)}</span>
      </div>
      {footer && <div className="text-xs mt-2 opacity-80">{footer}</div>}
    </div>
  )
}

