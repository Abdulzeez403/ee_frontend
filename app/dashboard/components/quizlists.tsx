"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Quiz } from "@/redux/features/quizSlice";
import { checkAttempt } from "@/redux/features/businessLogic";

interface QuizListProp {
  quizzes: Quiz[];
  loading: boolean;
  error: boolean;
  userId: string;
}

export default function QuizLists({
  quizzes,
  loading,
  error,
  userId,
}: QuizListProp) {
  const dispatch = useDispatch<AppDispatch>();
  const { attempt } = useSelector((state: RootState) => state.businessLogic);

  // When quizzes load, check attempts for each quiz
  useEffect(() => {
    if (userId && quizzes.length > 0) {
      quizzes.forEach((quiz) => {
        dispatch(
          checkAttempt({
            userId,
            referenceId: quiz._id ?? "",
            type: "quiz",
          })
        );
      });
    }
  }, [userId, quizzes, dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-lg md:text2x1 lg:text-2x1 text-gray-900">
          Recommended Quizzes
        </h2>

        <div className="flex gap-4 items-center ">
          {/* <Link
            href="/jamb
            "
            className="text-white p-2 rounded-sm bg-gradient-to-br from-yellow-400 to-orange-400 font-medium"
          >
            Customized Exam
          </Link> */}

          <Link
            href="/subjects"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

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
          <p className="text-red-600 col-span-3">Error: {error}</p>
        )}

        {/* Show only first 3 quizzes */}
        {!loading && !error && quizzes.length > 0
          ? quizzes.slice(0, 3).map((quiz) => {
              const attempted =
                attempt &&
                attempt.id === quiz._id &&
                attempt.type === "quiz" &&
                attempt.attempted;

              return (
                <Link
                  key={quiz._id}
                  href={attempted ? "#" : `/quiz?id=${quiz._id}&type=quiz`}
                  className="block"
                >
                  <Card
                    className={`border-0 shadow-lg rounded-2xl transition-all cursor-pointer group ${
                      attempted ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <span className="text-2xl">📘</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
                          {attempted ? "Attempted" : quiz.exam}
                        </Badge>
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">
                        {quiz.subject}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{quiz.title}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Questions</span>
                          <span className="font-medium">
                            {quiz.questions?.length || 0}
                          </span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          : !loading &&
            !error && (
              <p className="text-gray-500 col-span-3">No quizzes available</p>
            )}
      </div>
    </div>
  );
}
