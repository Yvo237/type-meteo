import React from "react"
import type { WeatherData } from "../../types"

interface WeatherCardProps extends WeatherData {
  title: string
}

export default function WeatherCard({ title, temperature, description, icon, humidity, windSpeed }: WeatherCardProps) {
  return (
    <div className="card w-full max-w-md bg-gradient-to-br from-secondary to-primary text-primary-content shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-2xl font-semibold">{title}</h2>
          {icon && <img src={icon} alt={description} className="w-16 h-16" />}
        </div>
        <div className="mt-4 text-5xl font-bold">{temperature}°C</div>
        <div className="mt-3 flex justify-between text-lg opacity-90">
          <span>💧 {humidity}%</span>
          <span>💨 {windSpeed} km/h</span>
        </div>
        <div className="mt-2 text-base-content/80 text-sm">{description}</div>
      </div>
    </div>
  )
}
