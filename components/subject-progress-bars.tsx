"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

const subjects = [
  { name: "Mathematics", progress: 78, color: "bg-blue-500" },
  { name: "English", progress: 85, color: "bg-green-500" },
  { name: "Physics", progress: 62, color: "bg-purple-500" },
  { name: "Chemistry", progress: 71, color: "bg-orange-500" },
]

export function SubjectProgressBars() {
  const [animatedProgress, setAnimatedProgress] = useState(subjects.map(() => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(subjects.map((subject) => subject.progress))
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4 w-full max-w-sm">
      <h3 className="font-heading font-semibold text-lg text-center text-gray-800">Your Progress</h3>
      {subjects.map((subject, index) => (
        <div key={subject.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{subject.name}</span>
            <span className="text-gray-600">{subject.progress}%</span>
          </div>
          <Progress
            value={animatedProgress[index]}
            className="h-2"
            style={{
              transition: `all 1s ease-in-out ${index * 0.2}s`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
