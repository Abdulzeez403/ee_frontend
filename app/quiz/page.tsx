"use client";

import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";

// slices
import { fetchQuiz } from "@/redux/features/quizSlice";
import { fetchChallenge } from "@/redux/features/dailyChallenge";
import { fetchPastQuestions } from "@/redux/features/pastQuestionSlice";
import { submitQuiz } from "@/redux/features/businessLogic";

// components
import QuizHeader from "./components/quizHeader";
import QuizActive from "./components/quizActive";
import QuizResults from "./components/quizResult";
import QuizStart from "./components/quizStart";

function QuizPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // e.g. "mathematics-2023"
  const type = searchParams.get("type"); // "quiz" | "challenge" | "past-question"

  const dispatch = useDispatch<AppDispatch>();

  // redux state
  const { quiz, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );
  const { active } = useSelector((state: RootState) => state.dailyChallenges);
  const { submission } = useSelector((state: RootState) => state.businessLogic);
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    questions: pastQuestions,
    loading: pastLoading,
    error: pastError,
  } = useSelector((state: RootState) => state.pastQestion);

  // local state
  const [quizState, setQuizState] = useState<"start" | "active" | "results">(
    "start"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);

  // decide quiz source (normalize to always have .questions + .timeLimit)
  let quizquestion: any = null;
  if (type === "quiz") {
    quizquestion = quiz;
  } else if (type === "challenge") {
    quizquestion = active;
  } else if (type === "past-question") {
    quizquestion =
      pastQuestions && pastQuestions.length > 0
        ? { questions: pastQuestions, timeLimit: 40 * 60 } // 40 min default
        : null;
  }

  // fetch data
  useEffect(() => {
    if (!id || !type) return;

    if (type === "quiz") {
      dispatch(fetchQuiz(id));
    } else if (type === "challenge") {
      dispatch(fetchChallenge(id));
    } else if (type === "past-question") {
      const [subject, year] = id.split("-");
      dispatch(fetchPastQuestions({ subject, year: Number(year) }));
    }
  }, [dispatch, id, type]);

  // set timer when quiz loads
  useEffect(() => {
    if (quizquestion?.timeLimit) {
      setTimeLeft(quizquestion.timeLimit);
    }
  }, [quizquestion]);

  // countdown
  useEffect(() => {
    if (quizState === "active" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizState === "active") {
      handleQuizComplete();
    }
  }, [timeLeft, quizState]);

  // helpers
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startQuiz = () => {
    setQuizState("active");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    if (quizquestion?.timeLimit) setTimeLeft(quizquestion.timeLimit);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (quizquestion && currentQuestion < quizquestion.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  // const handleQuizComplete = async () => {
  //   if (!quizquestion) return;

  //   try {
  //     await dispatch(
  //       submitQuiz({
  //         userId: user?._id as any,
  //         id: quizquestion._id as any, // might not exist for past-question
  //         answers: selectedAnswers,
  //         type: type as "quiz" | "challenge" | "past-question",
  //       })
  //     ).unwrap();

  //     setQuizState("results");
  //     setShowCoinAnimation(true);
  //   } catch (err) {
  //     console.error("Error submitting quiz:", err);
  //   }
  // };

  const handleQuizComplete = async () => {
    if (!quizquestion) return;

    if (type === "past-question") {
      const score = calculatePastQuestionScore(
        quizquestion.questions,
        selectedAnswers
      );
      console.log("Past Question Score:", score);
      setQuizState("results");
      setShowCoinAnimation(true);
      return;
    }

    try {
      await dispatch(
        submitQuiz({
          userId: user?._id as any,
          id: quizquestion._id as any,
          answers: selectedAnswers,
          type: type as "quiz" | "challenge" | "past-question",
        })
      ).unwrap();

      setQuizState("results");
      setShowCoinAnimation(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const restartQuiz = () => {
    setQuizState("start");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    if (quizquestion?.timeLimit) setTimeLeft(quizquestion.timeLimit);
  };

  // helpers
  const calculatePastQuestionScore = (questions: any[], answers: number[]) => {
    let correct = 0;

    questions.forEach((q, i) => {
      const correctIndex = ["a", "b", "c", "d"].indexOf(q.answer.toLowerCase());
      if (answers[i] === correctIndex) {
        correct++;
      }
    });

    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  // loading & errors
  if (loading || pastLoading)
    return <p className="p-10 text-center">Loading quiz...</p>;
  if (error || pastError)
    return (
      <p className="p-10 text-center text-red-500">
        Error: {error || pastError}
      </p>
    );
  if (!quizquestion || !quizquestion.questions?.length)
    return <p className="p-10 text-center">No quiz available</p>;

  // states
  if (quizState === "start") {
    return (
      <QuizStart
        quiz={quizquestion}
        formatTime={formatTime}
        startQuiz={startQuiz}
      />
    );
  }

  if (quizState === "active") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
        <QuizHeader timeLeft={timeLeft} />
        <QuizActive
          quiz={quizquestion}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          selectedAnswers={selectedAnswers}
          selectAnswer={selectAnswer}
          nextQuestion={nextQuestion}
          handleQuizComplete={handleQuizComplete}
        />
      </div>
    );
  }

  if (quizState === "results") {
    const pastScore =
      type === "past-question"
        ? calculatePastQuestionScore(quizquestion.questions, selectedAnswers)
        : null;

    return (
      <QuizResults
        quiz={quizquestion}
        submission={type !== "past-question" ? (submission as any) : null}
        pastScore={pastScore} // ✅ pass it down
        showCoinAnimation={showCoinAnimation}
        setShowCoinAnimation={setShowCoinAnimation}
      />
    );
  }

  return <p className="p-10 text-center">No state matched</p>;
}

export default function MainQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPage />
    </Suspense>
  );
}
