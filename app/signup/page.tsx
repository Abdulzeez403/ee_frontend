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
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

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
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();
  const router = useRouter();

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
                  PassRite
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
                    ).unwrap();

                    toast({
                      title: "Success",
                      description: "Account created successfully! 🎉",
                    });
                    router.push("/login");
                  } catch (err: any) {
                    toast({
                      title: "Error",
                      description: error?.toString() || "Registration failed",
                      // variant: "destructive",
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
                                <div
                                  key={idx}
                                  // variant="secondary"
                                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center gap-1"
                                >
                                  {exam}
                                  <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() =>
                                      form.setFieldValue(
                                        "exams",
                                        field.value.filter(
                                          (_: string, i: number) => i !== idx
                                        )
                                      )
                                    }
                                  />
                                </div>
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
                                  <div
                                    key={idx}
                                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center gap-1"
                                  >
                                    {subject}
                                    <X
                                      className="w-3 h-3 cursor-pointer"
                                      onClick={() =>
                                        form.setFieldValue(
                                          "subjects",
                                          field.value.filter(
                                            (_: string, i: number) => i !== idx
                                          )
                                        )
                                      }
                                    />
                                  </div>
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

                    <div className="grid grid-cols-2 gap-4">
                      {/* Password */}
                      <div className="space-y-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <Field
                          as={Input}
                          name="password"
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="h-12 rounded-xl border-2 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2 relative">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Field
                          as={Input}
                          name="confirmPassword"
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="h-12 rounded-xl border-2 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                        <ErrorMessage
                          name="confirmPassword"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
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
