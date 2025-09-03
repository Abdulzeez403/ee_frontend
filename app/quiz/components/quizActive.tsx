"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface QuizActiveProps {
  quiz: {
    questions: { question: string; options: string[] }[];
  };
  currentQuestion: number;
  selectedAnswers: number[];
  selectAnswer: (index: number) => void;
  nextQuestion: () => void;
  handleQuizComplete: () => void;
  setCurrentQuestion: (q: number) => void;
}

export default function QuizActive({
  quiz,
  currentQuestion,
  selectedAnswers,
  selectAnswer,
  nextQuestion,
  handleQuizComplete,
  setCurrentQuestion,
}: QuizActiveProps) {
  const question = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="border-0 shadow-2xl rounded-3xl">
        <CardContent className="p-8">
          {/* Question header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              Question {currentQuestion + 1}
            </Badge>
            <h2 className="font-heading font-semibold text-2xl text-gray-900 leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Answer options */}
          <div className="grid gap-4 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-16 text-left justify-start rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent"
                  }`}
                  onClick={() => selectAnswer(index)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                        isSelected
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-gray-300 bg-white text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base">{option}</span>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              disabled={currentQuestion === 0}
              className="rounded-xl bg-transparent"
            >
              Previous
            </Button>

            {currentQuestion !== quiz.questions.length - 1 ? (
              <Button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-8"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleQuizComplete}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8"
              >
                Submit Answer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
