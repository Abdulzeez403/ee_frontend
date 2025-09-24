"use client";
import React, { useEffect } from "react";
import Link from "next/link"; // ✅ use Next.js Link
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { DashboardNav } from "@/components/dashboard-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import * as Progress from "@radix-ui/react-progress";
import { fetchProfile } from "@/redux/features/authSlice";
import { checkAttempt } from "@/redux/features/businessLogic";
import { fetchActiveChallenge } from "@/redux/features/dailyChallenge";
import { fetchQuizzes } from "@/redux/features/quizSlice";
import { Badge } from "@/components/ui/badge";

function Quizzess() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading, error, quizzes } = useSelector(
    (state: RootState) => state.quiz
  );
  const { active } = useSelector((state: RootState) => state.dailyChallenges);
  const { attempts } = useSelector((state: RootState) => state.businessLogic);

  const attempted = attempts[active?._id as any]?.attempted ?? false;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (active?._id && user?._id) {
      dispatch(
        checkAttempt({
          userId: user._id,
          referenceId: active._id,
          type: (active.type as "quiz" | "challenge") || "quiz",
        })
      );
    }
  }, [active, user, dispatch]);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchActiveChallenge());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <div className="space-y-10 px-4 py-6 md:py-10 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Available Quizzes
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Practice quizzes tailored for your registered exams. Track your
          progress and get ready for the big day!
        </p>
      </div>
      {/* Quizzes Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Skeleton Loader */}
        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="border-0 shadow-lg rounded-2xl p-6 space-y-4"
            >
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </Card>
          ))}

        {/* Error State */}
        {!loading && error && (
          <p className="text-red-600 col-span-3 text-center font-medium">
            Error: {error}
          </p>
        )}

        {/* Quizzes */}
        {!loading && !error && quizzes.length > 0
          ? quizzes.slice(0, 3).map((quiz) => {
              const attempted = attempts[quiz._id as any]?.attempted ?? false;

              return (
                <Link
                  key={quiz._id}
                  href={
                    attempted
                      ? "#"
                      : `/dashboards/quiz?id=${quiz._id}&type=quiz`
                  }
                  className="block"
                >
                  <Card
                    className={`border-0 shadow-lg rounded-2xl transition-all hover:shadow-xl group ${
                      attempted
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <CardContent className="p-6 space-y-4">
                      {/* Top Row */}
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <span className="text-2xl">📘</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${
                            attempted
                              ? "bg-gray-200 text-gray-600"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {attempted ? "Attempted" : quiz.exam}
                        </Badge>
                      </div>

                      {/* Title + Subject */}
                      <div>
                        <h3 className="font-heading font-semibold text-lg">
                          {quiz.subject}
                        </h3>
                        <p className="text-gray-600 text-sm">{quiz.title}</p>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Questions</span>
                          <span className="font-medium">
                            {quiz.questions?.length || 0}
                          </span>
                        </div>

                        {/* Progress bar wrapper */}
                        <Progress.Root
                          className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
                          value={50}
                        >
                          <Progress.Indicator
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: "50%" }}
                          />
                        </Progress.Root>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          : !loading &&
            !error && (
              <p className="text-gray-500 col-span-3 text-center">
                No quizzes available
              </p>
            )}
      </div>

      {/* Bottom Navigation */}
      <DashboardNav />
    </div>
  );
}

export default Quizzess;
