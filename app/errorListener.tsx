"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";

// Import clearError actions
import { clearError as clearAuthError } from "@/redux/features/authSlice";
import { clearError as clearQuizError } from "@/redux/features/quizSlice";
import { clearError as clearChallengeError } from "@/redux/features/dailyChallenge";

export default function ErrorListener() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Grab errors from different slices
  const authError = useSelector((state: RootState) => state.auth.error);
  const quizError = useSelector((state: RootState) => state.quiz.error);
  const challengeError = useSelector(
    (state: RootState) => state.dailyChallenges.error
  );

  useEffect(() => {
    if (authError) {
      toast({
        title: "Authentication Error",
        description: authError,
        variant: "destructive",
      });
      dispatch(clearAuthError());
    }
  }, [authError, toast, dispatch]);

  useEffect(() => {
    if (quizError) {
      toast({
        title: "Quiz Error",
        description: quizError,
        variant: "destructive",
      });
      dispatch(clearQuizError());
    }
  }, [quizError, toast, dispatch]);

  useEffect(() => {
    if (challengeError) {
      toast({
        title: "Challenge Error",
        description: challengeError,
        variant: "destructive",
      });
      dispatch(clearChallengeError());
    }
  }, [challengeError, toast, dispatch]);

  return null; // Invisible listener
}
