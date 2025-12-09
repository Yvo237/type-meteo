import React from "react"
import type { GeocodingResult } from "../services/geocodingApi"

interface FavoritesProps {
  items: GeocodingResult[]
  onSelect: (city: GeocodingResult) => void
  onRemove: (city: GeocodingResult) => void
}

export default function Favorites({ items, onSelect, onRemove }: FavoritesProps) {
  if (items.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold mb-2">Favoris</h2>
          <p className="text-sm text-gray-500">Ajoutez vos villes préférées pour y accéder rapidement.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-lg font-semibold">Favoris</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((city) => (
            <div
              key={`${city.name}-${city.lat}-${city.lon}`}
              className="flex items-center justify-between px-3 py-2 bg-base-200 rounded-lg"
            >
              <button
                className="text-left"
                onClick={() => onSelect(city)}
              >
                <div className="font-semibold">{city.name}</div>
                <div className="text-xs opacity-70">
                  {[city.state, city.country].filter(Boolean).join(", ")}
                </div>
              </button>
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={() => onRemove(city)}
                aria-label={`Retirer ${city.name} des favoris`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

