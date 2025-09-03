"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface StreakCalendarProps {
  streak: number; // e.g. 4
  lastActivity: string; // ISO date string from backend
}

export default function StreakCalendar({
  streak,
  lastActivity,
}: StreakCalendarProps) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date();
  const lastActive = new Date(lastActivity);

  // Get today's index (0 = Sunday, 6 = Saturday)
  const todayIndex = today.getDay();

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="font-heading text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {days.map((day, i) => (
            <div
              key={i}
              className="text-center text-xs font-medium text-gray-500 p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Streak progress */}
        <div className="grid grid-cols-7 gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const date = new Date();
            date.setDate(today.getDate() - todayIndex + i); // align week to Sunday-Saturday
            const dayNum = date.getDate();

            let bg = "bg-gray-100 text-gray-400"; // default
            if (i <= todayIndex) {
              if (i >= todayIndex - (streak - 1) && i <= todayIndex) {
                bg = "bg-green-500 text-white"; // part of streak
              }
              if (i === todayIndex) {
                bg = "bg-blue-500 text-white"; // today
              }
            }
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${bg}`}
              >
                {dayNum}
              </div>
            );
          })}
        </div>

        {/* Message */}
        <p className="text-xs text-gray-600 mt-3 text-center">
          🔥 Keep your streak alive! Study today to maintain your {streak}-day
          streak.
        </p>
      </CardContent>
    </Card>
  );
}
