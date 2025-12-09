import React from "react"

const POPULAR_CITIES = [
  // Cameroun
  "Yaoundé",
  "Douala",
  "Garoua",
  "Bamenda",
  "Bafoussam",
  // Afrique
  "Abidjan",
  "Lagos",
  "Dakar",
  "Nairobi",
  "Le Caire",
  "Johannesburg",
  "Casablanca",
  "Accra",
]

export default function PopularCities({ onSelect }: { onSelect: (city: string) => void }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold mb-4">Villes populaires</h2>
        <div className="grid grid-cols-2 gap-2">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => onSelect(city)}
              className="btn btn-sm btn-outline btn-primary hover:btn-primary"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
