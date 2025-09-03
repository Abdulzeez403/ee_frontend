"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const successStories = [
  {
    name: "Adebayo Ogundimu",
    exam: "JAMB 2024",
    score: "342/400",
    university: "University of Lagos",
    course: "Medicine",
    avatar: "/student-avatar-1.png",
    quote: "ExamPrep+ made studying fun! The coin system kept me motivated every day.",
    improvement: "+89 points",
  },
  {
    name: "Chioma Nwankwo",
    exam: "WAEC 2024",
    score: "8 A1s",
    university: "Covenant University",
    course: "Engineering",
    avatar: "/student-avatar-1.png",
    quote: "The interactive quizzes helped me understand concepts I struggled with.",
    improvement: "5 grade improvement",
  },
  {
    name: "Ibrahim Musa",
    exam: "NECO 2024",
    score: "7 A1s, 2 B2s",
    university: "Ahmadu Bello University",
    course: "Computer Science",
    avatar: "/student-avatar-1.png",
    quote: "Best decision I made was joining ExamPrep+. Worth every coin earned!",
    improvement: "4 grade improvement",
  },
  {
    name: "Fatima Abdullahi",
    exam: "JAMB 2024",
    score: "356/400",
    university: "University of Ibadan",
    course: "Law",
    avatar: "/student-avatar-1.png",
    quote: "The streak system kept me consistent. I studied every single day!",
    improvement: "+112 points",
  },
]

export function StudentSuccessStories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {successStories.map((story, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
            hoveredIndex === index
              ? "border-blue-500 shadow-lg scale-105 z-10"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="text-center">
            <Avatar className="h-16 w-16 mx-auto mb-3">
              <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
              <AvatarFallback>
                {story.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{story.name}</h4>
            <Badge variant="secondary" className="text-xs mb-2">
              {story.exam}
            </Badge>
            <div className="space-y-1">
              <p className="text-lg font-bold text-blue-600">{story.score}</p>
              <p className="text-xs text-gray-600">{story.university}</p>
              <p className="text-xs font-medium text-green-600">{story.improvement}</p>
            </div>
          </div>

          {/* Hover overlay with quote */}
          {hoveredIndex === index && (
            <div className="absolute inset-0 bg-blue-600 text-white rounded-xl p-4 flex flex-col justify-center items-center transition-all duration-300">
              <Quote className="h-6 w-6 mb-2 opacity-50" />
              <p className="text-sm text-center italic mb-3">"{story.quote}"</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
