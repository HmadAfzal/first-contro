"use client"

import { RefreshCw } from "lucide-react"
import { useState } from "react"

interface RefreshButtonI {
  onClick: () => void
  isLoading: boolean
}

export default function RefreshButton(props: RefreshButtonI) {
  const { onClick, isLoading } = props
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={isLoading}
        aria-label="Refresh issues"
        className={`rounded-md bg-[#21262d] text-[#c9d1d9] py-2 px-3 border border-[#30363d] hover:bg-[#30363d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#0d1117] ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#161b22] text-[#c9d1d9] text-xs rounded border border-[#30363d] whitespace-nowrap">
          {isLoading ? "Refreshing..." : "Refresh issues"}
        </div>
      )}
    </div>
  )
}

