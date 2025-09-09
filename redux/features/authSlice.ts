// src/redux/features/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: "user" | "admin"; // you can extend roles if needed
  isActive: boolean;
  isVerified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // Gamification / learning system fields
  coins: number;
  experience: number;
  level: number;
  streak: number;
  totalReward: number;
  totalScore: number;
  lastActivity: string | null;
  achievements: string[]; // or an Achievement[] if you want a full object type
  subjects: string[]; // could also be Subject[] if richer objects are stored

  preferences: {
    notifications: boolean;
    soundEffects: boolean;
    theme: "light" | "dark"; // add more if you support more themes
  };

  notifications: boolean;
  soundEffects: boolean;
  theme: "light" | "dark";
}

interface AuthState {
  user: User | null;
  streak: number;
  totalScore: number;
  totalReward: number;
  experience: number;
  tokens: { accessToken: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  streak: 0,
  totalScore: 0,
  totalReward: 0,
  experience: 0,
  tokens: null,
  loading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      username: string;
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      exams?: string[];
      subjects?: string[];
    },
    { rejectWithValue }
  ) => {
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
      return data;
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
      return data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
      // persist token
      localStorage.setItem("tokens", JSON.stringify(action.payload));
    },
    loadTokens: (state) => {
      if (typeof window !== "undefined") {
        // ✅ check for browser
        const stored = localStorage.getItem("tokens");
        if (stored) {
          state.tokens = JSON.parse(stored);
        }
      }
    },

    logout: (state) => {
      state.tokens = { accessToken: "" };
      localStorage.removeItem("tokens");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = { accessToken: action.payload.accessToken };
        state.user = action.payload.user;

        // ✅ persist token here
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "tokens",
            JSON.stringify({ accessToken: action.payload.accessToken })
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setTokens, loadTokens, clearError } = authSlice.actions;
export default authSlice.reducer;
