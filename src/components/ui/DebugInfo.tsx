import React from "react"

interface DebugInfoProps {
  errors?: string[]
  warnings?: string[]
  info?: string[]
}

export default function DebugInfo({ errors = [], warnings = [], info = [] }: DebugInfoProps) {
  if (errors.length === 0 && warnings.length === 0 && info.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-md space-y-2">
      {errors.length > 0 && (
        <div className="bg-red-500/90 text-white p-3 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="font-bold mb-1">Erreurs:</div>
          {errors.map((error, i) => (
            <div key={i} className="text-sm">• {error}</div>
          ))}
        </div>
      )}
      {warnings.length > 0 && (
        <div className="bg-orange-500/90 text-white p-3 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="font-bold mb-1">Avertissements:</div>
          {warnings.map((warning, i) => (
            <div key={i} className="text-sm">• {warning}</div>
          ))}
        </div>
      )}
      {info.length > 0 && (
        <div className="bg-blue-500/90 text-white p-3 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="font-bold mb-1">Info:</div>
          {info.map((item, i) => (
            <div key={i} className="text-sm">• {item}</div>
          ))}
        </div>
      )}
    </div>
  )
}
