import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Coins, BookOpen } from "lucide-react"
import Link from "next/link"

interface QuizCardProps {
  title: string
  subject: string
  exam: string
  questions: number
  timeLimit: string
  maxCoins: number
  difficulty: "Easy" | "Medium" | "Hard"
  href: string
}

export function QuizCard({ title, subject, exam, questions, timeLimit, maxCoins, difficulty, href }: QuizCardProps) {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  }

  return (
    <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-blue-100 text-blue-700">{subject}</Badge>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>
        <CardTitle className="font-heading text-lg group-hover:text-blue-600 transition-colors">{title}</CardTitle>
        <Badge variant="outline" className="w-fit">
          {exam}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span>{questions}Q</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span>{timeLimit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-green-600" />
            <span>{maxCoins}</span>
          </div>
        </div>

        <Link href={href}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
            <BookOpen className="w-4 h-4 mr-2" />
            Start Quiz
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
