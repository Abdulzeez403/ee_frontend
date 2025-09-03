"use client"

import { useState, useEffect } from "react"
import { Coins } from "lucide-react"

export function InteractiveCoinCounter() {
  const [coins, setCoins] = useState(1247)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 15) + 5 // Random 5-20 coins
      setCoins((prev) => prev + increment)
      setIsAnimating(true)

      setTimeout(() => setIsAnimating(false), 600)
    }, 3000) // Every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-2 rounded-full font-semibold shadow-lg">
      <Coins className={`w-5 h-5 transition-transform duration-300 ${isAnimating ? "scale-125 rotate-12" : ""}`} />
      <span className={`transition-all duration-300 ${isAnimating ? "scale-110" : ""}`}>
        {coins.toLocaleString()} coins
      </span>
      {isAnimating && (
        <div className="absolute -top-2 -right-2 text-green-600 font-bold text-sm animate-bounce">
          +{Math.floor(Math.random() * 15) + 5}
        </div>
      )}
    </div>
  )
}
