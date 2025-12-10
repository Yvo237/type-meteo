import React from "react"
import type { GeocodingResult } from "../services/geocodingApi"
import { useDebounce } from "../hooks/useDebounce"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  onSubmit?: (value: string) => void
  suggestions: GeocodingResult[]
  isLoading?: boolean
  onSelectSuggestion: (suggestion: GeocodingResult) => void
  onGeolocate?: () => void
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onSubmit,
  suggestions,
  isLoading = false,
  onSelectSuggestion,
  onGeolocate,
}: SearchBarProps) {
  const debouncedValue = useDebounce(value, 300)

  React.useEffect(() => {
    if (debouncedValue.trim()) {
      onSearch(debouncedValue)
    }
  }, [debouncedValue, onSearch])

  const handleSelect = (suggestion: GeocodingResult) => {
    onSelectSuggestion(suggestion)
  }

  return (
    <div className="w-full">
      <div className="form-control relative">
        <div className="join shadow-md shadow-primary/10 rounded-xl overflow-hidden border border-base-300/60 bg-base-100">
          <input
            type="text"
            placeholder="Rechercher une ville..."
            className="input input-bordered input-lg join-item w-full bg-base-100 text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            style={{ color: 'inherit' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit?.(value)
              }
            }}
          />
          {onGeolocate && (
            <button
              type="button"
              className="btn btn-primary join-item px-4"
              onClick={onGeolocate}
            >
              <span className="text-lg">📍</span>
            </button>
          )}
        </div>
        {(suggestions.length > 0 || isLoading) && (
          <div className="absolute left-0 right-0 top-full z-[100] bg-base-100 shadow-2xl rounded-xl w-full mt-2 border border-base-300 overflow-hidden backdrop-blur-xl max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="p-3 flex items-center gap-2 text-sm text-base-content">
                <span className="loading loading-spinner loading-xs" />
                Recherche...
              </div>
            )}
            {suggestions.map((s) => (
              <button
                key={`${s.name}-${s.lat}-${s.lon}`}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-base-200 transition-colors text-base-content"
                onClick={() => handleSelect(s)}
              >
                <div className="font-medium text-base-content">{s.name}</div>
                <div className="text-xs opacity-70 text-base-content/70">
                  {[s.state, s.country].filter(Boolean).join(", ")}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
