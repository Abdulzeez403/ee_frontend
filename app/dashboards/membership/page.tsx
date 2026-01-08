"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardNav } from "@/components/dashboard-nav";
import {
  fetchSubscriptionStatus,
  initializeSubscription,
} from "@/redux/features/subscription";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MembershipPage() {
  const dispatch = useDispatch<AppDispatch>();
  const subscription = useSelector((state: RootState) => state.subscription);

  useEffect(() => {
    dispatch(fetchSubscriptionStatus());
  }, [dispatch]);

  const expiresText = useMemo(() => {
    if (!subscription.expiresAt) return "—";
    const d = new Date(subscription.expiresAt);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  }, [subscription.expiresAt]);

  const handleSubscribe = async () => {
    const result = await dispatch(initializeSubscription());
    if (initializeSubscription.fulfilled.match(result)) {
      const url = result.payload?.authorization_url;
      if (url) window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Membership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
              <div className="text-sm text-gray-700">Status</div>
              <div className="text-sm font-semibold text-gray-900">
                {subscription.isActive ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
              <div className="text-sm text-gray-700">Expires</div>
              <div className="text-sm font-semibold text-gray-900">
                {expiresText}
              </div>
            </div>

            {!subscription.isActive && (
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                Subscribe to unlock airtime and data purchases with coins.
              </div>
            )}

            <Button
              onClick={handleSubscribe}
              disabled={subscription.loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {subscription.loading
                ? "Redirecting..."
                : subscription.isActive
                ? "Renew Membership"
                : "Subscribe Now"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <DashboardNav />
    </div>
  );
}

