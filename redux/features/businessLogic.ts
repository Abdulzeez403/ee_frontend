import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Submission {
  coins: number;
  [key: string]: any;
}

interface Attempt {
  id: string;
  type: "quiz" | "challenge" | "past-question";
  attempted: boolean;
}

interface BusinessLogicState {
  coins: number;
  submission: Submission | null;
  attempt: Attempt | null;
  loading: boolean;
  error: string | null;
}

const initialState: BusinessLogicState = {
  coins: 0,
  submission: null,
  attempt: null,
  loading: false,
  error: null,
};

// ✅ Submit quiz or challenge
export const submitQuiz = createAsyncThunk(
  "logic/submitQuiz",
  async ({
    id,
    userId,
    answers,
    type,
  }: {
    id: string;
    userId: string;
    answers: number[];
    type: "quiz" | "challenge" | "past-question";
  }) => {
    const res = await axiosInstance.post(`/logic/${userId}/submit-quiz`, {
      id,
      answers,
      type,
    });
    return res.data;
  }
);

// ✅ Check attempt (works for both quiz & challenge)
export const checkAttempt = createAsyncThunk(
  "logic/checkAttempt",
  async (
    {
      userId,
      referenceId,
      type,
    }: {
      userId: string;
      referenceId: string;
      type: "quiz" | "challenge" | "past-question";
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `/logic/check/${type}/${referenceId}`,
        { params: { userId } }
      );
      return { id: referenceId, type, attempted: data.attempted };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error checking attempt"
      );
    }
  }
);

const businessLogicSlice = createSlice({
  name: "logic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- SUBMIT QUIZ/CHALLENGE ---
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
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

      // --- CHECK ATTEMPT ---
      .addCase(checkAttempt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.attempt = action.payload;
      })

      .addCase(checkAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default businessLogicSlice.reducer;
