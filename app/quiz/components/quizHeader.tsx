"use client";
import { BookOpen, Clock } from "lucide-react";

export default function QuizHeader({ timeLeft }: { timeLeft: number }) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-gray-900">
            ExamPrep+
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-800">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
