"use client"

import { Coins } from "lucide-react"
import { useState, useEffect } from "react"

interface CoinAnimationProps {
  amount: number
  onComplete?: () => void
}

export function CoinAnimation({ amount, onComplete }: CoinAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-bounce">
        <div className="bg-yellow-400 rounded-full p-4 shadow-lg">
          <Coins className="w-8 h-8 text-yellow-800" />
        </div>
        <div className="text-center mt-2">
          <span className="bg-white px-3 py-1 rounded-full shadow-lg font-semibold text-yellow-800">
            +{amount} coins!
          </span>
        </div>
      </div>
    </div>
  )
}
