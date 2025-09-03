// src/redux/features/quizSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export interface Question {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  _id?: string;
  title: string;
  subject: string;
  exam: string;
  timeLimit: number;
  questions: Question[];
}

interface QuizState {
  quizzes: Quiz[];
  quiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  quiz: null,
  loading: false,
  error: null,
};

// ===== Async Thunks =====

// Create Quiz
export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async (quizData: Quiz, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/quiz/quizzes", quizData);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error creating quiz"
      );
    }
  }
);

// Fetch All Quizzes
export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/quiz");
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching quizzes"
      );
    }
  }
);

// Fetch Single Quiz
export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/quiz/${id}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching quiz"
      );
    }
  }
);

// Update Quiz
export const updateQuiz = createAsyncThunk(
  "quiz/updateQuiz",
  async (
    { id, quizData }: { id: string; quizData: Quiz },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.put(`/quizzes/${id}`, quizData);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error updating quiz"
      );
    }
  }
);

// Delete Quiz
export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/quizzes/${id}`);
      return id; // return deleted quiz id to remove from state
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error deleting quiz"
      );
    }
  }
);

// ===== Slice =====
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Quiz
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.push(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch All Quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Quiz
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quiz = action.payload;
      })

      // Update Quiz
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.map((quiz) =>
          quiz._id === action.payload._id ? action.payload : quiz
        );
      })

      // Delete Quiz
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
      });
  },
});

export default quizSlice.reducer;
