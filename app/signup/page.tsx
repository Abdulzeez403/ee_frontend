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
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Coins,
  Gift,
  Trophy,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { registerUser } from "@/redux/features/authSlice";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/components/ui/use-toast";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  exams: Yup.array().min(1, "Select at least one exam"),
  subjects: Yup.array().min(1, "Select at least one subject"),
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const examOptions = ["WAEC", "JAMB", "NECO", "POST-UTME"];
  const subjectOptions = [
    "Mathematics",
    "English",
    "Biology",
    "Literature",
    "Agriculture",
    "Chemistry",
    "Physics",
  ];

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl text-gray-900">
                ExamPrep+
              </span>
            </div>

            <h1 className="font-heading font-bold text-4xl text-gray-900 mb-4">
              Join 50,000+ Students!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Start your journey to exam success and earn rewards while you
              learn
            </p>

            {/* Benefits */}
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto">
              <h3 className="font-heading font-semibold text-lg mb-6 text-gray-900">
                What you'll get:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Free daily quizzes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-gray-700">Earn coins for studying</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Redeem for airtime & data
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Compete on leaderboards</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Coins className="w-6 h-6 text-yellow-800" />
              </div>
              <div className="absolute -bottom-2 -left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <Trophy className="w-5 h-5 text-green-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-gray-900">
                  ExamPrep+
                </span>
              </div>
              <CardTitle className="font-heading text-2xl text-gray-900">
                Create Account
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Join thousands of students acing their exams
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Sign Up */}
              {/* <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-2 hover:bg-gray-50 bg-transparent"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div> */}

              {/* Email/Phone Toggle */}
              {/* <div className="flex bg-gray-100 rounded-xl p-1">
                <Button
                  variant="ghost"
                  className="flex-1 h-10 bg-white shadow-sm rounded-lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="ghost" className="flex-1 h-10 text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </Button>
              </div> */}

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  terms: false,
                  exams: [] as string[],
                  subjects: [] as string[],
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    await dispatch(
                      registerUser({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        username: values.email.split("@")[0],
                        exams: values.exams,
                        subjects: values.subjects,
                      })
                    ).unwrap(); // 👈 auto throws error if rejected

                    toast({
                      title: "Account created successfully! 🎉",
                      description:
                        "Please check your email to verify your account.",
                    });
                  } catch (err: any) {
                    toast({
                      title: "Error",
                      description: err?.message || "Registration failed",
                      variant: "destructive",
                    });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Field
                          as={Input}
                          name="firstName"
                          id="firstName"
                          placeholder="John"
                          className="h-12 rounded-xl border-2"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Field
                          as={Input}
                          name="lastName"
                          id="lastName"
                          placeholder="Doe"
                          className="h-12 rounded-xl border-2"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Field
                        as={Input}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-12 rounded-xl border-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Exams Selection */}
                    <div className="space-y-2">
                      <Label>Select Exams</Label>
                      <Field name="exams">
                        {({ field, form }: any) => (
                          <div>
                            <Select
                              onValueChange={(val) =>
                                !field.value.includes(val) &&
                                form.setFieldValue("exams", [
                                  ...field.value,
                                  val,
                                ])
                              }
                            >
                              <SelectTrigger className="w-full h-12 rounded-xl border-2">
                                <SelectValue placeholder="Choose exam(s)" />
                              </SelectTrigger>
                              <SelectContent>
                                {examOptions.map((exam) => (
                                  <SelectItem key={exam} value={exam}>
                                    {exam}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {/* Display selected exams as badges */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value.map((exam: string, idx: number) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {exam}
                                  <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() =>
                                      form.setFieldValue(
                                        "exams",
                                        field.value.filter(
                                          (e: string) => e !== exam
                                        )
                                      )
                                    }
                                  />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="exams"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Subjects Selection */}
                    <div className="space-y-2">
                      <Label>Select Subjects</Label>
                      <Field name="subjects">
                        {({ field, form }: any) => (
                          <div>
                            <Select
                              onValueChange={(val) =>
                                !field.value.includes(val) &&
                                form.setFieldValue("subjects", [
                                  ...field.value,
                                  val,
                                ])
                              }
                            >
                              <SelectTrigger className="w-full h-12 rounded-xl border-2">
                                <SelectValue placeholder="Choose subject(s)" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjectOptions.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {/* Display selected subjects as badges */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value.map(
                                (subject: string, idx: number) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {subject}
                                    <X
                                      className="w-3 h-3 cursor-pointer"
                                      onClick={() =>
                                        form.setFieldValue(
                                          "subjects",
                                          field.value.filter(
                                            (s: string) => s !== subject
                                          )
                                        )
                                      }
                                    />
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="subjects"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Field
                        as={Input}
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="h-12 rounded-xl border-2 pr-12"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Field
                        as={Input}
                        name="confirmPassword"
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="h-12 rounded-xl border-2 pr-12"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start space-x-2">
                      <Field
                        type="checkbox"
                        name="terms"
                        id="terms"
                        className="w-4 h-4 mt-1 text-blue-600"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <ErrorMessage
                      name="terms"
                      component="p"
                      className="text-red-500 text-sm"
                    />

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium"
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
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
