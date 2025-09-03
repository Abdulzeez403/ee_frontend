"use client";

import BubbleBlast from "@/components/bubbleBlast";
import { CoinAnimation } from "@/components/coin-animation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Coins } from "lucide-react";
import React from "react";

interface QuizResultsProps {
  quiz: {
    questions: { question: string; options: string[]; correctAnswer: number }[];
  };
  submission: {
    score: number;
    reward: number;
  } | null;
  showCoinAnimation: boolean;
  setShowCoinAnimation: (value: boolean) => void;
}

export default function QuizResults({
  quiz,
  submission,
  showCoinAnimation,
  setShowCoinAnimation,
}: QuizResultsProps) {
  const percentage = submission
    ? Math.round((submission.score / quiz.questions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <BubbleBlast
        trigger={showCoinAnimation}
        onComplete={() => setShowCoinAnimation(false)}
      />

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
          {/* Score Display */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="font-heading font-bold text-4xl mb-2">
              {percentage}%
            </h3>
            <p className="text-blue-100 mb-4">
              You got {submission?.score} out of {quiz.questions.length} correct
            </p>
            {submission && (
              <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 py-2 inline-flex">
                <Coins className="w-5 h-5" />
                <span className="font-semibold">
                  +{submission.reward} Coins Earned!
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
