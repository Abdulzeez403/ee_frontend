import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  _id: string;
  username: string;
  coins: number;
}

interface CoinState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoinState = {
  user: null,
  loading: false,
  error: null,
};

// Add coins
export const addCoins = createAsyncThunk(
  "coins/add",
  async ({ userId, amount }: { userId: string; amount: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/api/coins/${userId}/add`, {
        amount,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

// Deduct coins
export const deductCoins = createAsyncThunk(
  "coins/deduct",
  async ({ userId, amount }: { userId: string; amount: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/api/coins/${userId}/deduct`, {
        amount,
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Coins
      .addCase(addCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Deduct Coins
      .addCase(deductCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deductCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deductCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser } = coinSlice.actions;
export default coinSlice.reducer;
