"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Coins, Gift, Mail, Phone, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppDispatch, RootState } from "@/redux/store";
import * as Yup from "yup";

import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setTokens } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { error, loading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side illustration skipped for brevity */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-gray-900">
                PassRite
              </span>
            </div>

            <h1 className="font-heading font-bold text-4xl text-gray-900 mb-4">
              Welcome Back!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Continue your learning journey and keep earning those coins!
            </p>

            {/* Illustration */}
            <div className="relative max-w-md mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-700">Study</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-yellow-700">Earn</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-700">Redeem</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-4 text-white text-center">
                  <p className="font-heading font-semibold">
                    Your streak: 7 days! 🔥
                  </p>
                </div>
              </div>

              {/* Floating coins */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Coins className="w-6 h-6 text-yellow-800" />
              </div>
              <div className="absolute -bottom-2 -left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <Gift className="w-5 h-5 text-green-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-heading text-2xl text-gray-900">
                Sign In
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Welcome back! Please sign in to your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const result = await dispatch(loginUser(values)).unwrap();

                    toast({
                      title: "Welcome back! 🎉",
                      description: "You have logged in successfully.",
                    });

                    if (result?.user?.role === "admin") {
                      router.push("/admin");
                    } else {
                      router.push("/dashboards");
                    }
                  } catch (err: any) {
                    toast({
                      title: "Login failed",
                      description:
                        error?.toString() || "Invalid email or password!",
                      variant: "default",
                    });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched, getFieldProps }) => (
                  <Form className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`h-12 rounded-xl border-2 ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "focus:border-blue-500"
                        }`}
                        {...getFieldProps("email")}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`h-12 rounded-xl border-2 pr-12 ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          {...getFieldProps("password")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <Field
                          type="checkbox"
                          name="remember"
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">
                          Remember me
                        </span>
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium"
                    >
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
