import React from "react"

interface WeatherIconProps {
  iconUrl: string
  description?: string
  size?: "sm" | "md" | "lg"
}

export default function WeatherIcon({ iconUrl, description = "", size = "md" }: WeatherIconProps) {
  const sizeClass = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-24 h-24" : "w-16 h-16"
  return (
    <img
      src={iconUrl}
      alt={description}
      className={`inline-block ${sizeClass}`}
      loading="lazy"
      aria-label={description}
    />
  )
}
