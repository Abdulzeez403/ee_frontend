"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Coins, ShoppingBag, Smartphone, Wifi } from "lucide-react";
import AirtimeForm from "./forms/airtime";
import DataBundleForm from "./forms/dataBundle";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { DashboardNav } from "@/components/dashboard-nav";
import { initializeSubscription, fetchSubscriptionStatus } from "@/redux/features/subscription";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";

export default function ShopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const subscription = useSelector((state: RootState) => state.subscription);

  useEffect(() => {
    dispatch(fetchSubscriptionStatus());
  }, [dispatch]);

  const handleSubscribe = async () => {
    const result = await dispatch(initializeSubscription());
    if (initializeSubscription.fulfilled.match(result)) {
      const url = result.payload?.authorization_url;
      if (url) window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Rewards
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Coins className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-yellow-800">
                {user?.coins} Coins
              </span>
            </div>
           
          </div>
          {!subscription.isActive && (
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800">
              Active membership is required to buy airtime or data with coins.
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="airtime" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="airtime" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Airtime
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="airtime">
            <AirtimeForm />
          </TabsContent>

          <TabsContent value="data">
            <DataBundleForm />
          </TabsContent>
        </Tabs>

        {/* Earn More Coins CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-2">Need More Coins?</h3>
          <p className="text-blue-100 mb-6">
            Complete more quizzes and maintain your study streak to earn coins
            faster!
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
            Take a Quiz Now
          </Button>
        </div>
      </div>
      <DashboardNav />
    </div>
  );
}
