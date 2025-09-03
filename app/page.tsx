import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  BookOpen,
  Trophy,
  Coins,
  Smartphone,
  Gift,
  Users,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { InteractiveCoinCounter } from "@/components/interactive-coin-counter";
import { FloatingBadges } from "@/components/floating-badges";
import { RealTimeActivityFeed } from "@/components/real-time-activity-feed";
import { SuccessMetricsTicker } from "@/components/success-metrics-ticker";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              EduwaExam
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <FloatingBadges />

        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-yellow-100 text-yellow-800 border-yellow-200">
              🎯 Trusted by 50,000+ Students
            </Badge>

            <div className="mb-6 flex justify-center">
              <InteractiveCoinCounter />
            </div>

            <div className="absolute top-8 right-8 hidden lg:block">
              <RealTimeActivityFeed />
            </div>

            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
              Study Smart.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                Earn Rewards.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Master WAEC, JAMB, and NECO exams while earning coins for every
              quiz you complete. Redeem your coins for airtime, data, and
              amazing rewards!
            </p>

            <div className="mb-8">
              <SuccessMetricsTicker />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Free
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-2xl bg-transparent"
              >
                Watch Demo
              </Button>
            </div>

            <div className="">
              {/* Interactive Quiz Preview */}

              {/* Main Hero Illustration */}
              <div className="relative lg:order-2">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-700">Study</p>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                      <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-yellow-700">
                        Earn Coins
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-700">
                        Get Rewards
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-4 text-white text-center">
                    <p className="font-heading font-semibold">
                      🎉 You earned 50 coins!
                    </p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Coins className="w-6 h-6 text-yellow-800" />
                </div>
                <div className="absolute -top-2 -right-6 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <Trophy className="w-5 h-5 text-green-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-4">
              Why Students Love ExamPrep+
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to ace your exams while earning rewards for
              your hard work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="font-heading text-xl">
                  Exam-Focused Content
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Practice with real WAEC, JAMB, and NECO questions. Our content
                  is updated regularly to match current syllabi.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="font-heading text-xl">
                  Earn While You Learn
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Get coins for every quiz completed, daily streaks maintained,
                  and milestones achieved. Learning pays off!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="font-heading text-xl">
                  Real Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Redeem coins for airtime, data bundles, shopping vouchers, and
                  more. Your study time has real value.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="font-heading text-xl">
                  Compete & Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Join leaderboards, compete with friends, and connect with
                  fellow students across Africa.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="font-heading text-xl">
                  Smart Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Track your progress, identify weak areas, and get personalized
                  recommendations to improve faster.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="font-heading text-xl">
                  Achievement System
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Unlock badges, maintain streaks, and celebrate milestones.
                  Every step forward is recognized.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from students who aced their exams with ExamPrep+
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "I earned over 2,000 coins while preparing for JAMB and used
                  them to buy data for more studying. Scored 280!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Adaora O.</p>
                    <p className="text-sm text-gray-500">University of Lagos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The gamification made studying fun! I maintained a 30-day
                  streak and got A1 in all my WAEC subjects."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    K
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Kemi S.</p>
                    <p className="text-sm text-gray-500">SS3 Student, Lagos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Best study app ever! I redeemed my coins for airtime and
                  shopping vouchers. Passed NECO with flying colors!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    C
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Chidi M.</p>
                    <p className="text-sm text-gray-500">Covenant University</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready for more rewards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200 rounded-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-heading text-2xl">
                  Free Plan
                </CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  ₦0<span className="text-lg text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>5 quizzes per day</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Basic coin rewards</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Access to leaderboard</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Basic progress tracking</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gray-600 hover:bg-gray-700 rounded-xl">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 rounded-2xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <CardTitle className="font-heading text-2xl">
                  Premium Plan
                </CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  ₦2,000<span className="text-lg text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Unlimited quizzes</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>2x coin multiplier</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Priority rewards access</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Exclusive study materials</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 rounded-xl">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl">
                  ExamPrep+
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering African students to excel in their exams while
                earning real rewards.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-white transition-colors"
                  >
                    Rewards Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leaderboard"
                    className="hover:text-white transition-colors"
                  >
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">Exams</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/quiz?exam=waec"
                    className="hover:text-white transition-colors"
                  >
                    WAEC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quiz?exam=jamb"
                    className="hover:text-white transition-colors"
                  >
                    JAMB
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quiz?exam=neco"
                    className="hover:text-white transition-colors"
                  >
                    NECO
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quiz?exam=post-utme"
                    className="hover:text-white transition-colors"
                  >
                    Post-UTME
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 ExamPrep+. All rights reserved. Made with ❤️ for
              African students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
