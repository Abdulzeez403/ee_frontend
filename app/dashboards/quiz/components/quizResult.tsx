"use client";

import BubbleBlast from "@/components/bubbleBlast";
import { CoinAnimation } from "@/components/coin-animation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Coins, History, Link } from "lucide-react";
import React from "react";

interface QuizResultsProps {
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer?: number;
      answer?: string;
    }[];
  };
  submission: {
    score: number;
    reward: number;
  } | null;
  pastScore?: {
    correct: number;
    total: number;
    percentage: number;
  } | null;
  showCoinAnimation: boolean;
  setShowCoinAnimation: (value: boolean) => void;
}

export default function QuizResults({
  quiz,
  submission,
  pastScore,
  showCoinAnimation,
  setShowCoinAnimation,
}: QuizResultsProps) {
  // ✅ Determine which score to show
  const percentage = submission
    ? Math.round((submission.score / quiz.questions.length) * 100)
    : pastScore
    ? pastScore.percentage
    : 0;

  const correct = submission ? submission.score : pastScore?.correct ?? 0;
  const total = quiz.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background Confetti */}
      <BubbleBlast
        trigger={showCoinAnimation}
        onComplete={() => setShowCoinAnimation(false)}
      />

      {/* Coin Animation */}
      {showCoinAnimation && submission && (
        <CoinAnimation
          amount={submission.reward}
          onComplete={() => setShowCoinAnimation(false)}
        />
      )}

      <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="font-heading text-3xl text-gray-900 mb-2">
            Quiz Complete!
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Great job on completing the quiz
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Score Display */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="font-heading font-bold text-4xl mb-2">
              {percentage}%
            </h3>
            <p className="text-blue-100 mb-4">
              You got {correct} out of {total} correct
            </p>

            {/* Only show reward for backend quizzes/challenges */}
            {submission && (
              <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 py-2 inline-flex">
                <Coins className="w-5 h-5" />
                <span className="font-semibold">
                  +{submission.reward} Coins Earned!
                </span>
              </div>
            )}
          </div>

          {/* Past Attempt (comparison) */}
          {pastScore && (
            <div className="text-center bg-gray-100 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 mb-2 text-gray-700">
                <History className="w-5 h-5" />
                <span className="font-semibold">Previous Attempt</span>
              </div>
              <p className="text-lg text-gray-600">
                {pastScore.percentage}% ({pastScore.correct} / {pastScore.total}
                )
              </p>
            </div>
          )}
        </CardContent>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="w-full rounded-b-3xl border-t-0"
        >
          <a href="/dashboards">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </a>
        </Button>
      </Card>
    </div>
  );
}
