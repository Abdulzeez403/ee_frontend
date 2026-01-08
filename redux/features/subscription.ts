import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SubscriptionStatusResponse = {
  isActive: boolean;
  status: string;
  expiresAt: string | null;
};

type InitializeResponse = {
  reference: string;
  authorization_url?: string;
  access_code?: string;
};

type VerifyResponse = {
  message: string;
  expiresAt?: string;
};

type SubscriptionState = {
  loading: boolean;
  error: string | null;
  isActive: boolean;
  status: string;
  expiresAt: string | null;
  authorizationUrl: string | null;
  reference: string | null;
};

const initialState: SubscriptionState = {
  loading: false,
  error: null,
  isActive: false,
  status: "inactive",
  expiresAt: null,
  authorizationUrl: null,
  reference: null,
};

export const fetchSubscriptionStatus = createAsyncThunk(
  "subscription/status",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<SubscriptionStatusResponse>(
        "/subscription/status"
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const initializeSubscription = createAsyncThunk(
  "subscription/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<InitializeResponse>(
        "/subscription/initialize",
        {}
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const verifySubscription = createAsyncThunk(
  "subscription/verify",
  async (reference: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<VerifyResponse>(
        `/subscription/verify/${encodeURIComponent(reference)}`
      );
      return { ...data, reference };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscriptionError(state) {
      state.error = null;
    },
    clearSubscriptionRedirect(state) {
      state.authorizationUrl = null;
      state.reference = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isActive = Boolean(action.payload?.isActive);
        state.status = action.payload?.status || "inactive";
        state.expiresAt = action.payload?.expiresAt ?? null;
      })
      .addCase(fetchSubscriptionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || (action.payload as any);
      })
      .addCase(initializeSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authorizationUrl = null;
        state.reference = null;
      })
      .addCase(initializeSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.authorizationUrl = action.payload?.authorization_url || null;
        state.reference = action.payload?.reference || null;
      })
      .addCase(initializeSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || (action.payload as any);
      })
      .addCase(verifySubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.isActive = true;
        state.status = "active";
        state.expiresAt = action.payload?.expiresAt || state.expiresAt;
        state.reference = action.payload?.reference || state.reference;
      })
      .addCase(verifySubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || (action.payload as any);
      });
  },
});

export const { clearSubscriptionError, clearSubscriptionRedirect } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;

