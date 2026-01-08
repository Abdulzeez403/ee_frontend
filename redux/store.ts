import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice";
import coinReducer from "@/redux/features/authSlice";
import quizReducer from "@/redux/features/quizSlice";
import businessLogicReducer from "@/redux/features/businessLogic";
import dailyChallengesReducer from "@/redux/features/dailyChallenge";
import rewardReducer from "@/redux/features/reward";
import pastQuestionReducer from "@/redux/features/pastQuestionSlice";
import subscriptionReducer from "@/redux/features/subscription";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinReducer,
    quiz: quizReducer,
    businessLogic: businessLogicReducer,
    dailyChallenges: dailyChallengesReducer,
    reward: rewardReducer,
    pastQestion: pastQuestionReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
