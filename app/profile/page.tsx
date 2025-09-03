"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Coins, Flame, Trophy, BookOpen, Target, Calendar, TrendingUp, CheckCircle, Edit3 } from "lucide-react"

const userProfile = {
  name: "Emeka Nwankwo",
  email: "emeka.nwankwo@email.com",
  avatar: "/student-avatar-5.png",
  joinDate: "March 2024",
  location: "Lagos, Nigeria",
  school: "Government College Lagos",
  examTarget: "JAMB 2024",
}

const userStats = {
  totalCoins: 2450,
  currentStreak: 9,
  longestStreak: 23,
  quizzesCompleted: 127,
  averageScore: 78,
  studyHours: 45,
  rank: 5,
  totalStudents: 2847,
}

const achievements = [
  { id: 1, name: "First Quiz", description: "Complete your first quiz", icon: "🎯", earned: true, date: "Mar 15" },
  { id: 2, name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", earned: true, date: "Mar 22" },
  { id: 3, name: "Coin Collector", description: "Earn 1000 coins", icon: "🪙", earned: true, date: "Apr 2" },
  { id: 4, name: "Perfect Score", description: "Get 100% on a quiz", icon: "⭐", earned: true, date: "Apr 8" },
  { id: 5, name: "Study Streak", description: "Maintain a 30-day streak", icon: "📚", earned: false, progress: 9 },
  { id: 6, name: "Top 10", description: "Reach top 10 on leaderboard", icon: "🏆", earned: false, progress: 5 },
]

const recentActivity = [
  { id: 1, type: "quiz", subject: "Mathematics", score: 85, coins: 25, date: "2 hours ago" },
  { id: 2, type: "streak", days: 9, date: "Today" },
  { id: 3, type: "quiz", subject: "English", score: 92, coins: 30, date: "Yesterday" },
  { id: 4, type: "achievement", name: "Perfect Score", date: "2 days ago" },
  { id: 5, type: "quiz", subject: "Physics", score: 76, coins: 20, date: "3 days ago" },
]

const subjectProgress = [
  { subject: "Mathematics", completed: 45, total: 60, percentage: 75, averageScore: 82 },
  { subject: "English", completed: 38, total: 50, percentage: 76, averageScore: 88 },
  { subject: "Physics", completed: 32, total: 55, percentage: 58, averageScore: 74 },
  { subject: "Chemistry", completed: 28, total: 50, percentage: 56, averageScore: 79 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type) => {
    switch (type) {
      case "quiz":
        return <BookOpen className="w-4 h-4 text-blue-600" />
      case "streak":
        return <Flame className="w-4 h-4 text-orange-500" />
      case "achievement":
        return <Trophy className="w-4 h-4 text-yellow-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                <AvatarFallback className="text-xl">EN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                <p className="text-gray-600">{userProfile.school}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {userProfile.examTarget}
                  </Badge>
                  <span className="text-sm text-gray-500">Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats.totalCoins.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Coins</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{userStats.quizzesCompleted}</div>
                  <div className="text-sm text-gray-600">Quizzes Done</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">#{userStats.rank}</div>
                  <div className="text-sm text-gray-600">Global Rank</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <span className="font-semibold">{userStats.averageScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Study Hours</span>
                    <span className="font-semibold">{userStats.studyHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Longest Streak</span>
                    <span className="font-semibold">{userStats.longestStreak} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rank Progress</span>
                    <span className="font-semibold">
                      Top {Math.round((userStats.rank / userStats.totalStudents) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {activity.type === "quiz" && `${activity.subject} Quiz - ${activity.score}%`}
                            {activity.type === "streak" && `${activity.days} day streak maintained`}
                            {activity.type === "achievement" && `Earned "${activity.name}"`}
                          </div>
                          <div className="text-xs text-gray-500">{activity.date}</div>
                        </div>
                        {activity.coins && (
                          <Badge variant="secondary" className="text-xs">
                            +{activity.coins} coins
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200"}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        {achievement.earned ? (
                          <Badge className="mt-2 bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Earned {achievement.date}
                          </Badge>
                        ) : (
                          <div className="mt-2">
                            <div className="text-xs text-gray-500 mb-1">
                              Progress: {achievement.progress}/{achievement.name === "Study Streak" ? 30 : 10}
                            </div>
                            <Progress
                              value={(achievement.progress / (achievement.name === "Study Streak" ? 30 : 10)) * 100}
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              {subjectProgress.map((subject) => (
                <Card key={subject.subject}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{subject.subject}</h3>
                      <Badge variant="outline">{subject.averageScore}% avg</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          Progress: {subject.completed}/{subject.total} quizzes
                        </span>
                        <span>{subject.percentage}% complete</span>
                      </div>
                      <Progress value={subject.percentage} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Your complete learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <div className="font-medium">
                          {activity.type === "quiz" && `Completed ${activity.subject} Quiz`}
                          {activity.type === "streak" && `Maintained ${activity.days} day study streak`}
                          {activity.type === "achievement" && `Unlocked "${activity.name}" achievement`}
                        </div>
                        {activity.score && <div className="text-sm text-gray-600">Score: {activity.score}%</div>}
                      </div>
                      <div className="text-right">
                        {activity.coins && (
                          <div className="flex items-center gap-1 text-yellow-600 font-medium">
                            <Coins className="w-4 h-4" />+{activity.coins}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
