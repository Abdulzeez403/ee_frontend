"use client";

import { BookOpen, Target, Clock, Coins, ArrowRight, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface QuizStartProps {
  quiz: {
    title: string;
    subject: string;
    exam: string;
    questions: { question: string; options: string[]; correctAnswer: number }[];
    timeLimit: number;
    reward?: number; // optional if not always present
  };
  formatTime: (time: number) => string;
  startQuiz: () => void;
}

export default function QuizStart({
  quiz,
  formatTime,
  startQuiz,
}: QuizStartProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="font-heading text-3xl text-gray-900 mb-2">
            {quiz.title}
          </CardTitle>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge className="bg-blue-100 text-blue-700">{quiz.subject}</Badge>
            <Badge className="bg-green-100 text-green-700">{quiz.exam}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quiz Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-700">
                {quiz?.questions?.length} Questions
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-semibold text-yellow-700">
                {formatTime(quiz.timeLimit)}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Coins className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-700">
                Up to {quiz.reward ?? 100} Coins
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-heading font-semibold text-lg mb-3">
              Instructions:
            </h3>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Answer all questions within the time limit</li>
              <li>Each correct answer earns you coins</li>
              <li>You can review your answers at the end</li>
              <li>Good luck and have fun learning!</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl bg-transparent"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button
              onClick={startQuiz}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
