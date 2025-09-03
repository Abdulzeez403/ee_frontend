"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Coins, Flame, Users, TrendingUp } from "lucide-react"

const leaderboardData = {
  weekly: [
    { id: 1, name: "Adebayo Olamide", avatar: "/student-avatar-1.png", coins: 1250, streak: 12, rank: 1, change: "+2" },
    { id: 2, name: "Fatima Hassan", avatar: "/student-avatar-2.png", coins: 1180, streak: 8, rank: 2, change: "-1" },
    { id: 3, name: "Chinedu Okoro", avatar: "/student-avatar-3.png", coins: 1150, streak: 15, rank: 3, change: "+1" },
    { id: 4, name: "Aisha Mohammed", avatar: "/student-avatar-4.png", coins: 1100, streak: 6, rank: 4, change: "-2" },
    { id: 5, name: "Emeka Nwankwo", avatar: "/student-avatar-5.png", coins: 1050, streak: 9, rank: 5, change: "0" },
    { id: 6, name: "Blessing Adamu", avatar: "/student-avatar-6.png", coins: 980, streak: 4, rank: 6, change: "+3" },
    { id: 7, name: "Kemi Ogundimu", avatar: "/student-avatar-7.png", coins: 950, streak: 7, rank: 7, change: "-1" },
    { id: 8, name: "Ibrahim Yusuf", avatar: "/student-avatar-8.png", coins: 920, streak: 11, rank: 8, change: "+1" },
    { id: 9, name: "Grace Okafor", avatar: "/student-avatar-9.png", coins: 890, streak: 3, rank: 9, change: "-2" },
    { id: 10, name: "Tunde Bakare", avatar: "/student-avatar-10.png", coins: 850, streak: 5, rank: 10, change: "0" },
  ],
  monthly: [
    { id: 1, name: "Fatima Hassan", avatar: "/student-avatar-2.png", coins: 4250, streak: 28, rank: 1, change: "+1" },
    { id: 2, name: "Adebayo Olamide", avatar: "/student-avatar-1.png", coins: 4180, streak: 25, rank: 2, change: "-1" },
    { id: 3, name: "Chinedu Okoro", avatar: "/student-avatar-3.png", coins: 3950, streak: 22, rank: 3, change: "0" },
  ],
  allTime: [
    { id: 1, name: "Chinedu Okoro", avatar: "/student-avatar-3.png", coins: 15250, streak: 45, rank: 1, change: "0" },
    { id: 2, name: "Fatima Hassan", avatar: "/student-avatar-2.png", coins: 14800, streak: 38, rank: 2, change: "0" },
    { id: 3, name: "Adebayo Olamide", avatar: "/student-avatar-1.png", coins: 14200, streak: 35, rank: 3, change: "0" },
  ],
}

const currentUser = { id: 5, name: "Emeka Nwankwo", rank: 5 }

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("weekly")

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeColor = (change) => {
    if (change.startsWith("+")) return "text-green-600"
    if (change.startsWith("-")) return "text-red-600"
    return "text-gray-600"
  }

  const LeaderboardList = ({ data }) => (
    <div className="space-y-3">
      {data.map((student) => (
        <Card
          key={student.id}
          className={`transition-all duration-200 hover:shadow-md ${
            student.id === currentUser.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getRankIcon(student.rank)}
                  {student.id === currentUser.id && (
                    <Badge variant="secondary" className="text-xs">
                      You
                    </Badge>
                  )}
                </div>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-yellow-600" />
                      <span>{student.coins.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{student.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getChangeColor(student.change)}`}>
                  {student.change !== "0" && <TrendingUp className="w-4 h-4 inline mr-1" />}
                  {student.change === "0" ? "—" : student.change}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
            </div>
            <p className="text-gray-600">See how you rank against other students</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">#{currentUser.rank}</div>
              <div className="text-sm text-gray-600">Your Rank</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">+2</div>
              <div className="text-sm text-gray-600">This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="allTime">All Time</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly">
                <LeaderboardList data={leaderboardData.weekly} />
              </TabsContent>

              <TabsContent value="monthly">
                <LeaderboardList data={leaderboardData.monthly} />
              </TabsContent>

              <TabsContent value="allTime">
                <LeaderboardList data={leaderboardData.allTime} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
