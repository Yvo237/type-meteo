import React from "react"
import type { Coordinates } from "../services/geocodingApi"

export interface SearchHistory {
  city: string
  timestamp: string
  temperature?: number
  description?: string
  coordinates?: Coordinates
}

interface HistoryListProps {
  items: SearchHistory[]
  onSelect: (item: SearchHistory) => void
  onClear: () => void
}

export default function HistoryList({ items, onSelect, onClear }: HistoryListProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-lg font-semibold">Historique</h2>
          {items.length > 0 && (
            <button 
              onClick={onClear}
              className="btn btn-xs btn-ghost btn-error"
            >
              Effacer
            </button>
          )}
        </div>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune recherche récente</p>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <button
                key={`${item.city}-${index}`}
                onClick={() => onSelect(item)}
                className="w-full flex justify-between items-center p-2 bg-base-200 rounded-lg hover:bg-base-300 transition-colors text-left"
              >
                <div>
                  <div className="font-medium">{item.city}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString("fr-FR", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </div>
                </div>
                {item.temperature !== undefined && (
                  <div className="text-sm">
                    <span className="font-semibold">{item.temperature}°C</span>
                    <span className="text-xs text-gray-500 ml-1">
                      {item.description}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
