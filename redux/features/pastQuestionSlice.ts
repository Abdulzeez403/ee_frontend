// src/redux/features/pastQuestionSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface PastQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  subject: string;
  year: number;
}

interface PastQuestionState {
  questions: PastQuestion[];
  loading: boolean;
  error: string | null;
  selectedSubject: string | null;
  selectedYear: number | null;
}

const initialState: PastQuestionState = {
  questions: [],
  loading: false,
  error: null,
  selectedSubject: null,
  selectedYear: null,
};

// API CONFIG
const ALOC_BASE_URL = "https://questions.aloc.com.ng/api/v2";
const API_TOKEN = process.env.NEXT_PUBLIC_ALOC_API_TOKEN;

// ✅ Async thunk to fetch past questions
export const fetchPastQuestions = createAsyncThunk<
  PastQuestion[], // return type
  { subject: string; year: number; type: string }, // params
  { rejectValue: string }
>(
  "pastQuestions/fetch",
  async ({ subject, year, type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ALOC_BASE_URL}/m?subject=${subject}&year=${year}&type=${type}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AccessToken: API_TOKEN!,
          },
        }
      );

      // Normalize into your PastQuestion[] shape
      const normalized: PastQuestion[] = response.data.data.map(
        (q: any, idx: number) => ({
          id: `${subject}-${year}-${idx}`,
          question: q.question,
          options: Object.values(q.option), // turn {a,b,c,d} → ["", "", "", ""]
          answer: q.answer, // still "a", "b", etc.
          subject,
          year,
        })
      );

      return normalized;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch past questions"
      );
    }
  }
);

const pastQuestionSlice = createSlice({
  name: "pastQuestions",
  initialState,
  reducers: {
    clearQuestions: (state) => {
      state.questions = [];
      state.error = null;
      state.loading = false;
    },
    setFilter: (
      state,
      action: PayloadAction<{ subject: string; year: number }>
    ) => {
      state.selectedSubject = action.payload.subject;
      state.selectedYear = action.payload.year;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchPastQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearQuestions, setFilter } = pastQuestionSlice.actions;
export default pastQuestionSlice.reducer;
