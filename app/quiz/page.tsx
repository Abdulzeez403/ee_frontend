"use client";
import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchQuiz } from "@/redux/features/quizSlice";
import { submitQuiz } from "@/redux/features/businessLogic";
import { fetchChallenge } from "@/redux/features/dailyChallenge";
import QuizHeader from "./components/quizHeader";
import QuizActive from "./components/quizActive";
import QuizResults from "./components/quizResult";
import QuizStart from "./components/quizStart";
import { useSearchParams } from "next/navigation";

function QuizPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  const dispatch = useDispatch<AppDispatch>();
  const { quiz, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );
  const { submission } = useSelector((state: RootState) => state.businessLogic);
  const { active } = useSelector((state: RootState) => state.dailyChallenges);
  const { user } = useSelector((state: RootState) => state.auth);

  const [quizState, setQuizState] = useState<"start" | "active" | "results">(
    "start"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);

  // 👇 use correct quiz source
  const quizquestion = type === "quiz" ? quiz : active;

  useEffect(() => {
    if (!id || !type) return;
    if (type === "quiz") {
      dispatch(fetchQuiz(id));
    } else if (type === "challenge") {
      dispatch(fetchChallenge(id));
    } else {
    }
  }, [dispatch, id, type]);

  useEffect(() => {
    if (quizquestion) {
      setTimeLeft(quizquestion.timeLimit);
    }
  }, [quizquestion]);

  useEffect(() => {
    if (quizState === "active" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizState === "active") {
      handleQuizComplete();
    }
  }, [timeLeft, quizState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startQuiz = () => {
    setQuizState("active");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    if (quizquestion) setTimeLeft(quizquestion.timeLimit);
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

  const handleQuizComplete = async () => {
    if (!quizquestion) return;

    try {
      await dispatch(
        submitQuiz({
          userId: user?._id as any,
          id: quizquestion._id as any,
          answers: selectedAnswers,
          type: type as "quiz" | "challenge",
        })
      ).unwrap(); // unwrap lets you catch errors

      setQuizState("results");
      setShowCoinAnimation(true);
    } catch (err) {
      console.error("Error submitting challenge:", err);
    }
  };

  const restartQuiz = () => {
    setQuizState("start");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    if (quizquestion) setTimeLeft(quizquestion.timeLimit);
  };

  if (loading) return <p className="p-10 text-center">Loading quiz...</p>;
  if (error)
    return <p className="p-10 text-center text-red-500">Error: {error}</p>;
  if (!quizquestion)
    return <p className="p-10 text-center">No quiz available</p>;

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
          // timeLeft={timeLeft}
          // formatTime={formatTime}
        />
      </div>
    );
  }

  if (quizState === "results") {
    return (
      <QuizResults
        quiz={quizquestion}
        submission={submission as any}
        showCoinAnimation={showCoinAnimation}
        setShowCoinAnimation={setShowCoinAnimation}
        // restartQuiz={restartQuiz}
      />
    );
  }

  return <p className="p-10 text-center">No state matched</p>; // ✅ fallback
}

export default function MainQuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPage />
    </Suspense>
  );
}
