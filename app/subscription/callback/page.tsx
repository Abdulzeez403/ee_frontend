"use client";

import { verifySubscription, fetchSubscriptionStatus } from "@/redux/features/subscription";
import { AppDispatch } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

export default function SubscriptionCallbackPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const reference = useMemo(() => {
    return searchParams.get("reference") || searchParams.get("trxref") || "";
  }, [searchParams]);

  useEffect(() => {
    const run = async () => {
      if (!reference) return;
      const result = await dispatch(verifySubscription(reference));
      if (verifySubscription.fulfilled.match(result)) {
        await dispatch(fetchSubscriptionStatus());
        router.replace("/dashboards/shop");
      }
    };
    run();
  }, [dispatch, reference, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white shadow rounded-xl p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Verifying payment</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please wait while we confirm your subscription.
        </p>
      </div>
    </div>
  );
}

