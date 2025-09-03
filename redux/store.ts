import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice";
import coinReducer from "@/redux/features/authSlice";
import quizReducer from "@/redux/features/quizSlice";
import businessLogicReducer from "@/redux/features/businessLogic";
import dailyChallengesReducer from "@/redux/features/dailyChallenge";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinReducer,
    quiz: quizReducer,
    businessLogic: businessLogicReducer,
    dailyChallenges: dailyChallengesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
