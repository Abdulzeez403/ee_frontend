"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, TrendingUp, Award, Users } from "lucide-react"

const admissionStats = [
  { university: "University of Lagos", rate: 89, students: 234 },
  { university: "University of Ibadan", rate: 92, students: 187 },
  { university: "Covenant University", rate: 94, students: 156 },
  { university: "Ahmadu Bello University", rate: 87, students: 203 },
]

export function UniversityAdmissionStats() {
  const [animatedRates, setAnimatedRates] = useState(admissionStats.map(() => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      admissionStats.forEach((stat, index) => {
        setTimeout(() => {
          setAnimatedRates((prev) => {
            const newRates = [...prev]
            newRates[index] = stat.rate
            return newRates
          })
        }, index * 200)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const overallRate = Math.round(admissionStats.reduce((acc, stat) => acc + stat.rate, 0) / admissionStats.length)
  const totalStudents = admissionStats.reduce((acc, stat) => acc + stat.students, 0)

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">University Admission Success</h3>
        </div>
        <p className="text-gray-600">Our students' admission rates to top Nigerian universities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="h-6 w-6 text-yellow-500" />
            <span className="text-3xl font-bold text-blue-600">{overallRate}%</span>
          </div>
          <p className="text-sm text-gray-600">Overall admission rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-6 w-6 text-green-500" />
            <span className="text-3xl font-bold text-green-600">{totalStudents}</span>
          </div>
          <p className="text-sm text-gray-600">Students admitted this year</p>
        </div>
      </div>

      <div className="space-y-4">
        {admissionStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{stat.university}</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-bold text-green-600">{animatedRates[index]}%</span>
              </div>
            </div>
            <Progress value={animatedRates[index]} className="h-2 mb-1" />
            <p className="text-xs text-gray-500">{stat.students} students admitted</p>
          </div>
        ))}
      </div>
    </div>
  )
}
