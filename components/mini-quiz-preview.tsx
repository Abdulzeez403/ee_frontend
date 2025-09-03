"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Coins } from "lucide-react"

const sampleQuestions = [
  {
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    correct: 1,
    subject: "Geography",
  },
  {
    question: "Solve: 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correct: 1,
    subject: "Mathematics",
  },
  {
    question: "Who wrote 'Things Fall Apart'?",
    options: ["Wole Soyinka", "Chinua Achebe", "Chimamanda Adichie", "Ben Okri"],
    correct: 1,
    subject: "Literature",
  },
]

export function MiniQuizPreview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === sampleQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1)
      setCoinsEarned((prev) => prev + 10)
    }

    setTimeout(() => {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCoinsEarned(0)
  }

  const question = sampleQuestions[currentQuestion]
  const isComplete = currentQuestion === sampleQuestions.length - 1 && showResult

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-2 border-blue-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-heading flex items-center justify-center gap-2">
          <span className="text-blue-600">📚</span>
          Try a Quick Quiz!
        </CardTitle>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{question.subject}</span>
          <span>
            {currentQuestion + 1}/{sampleQuestions.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isComplete ? (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">{question.question}</p>
            </div>

            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showResult
                      ? index === question.correct
                        ? "default"
                        : selectedAnswer === index
                          ? "destructive"
                          : "outline"
                      : "outline"
                  }
                  className={`w-full text-left justify-start h-auto p-3 ${
                    showResult && index === question.correct
                      ? "bg-green-500 hover:bg-green-600"
                      : showResult && selectedAnswer === index && index !== question.correct
                        ? "bg-red-500 hover:bg-red-600"
                        : ""
                  }`}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-2">
                    {showResult && index === question.correct && <CheckCircle className="w-4 h-4" />}
                    {showResult && selectedAnswer === index && index !== question.correct && (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <div>
              <p className="text-lg font-semibold">Quiz Complete!</p>
              <p className="text-gray-600">
                Score: {score}/{sampleQuestions.length}
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 p-3 rounded-lg flex items-center justify-center gap-2">
              <Coins className="w-5 h-5" />
              <span className="font-semibold">+{coinsEarned} coins earned!</span>
            </div>

            <Button onClick={resetQuiz} className="w-full bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
