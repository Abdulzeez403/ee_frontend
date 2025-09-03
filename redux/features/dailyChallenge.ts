// src/redux/features/dailyChallengeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// ===== Types =====
export interface Question {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ChallengeAttempt {
  _id?: string;
  userId: string;
  challengeId: string;
  attemptAt: string;
  score: number;
}

export interface DailyChallenge {
  _id?: string;
  title: string;
  subject: string;
  exam: string;
  timeLimit: number;
  startTime: string; // ISO string from backend
  endTime: string; // ISO string from backend
  questions: Question[];
}

interface DailyChallengeState {
  challenges: DailyChallenge[];
  challenge: DailyChallenge | null;
  active: DailyChallenge | null;
  attempts: Record<string, ChallengeAttempt | null>; // keyed by challengeId
  loading: boolean;
  error: string | null;
}

const initialState: DailyChallengeState = {
  challenges: [],
  challenge: null,
  active: null,
  loading: false,
  attempts: {},
  error: null,
};

// ===== Async Thunks =====

// Create challenge
export const createChallenge = createAsyncThunk(
  "dailyChallenge/createChallenge",
  async (challengeData: DailyChallenge, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/daily-challenges",
        challengeData
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error creating challenge"
      );
    }
  }
);

// Fetch all challenges
export const fetchChallenges = createAsyncThunk(
  "dailyChallenge/fetchChallenges",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/daily-challenges");
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching challenges"
      );
    }
  }
);

// Fetch one challenge
export const fetchChallenge = createAsyncThunk(
  "dailyChallenge/fetchChallenge",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/daily-challenges/${id}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching challenge"
      );
    }
  }
);

// Fetch active challenge
export const fetchActiveChallenge = createAsyncThunk(
  "dailyChallenge/fetchActiveChallenge",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        "/daily-challenges/status/active"
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching active challenge"
      );
    }
  }
);

// Update challenge
export const updateChallenge = createAsyncThunk(
  "dailyChallenge/updateChallenge",
  async (
    { id, updates }: { id: string; updates: Partial<DailyChallenge> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.put(
        `/daily-challenges/${id}`,
        updates
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error updating challenge"
      );
    }
  }
);

// Delete challenge
export const deleteChallenge = createAsyncThunk(
  "dailyChallenge/deleteChallenge",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/daily-challenges/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error deleting challenge"
      );
    }
  }
);

export const attemptChallenge = createAsyncThunk(
  "dailyChallenge/attemptChallenge",
  async (
    {
      userId,
      challengeId,
      score,
    }: { userId: string; challengeId: string; score: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/daily-challenges/${challengeId}/attempt`,
        {
          userId,
          challengeId,
          score,
        }
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error submitting attempt"
      );
    }
  }
);

export const checkAttempt = createAsyncThunk(
  "dailyChallenge/checkAttempt",
  async (
    { userId, challengeId }: { userId: string; challengeId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `/daily-challenges/${challengeId}/check`
      );
      return { challengeId, attempted: data.attempted };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error checking attempt"
      );
    }
  }
);

// ===== Slice =====
const dailyChallengeSlice = createSlice({
  name: "dailyChallenge",
  initialState,
  reducers: {
    clearChallenge: (state) => {
      state.challenge = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createChallenge.pending, (state: DailyChallengeState) => {
        state.loading = true;
      })
      .addCase(
        createChallenge.fulfilled,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.challenges.push(action.payload);
        }
      )
      .addCase(
        createChallenge.rejected,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // Fetch All
      .addCase(fetchChallenges.pending, (state: DailyChallengeState) => {
        state.loading = true;
      })
      .addCase(
        fetchChallenges.fulfilled,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.challenges = action.payload;
        }
      )
      .addCase(
        fetchChallenges.rejected,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // Fetch Single
      .addCase(
        fetchChallenge.fulfilled,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.challenge = action.payload;
        }
      )

      // Fetch Active
      .addCase(
        fetchActiveChallenge.fulfilled,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.active = action.payload;
        }
      )

      // Update
      .addCase(
        updateChallenge.fulfilled,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.challenges = state.challenges.map((ch) =>
            ch._id === action.payload._id ? action.payload : ch
          );
          if (state.challenge?._id === action.payload._id) {
            state.challenge = action.payload;
          }
        }
      )

      .addCase(
        deleteChallenge.fulfilled,
        (state: DailyChallengeState, action) => {
          state.loading = false;
          state.challenges = state.challenges.filter(
            (ch) => ch._id !== action.payload
          );
        }
      )
      .addCase(attemptChallenge.fulfilled, (state: any, action) => {
        state.loading = false;
        const attempt: ChallengeAttempt = action.payload;
        state.attempts[attempt.challengeId] = attempt;
      })
      .addCase(attemptChallenge.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Check Attempt
      // .addCase(checkAttempt.fulfilled, (state: any, action) => {
      //   state.loading = false;
      //   const { challengeId, attempt } = action.payload;
      //   state.attempts[challengeId] = attempt; // null if no attempt yet
      // })

      .addCase(checkAttempt.fulfilled, (state: any, action) => {
        state.loading = false;
        const { challengeId, attempted } = action.payload;
        state.attempts[challengeId] = attempted; // 👈 store true/false directly
      })

      .addCase(checkAttempt.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearChallenge, clearError } = dailyChallengeSlice.actions;
export default dailyChallengeSlice.reducer;
