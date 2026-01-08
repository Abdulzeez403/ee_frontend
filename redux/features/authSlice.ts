// src/redux/features/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// ------------------ USER TYPES ------------------

export interface RefreshToken {
  _id: string;
  token: string;
  expiresAt: string;
}

export interface Stats {
  level: number;
  xp: number;
  coins: number;
  quizzesCompleted: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
}

export interface SubjectStats {
  name: string;
  quizzesCompleted: number;
  averageScore: number;
  totalScore: number;
  totalAttempts: number;
  xp: number;
  level: number;
}

export interface UserProfile {
  userId: string;
  fullName: string;
  avatar: string;
  joinDate: string;
  achievements: any[];
  activityLog: any[];
  stats: Stats;
  subjects: SubjectStats[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;

  // New fields
  exams: string[];
  subjects: string[];

  refreshTokens: RefreshToken[];

  userProfile: UserProfile;
}

// ------------------ REDUX STATE ------------------

interface AuthState {
  user: User | null;
  tokens: {
    accessToken: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
};

// ------------------ ASYNC THUNKS ------------------

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Registration Failed!"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data; // backend returns { accessToken, user, userProfile }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      return data;
    } catch (err: any) {
      return rejectWithValue("Failed to load profile");
    }
  }
);

// ------------------ SLICE ------------------

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("tokens", JSON.stringify(action.payload));
      }
    },

    loadTokens: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("tokens");
        if (stored) state.tokens = JSON.parse(stored);
      }
    },

    logout: (state) => {
      state.user = null;
      state.tokens = null;
      localStorage.removeItem("tokens");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.tokens = { accessToken: action.payload.accessToken };

        state.user = {
          ...action.payload.user,
          userProfile: action.payload.profile, // <<--- FIX
        };

        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken: action.payload.accessToken })
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })

      // LOAD PROFILE
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
          userProfile: action.payload.profile, // <<--- STORE IT
        };
      });
  },
});

// EXPORTS
export const { logout, setTokens, loadTokens, clearError } = authSlice.actions;

export default authSlice.reducer;
