import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface BusinessLogicState {
  coins: number;
  submission: any;
  attempt: any;
  loading: boolean;
  error: string | null;
}

const initialState: BusinessLogicState = {
  coins: 0,
  submission: 0,
  attempt: null,
  loading: false,
  error: null,
};

export const submitQuiz = createAsyncThunk(
  "quiz/businessLogicState",
  async ({
    id,
    userId,
    answers,
    type,
  }: {
    id: string;
    userId: string;
    answers: number[];
    type: string;
  }) => {
    const res = await axiosInstance.post(`/logic/${userId}/submit-quiz`, {
      id,
      answers,
      type,
    });
    return res.data;
  }
);

// 👉 Record or check daily attempt
export const quizAttempt = createAsyncThunk(
  "quiz/quizAttempt",
  async ({ userId, quizId }: { userId: string; quizId: string }) => {
    const res = await axiosInstance.post(`/logic/${userId}/attempt-quiz`, {
      quizId,
    });
    return res.data;
  }
);

const quizSlice = createSlice({
  name: "logic",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload.coins;
        state.submission = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // --- QUIZ ATTEMPT ---
      .addCase(quizAttempt.pending, (state) => {
        state.loading = true;
      })
      .addCase(quizAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.attempt = action.payload; // API returns "already attempted" or "new attempt"
      })
      .addCase(quizAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default quizSlice.reducer;
