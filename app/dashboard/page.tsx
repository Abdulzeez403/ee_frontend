"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Coins,
  Flame,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Star,
  Zap,
  Gift,
  Users,
  ChevronRight,
  Calendar,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProfile } from "@/redux/features/authSlice";
import { useEffect } from "react";
import { quizAttempt } from "@/redux/features/businessLogic";
import {
  checkAttempt,
  fetchActiveChallenge,
} from "@/redux/features/dailyChallenge";
import StreakCalendar from "./components/calender";
import QuizLists from "./components/quizlists";

const rankNames: Record<number, string> = {
  1: "🐣 Rookie Egg",
  2: "🔥 Hotshot",
  3: "🧠 Brainiac",
  4: "⚡ Quick Thinker",
  5: "👑 Quiz King",
  6: "🚀 Galaxy Brain",
};

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { quiz } = useSelector((state: RootState) => state.quiz);
  const { active } = useSelector((state: RootState) => state.dailyChallenges);
  const attempted = useSelector((state: RootState) =>
    active && active._id
      ? state.dailyChallenges.attempts[active._id]
      : undefined
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (active?._id && user?._id) {
      dispatch(checkAttempt({ userId: user._id, challengeId: active._id }));
    }
  }, [active, user]);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchActiveChallenge());
  }, [dispatch]);

  const handleAttemptQuiz = () => {
    dispatch(
      quizAttempt({
        userId: user?._id ?? "",
        quizId: quiz?._id ?? "",
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">
                Eduwa
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Coin Balance */}
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  {user?.coins}
                </span>
              </div>

              {/* User Avatar */}
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-blue-600 text-white font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">
            Welcome back, {user?.firstName} 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to continue your learning journey and earn more coins?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Streak Counter */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      Active
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-1">
                    ${user?.streak} Days
                  </h3>
                  <p className="text-white/80">Study Streak</p>
                </CardContent>
              </Card>

              {/* Total Coins */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Coins className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      ${user?.coins} today
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-1">
                    {user?.coins}
                  </h3>
                  <p className="text-white/80">Total Coins</p>
                </CardContent>
              </Card>

              {/* Rank */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      Top 10%
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-1">
                    {rankNames[user?.level as any] || "🌟 Legend"}
                  </h3>

                  <p className="text-white/80">Your Rank</p>
                </CardContent>
              </Card>
            </div>

            {/* Daily Challenge */}
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading font-bold text-2xl mb-2">
                      Daily Quiz Challenge
                    </h2>
                    <p className="text-blue-100 mb-4">
                      Complete today's challenge and earn bonus coins!
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        <span>{active?.questions.length} Questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>{active?.timeLimit} Minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5" />
                        <span>+100 Coins</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <Link
                  href={
                    attempted ? "#" : `/quiz?id=${active?._id}&type=challenge`
                  }
                >
                  <Button
                    disabled={attempted as any}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {attempted ? "Already Attempted" : "Start Challenge"}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recommended Subjects */}
            <div>
              <QuizLists />
            </div>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-2xl text-gray-900">
                  Recommended Subjects
                </h2>
                <Link
                  href="/subjects"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Mathematics */}
                <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <span className="text-2xl">📐</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        JAMB
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Mathematics
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Master algebra, calculus, and geometry
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* English */}
                <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <span className="text-2xl">📚</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        WAEC
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      English Language
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Grammar, comprehension, and literature
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Physics */}
                <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-2xl">⚛️</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        NECO
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Physics
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Mechanics, waves, and electricity
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-lg">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 rounded-xl bg-transparent"
                  >
                    <Gift className="w-5 h-5 mr-3 text-green-600" />
                    Rewards Shop
                  </Button>
                </Link>

                <Link href="/leaderboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 rounded-xl bg-transparent"
                  >
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    Leaderboard
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full justify-start h-12 rounded-xl bg-transparent"
                >
                  <TrendingUp className="w-5 h-5 mr-3 text-purple-600" />
                  Progress Report
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Week Warrior</p>
                    <p className="text-xs text-gray-600">
                      ${user?.streak}-day study streak
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quiz Master</p>
                    <p className="text-xs text-gray-600">
                      100 quizzes completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Coin Collector</p>
                    <p className="text-xs text-gray-600">
                      {user?.coins} coins earned
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Calendar */}
            {/* <Card className="border-0 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div
                      key={i}
                      className="text-center text-xs font-medium text-gray-500 p-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                        i < 3
                          ? "bg-green-500 text-white"
                          : i === 3
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-3 text-center">
                  🔥 Keep your streak alive! Study today to maintain your 7-day
                  streak.
                </p>
              </CardContent>
            </Card> */}
            <StreakCalendar
              streak={user?.streak as any}
              lastActivity={user?.lastActivity as any}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
