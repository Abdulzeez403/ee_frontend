import { Button } from "@/components/ui/button";
import { BookOpen, Home, Trophy, Gift, User, Brain, Crown } from "lucide-react";
import Link from "next/link";

export function DashboardNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
      <div className="flex items-center justify-around">
        <Link href="/dashboards">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>
        <Link href="/dashboards/quizzes">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Quizzes</span>
          </Button>
        </Link>
        <Link href="/dashboards/tutor">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Brain className="w-5 h-5" />
            <span className="text-xs">AI Tutor</span>
          </Button>
        </Link>
        {/* <Link href="/leaderboard">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Ranks</span>
          </Button>
        </Link> 
        <Link href="/dashboards/shop">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs">Rewards</span>
          </Button>
        </Link>*/}
        <Link href="/dashboards/membership">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs">Member</span>
          </Button>
        </Link>
        <Link href="/dashboards/profile">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
