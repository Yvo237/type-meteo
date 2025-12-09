import React, { useState, useEffect } from "react"

interface SearchHistory {
  city: string
  timestamp: Date
  temperature?: number
  description?: string
}

export default function HistoryList() {
  const [history, setHistory] = useState<SearchHistory[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherHistory")
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory)
      setHistory(parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })))
    }
  }, [])

  const addToHistory = (city: string, weather?: any) => {
    const newEntry: SearchHistory = {
      city,
      timestamp: new Date(),
      temperature: weather?.temperature,
      description: weather?.description
    }

    const updatedHistory = [newEntry, ...history.slice(0, 9)]
    setHistory(updatedHistory)
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("weatherHistory")
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-lg font-semibold">Historique</h2>
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="btn btn-xs btn-ghost btn-error"
            >
              Effacer
            </button>
          )}
        </div>
        
        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucune recherche récente</p>
        ) : (
          <div className="space-y-2">
            {history.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-2 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div>
                  <div className="font-medium">{item.city}</div>
                  <div className="text-xs text-gray-500">
                    {item.timestamp.toLocaleTimeString("fr-FR", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </div>
                </div>
                {item.temperature && (
                  <div className="text-sm">
                    <span className="font-semibold">{item.temperature}°C</span>
                    <span className="text-xs text-gray-500 ml-1">
                      {item.description}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
