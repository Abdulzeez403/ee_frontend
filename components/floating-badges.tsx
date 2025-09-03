"use client"

import { useState } from "react"
import { Trophy, Star, Zap, Target, BookOpen, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const badges = [
  { icon: Trophy, label: "Quiz Master", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { icon: Star, label: "7-Day Streak", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { icon: Zap, label: "Speed Demon", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { icon: Target, label: "Perfect Score", color: "bg-green-100 text-green-800 border-green-200" },
  { icon: BookOpen, label: "Study Buddy", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { icon: Award, label: "Top 10", color: "bg-red-100 text-red-800 border-red-200" },
]

export function FloatingBadges() {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)

  return (
    <div className="absolute inset-0 pointer-events-none">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        const positions = [
          "top-4 left-8",
          "top-12 right-12",
          "top-20 left-16",
          "bottom-16 right-8",
          "bottom-8 left-12",
          "bottom-20 right-16",
        ]

        return (
          <div
            key={index}
            className={`absolute ${positions[index]} pointer-events-auto transition-all duration-500 ${
              hoveredBadge === index ? "scale-110 z-10" : "hover:scale-105"
            }`}
            onMouseEnter={() => setHoveredBadge(index)}
            onMouseLeave={() => setHoveredBadge(null)}
            style={{
              animationDelay: `${index * 0.5}s`,
              animation: `float 3s ease-in-out infinite`,
            }}
          >
            <Badge className={`${badge.color} shadow-lg cursor-pointer flex items-center gap-1 px-3 py-1`}>
              <Icon className="w-3 h-3" />
              <span className="text-xs font-medium">{badge.label}</span>
            </Badge>
          </div>
        )
      })}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
