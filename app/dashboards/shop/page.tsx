"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Coins,
  BookOpen,
  Gift,
  Smartphone,
  Trophy,
  ShoppingBag,
  Star,
  Zap,
} from "lucide-react";
import AirtimeForm from "./forms/airtime";
import DataBundleForm from "./forms/dataBundle";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DashboardNav } from "@/components/dashboard-nav";

const rewards = {
  digital: [
    {
      id: 1,
      name: "Premium Study Guide - Mathematics",
      description:
        "Comprehensive JAMB Mathematics guide with 500+ practice questions",
      price: 150,
      image: "/mathematics-textbook.png",
      category: "Study Material",
      popular: true,
    },
    {
      id: 2,
      name: "Physics Formula Sheet",
      description: "Complete physics formulas for WAEC and JAMB exams",
      price: 75,
      image: "/physics-formulas-sheet.png",
      category: "Study Material",
    },
    {
      id: 3,
      name: "English Language Practice Tests",
      description:
        "50 comprehensive English practice tests with detailed explanations",
      price: 120,
      image: "/english-language-book.png",
      category: "Practice Tests",
    },
    {
      id: 4,
      name: "Premium Features (1 Month)",
      description:
        "Unlock unlimited quizzes, detailed analytics, and priority support",
      price: 200,
      image: "/premium-app-features.png",
      category: "Premium",
    },
  ],
  physical: [
    {
      id: 5,
      name: "ExamPrep+ Notebook Set",
      description: "Set of 3 branded notebooks perfect for note-taking",
      price: 300,
      image: "/branded-notebooks-set.png",
      category: "Stationery",
      popular: true,
    },
    {
      id: 6,
      name: "Scientific Calculator",
      description: "Casio FX-991ES Plus scientific calculator for mathematics",
      price: 500,
      image: "/scientific-calculator.png",
      category: "Tools",
    },
    {
      id: 7,
      name: "Study Planner",
      description:
        "6-month academic planner with exam countdown and goal tracking",
      price: 250,
      image: "/academic-study-planner.png",
      category: "Stationery",
    },
    {
      id: 8,
      name: "Pen Set (5 pieces)",
      description: "High-quality ballpoint pens in assorted colors",
      price: 100,
      image: "/colorful-pen-set.png",
      category: "Stationery",
    },
  ],
  vouchers: [
    {
      id: 9,
      name: "₦1,000 Airtime Voucher",
      description: "Mobile airtime voucher for all Nigerian networks",
      price: 400,
      image: "/mobile-airtime-voucher.png",
      category: "Airtime",
      popular: true,
    },
    {
      id: 10,
      name: "₦500 Data Bundle",
      description: "500MB data bundle for studying on the go",
      price: 200,
      image: "/data-bundle-voucher.png",
      category: "Data",
    },
    {
      id: 11,
      name: "Book Store Voucher",
      description: "₦2,000 voucher for any participating bookstore",
      price: 600,
      image: "/bookstore-gift-voucher.png",
      category: "Shopping",
    },
  ],
};

export default function ShopPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  type RewardItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    popular?: boolean;
  };

  const [selectedItem, setSelectedItem] = useState<RewardItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [voucherForm, setVoucherForm] = useState({
    network: "",
    mobileNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // const handlePurchase = (item: any) => {
  //   if (userCoins >= item.price) {
  //     if (item.category === "Airtime" || item.category === "Data") {
  //       const errors = {};
  //       if (!voucherForm.network) errors.network = "Please select a network";
  //       if (!voucherForm.mobileNumber)
  //         errors.mobileNumber = "Please enter mobile number";
  //       else if (!/^0[789][01]\d{8}$/.test(voucherForm.mobileNumber)) {
  //         errors.mobileNumber = "Please enter a valid Nigerian mobile number";
  //       }

  //       if (Object.keys(errors).length > 0) {
  //         setFormErrors(errors);
  //         return;
  //       }
  //     }

  //     setUserCoins((prev) => prev - item.price);
  //     setSelectedItem(null);
  //     setShowSuccess(true);
  //     setVoucherForm({ network: "", mobileNumber: "" });
  //     setFormErrors({});
  //     setTimeout(() => setShowSuccess(false), 3000);
  //   }
  // };

  const isVoucher = (item: any) => {
    return item && (item.category === "Airtime" || item.category === "Data");
  };

  const RewardCard = ({ item }: any) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="relative">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          {item.popular && (
            <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {item.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1 text-yellow-600 font-bold">
          <Coins className="w-5 h-5" />
          <span>{item.price}</span>
        </div>
        <Button className="bg-gray-400 ">Coming Soon</Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Rewards Shop
                </h1>
                <p className="text-gray-600">
                  Redeem your coins for amazing rewards
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Coins className="w-6 h-6 text-yellow-600" />
              <span className="font-bold text-yellow-800">
                {user?.coins} Coins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Purchase Successful!
            </h3>
            <p className="text-gray-600">Your reward will be delivered soon.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="vouchers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="vouchers" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Vouchers
            </TabsTrigger>
            <TabsTrigger value="digital" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Digital Rewards
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Physical Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vouchers">
            <Tabs defaultValue="airtime" className=" ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="airtime"
                  className="active:bg-customSecondary"
                >
                  Airtime
                </TabsTrigger>
                <TabsTrigger className="active:bg-customSecondary" value="data">
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
          </TabsContent>

          <TabsContent value="physical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rewards.physical.map((item) => (
                <RewardCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="digital">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rewards.vouchers.map((item) => (
                <RewardCard key={item.id} item={item} />
              ))}
            </div>
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
