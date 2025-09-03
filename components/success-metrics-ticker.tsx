"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, Award, GraduationCap } from "lucide-react"

const metrics = [
  { value: "2,847", label: "students passed JAMB this month", icon: GraduationCap, color: "text-blue-500" },
  { value: "15,432", label: "active learners this week", icon: Users, color: "text-green-500" },
  { value: "89%", label: "got into their first choice university", icon: Award, color: "text-yellow-500" },
  { value: "94%", label: "improved their scores by 40+ points", icon: TrendingUp, color: "text-purple-500" },
  { value: "1.2M+", label: "questions answered correctly", icon: Award, color: "text-orange-500" },
  { value: "78%", label: "achieved their target WAEC grades", icon: GraduationCap, color: "text-blue-500" },
]

export function SuccessMetricsTicker() {
  const [currentMetric, setCurrentMetric] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentMetric((prev) => (prev + 1) % metrics.length)
        setIsAnimating(false)
      }, 500)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  const metric = metrics[currentMetric]
  const Icon = metric.icon

  return (
    <div className="text-center">
      <div
        className={`transition-all duration-500 ${
          isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Icon className={`h-8 w-8 ${metric.color}`} />
          <span className="text-4xl font-bold text-gray-900">{metric.value}</span>
        </div>
        <p className="text-lg text-gray-600 font-medium">{metric.label}</p>
      </div>
    </div>
  )
}
