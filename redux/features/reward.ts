import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Purchase Airtime
export const purchaseAirtime = createAsyncThunk(
  "purchase/purchaseAirtime",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/purchase/airtime`, payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Purchase Data
export const purchaseData = createAsyncThunk(
  "purchase/purchaseData",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`purchase/data`, payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Purchase Exam Pin
export const purchaseExamPin = createAsyncThunk(
  "purchase/purchaseExamPin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/purchase/exam-pin`, payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ========== Slice ==========
const transactionSlice = createSlice({
  name: "reward",
  initialState: {
    loading: false,
    success: null,
    error: null,
    transactions: [],
  },
  reducers: {
    resetTransactionState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Purchase Airtime
      .addCase(purchaseAirtime.pending, (state) => {
        state.loading = true;
      })

      .addCase(purchaseAirtime.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(purchaseAirtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })

      // Purchase Data
      .addCase(purchaseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(purchaseData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(purchaseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })

      // Purchase Exam Pin
      .addCase(purchaseExamPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(purchaseExamPin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(purchaseExamPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
