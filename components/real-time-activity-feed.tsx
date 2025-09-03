"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Coins, Trophy, Zap, BookOpen } from "lucide-react"

const activities = [
  {
    name: "Adebayo O.",
    action: "earned 50 coins",
    icon: Coins,
    color: "text-yellow-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Chioma N.",
    action: "completed Physics quiz",
    icon: BookOpen,
    color: "text-blue-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Ibrahim K.",
    action: "achieved 7-day streak",
    icon: Zap,
    color: "text-orange-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Fatima A.",
    action: "won weekly challenge",
    icon: Trophy,
    color: "text-green-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Emeka C.",
    action: "earned 75 coins",
    icon: Coins,
    color: "text-yellow-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Blessing M.",
    action: "completed Math quiz",
    icon: BookOpen,
    color: "text-blue-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Yusuf D.",
    action: "achieved 14-day streak",
    icon: Zap,
    color: "text-orange-500",
    avatar: "/student-avatar-1.png",
  },
  {
    name: "Grace I.",
    action: "redeemed study guide",
    icon: Trophy,
    color: "text-green-500",
    avatar: "/student-avatar-1.png",
  },
]

export function RealTimeActivityFeed() {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const activity = activities[currentActivity]
  const Icon = activity.icon

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.name} />
          <AvatarFallback>
            {activity.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${activity.color}`} />
          <span className="text-sm font-medium text-gray-900">
            <span className="font-semibold">{activity.name}</span> {activity.action}
          </span>
        </div>
        <Badge variant="secondary" className="text-xs">
          Live
        </Badge>
      </div>
    </div>
  )
}
