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
  GraduationCap,
  FileText,
  AirVent,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProfile } from "@/redux/features/authSlice";
import { useEffect } from "react";
import { fetchActiveChallenge } from "@/redux/features/dailyChallenge";
import StreakCalendar from "./components/calender";
import QuizLists from "./components/quizlists";
import { checkAttempt } from "@/redux/features/businessLogic";
import { fetchQuizzes } from "@/redux/features/quizSlice";
import PastQuestionSection from "./components/pastQuestionSection";
import { DashboardNav } from "@/components/dashboard-nav";

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
  const { loading, error, quizzes } = useSelector(
    (state: RootState) => state.quiz
  );
  const { active } = useSelector((state: RootState) => state.dailyChallenges);
  const { attempts } = useSelector((state: RootState) => state.businessLogic);
  const attempted = attempts[active?._id as any]?.attempted ?? false;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (active?._id && user?._id) {
      dispatch(
        checkAttempt({
          userId: user._id,
          referenceId: active._id,
          type: (active.type as "quiz" | "challenge") || "quiz", // or "challenge"
        })
      );
    }
  }, [active, user, dispatch]);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchActiveChallenge());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">
                PassRite
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
              <Link href="/profile">
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {user?.firstName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">
            👋 Welcome back, {user?.firstName}
          </h1>
          <p className="text-md text-gray-600 md:text-lg lg:text-lg">
            Ready to continue your learning journey and earn more coins?
          </p>
        </div>

        {/* <div className="grid lg:grid-cols-3 gap-8"> */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content */}
          <div className=" space-y-8">
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
                    {user?.streak} Days
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
                      {user?.coins} today
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

            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div>
                    <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl mb-2">
                      Daily Quiz Challenge
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-3">
                      Complete today's challenge and earn bonus coins!
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{active?.questions.length} Questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>
                          {formatTime(active?.timeLimit ?? 0)} Minutes
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>+20 Coins</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                    <div className="hidden w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mb-3 md:flex lg:flex">
                      <Zap className=" w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={
                    attempted
                      ? "#"
                      : `/dashboards/quiz?id=${active?._id}&type=challenge`
                  }
                >
                  <Button
                    disabled={!!attempted}
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {attempted ? "Already Attempted" : "Start Challenge"}
                    <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Practice Past Questions */}
            <div>
              <PastQuestionSection />
            </div>

            {/* Recommended Subjects */}
            <div>
              <QuizLists
                userId={user?._id ?? ""}
                quizzes={quizzes}
                loading={loading}
                error={!!error}
              />
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
                <Link href="/dashboards/tutor">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 rounded-xl bg-transparent"
                  >
                    <AirVent className="w-5 h-5 mr-3 text-purple-600" />
                    Personal Tutor
                  </Button>
                </Link>
                <Link href="/dashboards/shop">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 rounded-xl bg-transparent"
                  >
                    <Gift className="w-5 h-5 mr-3 text-green-600" />
                    Rewards Shop
                  </Button>
                </Link>

                <Link href="/dashboards/leaderboard">
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

            <StreakCalendar
              streak={user?.streak as any}
              lastActivity={user?.lastActivity as any}
            />
          </div>
        </div>
      </div>
      <DashboardNav />
    </div>
  );
}
