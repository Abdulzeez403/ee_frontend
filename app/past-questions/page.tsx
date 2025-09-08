"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Target,
  ChevronRight,
  ArrowLeft,
  FileText,
  GraduationCap,
  Calendar,
  Users,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  fetchJambQuestions,
  fetchWaecQuestions,
  fetchNecoQuestions,
  fetchPostUtmeQuestions,
} from "@/lib/aloc_api";

const examConfig = {
  waec: {
    name: "WAEC",
    fullName: "West African Examinations Council",
    color: "green",
    years: [
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
    ],
    apiType: "wassce" as const,
    fetchFunction: fetchWaecQuestions,
  },
  neco: {
    name: "NECO",
    fullName: "National Examinations Council",
    color: "blue",
    years: [
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
    ],
    apiType: "neco" as const,
    fetchFunction: fetchNecoQuestions,
  },
  jamb: {
    name: "JAMB",
    fullName: "Joint Admissions and Matriculation Board",
    color: "purple",
    years: [
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
    ],
    apiType: "utme" as const,
    fetchFunction: fetchJambQuestions,
  },
  "post-utme": {
    name: "POST-UTME",
    fullName: "Post Unified Tertiary Matriculation Examination",
    color: "orange",
    years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018"],
    apiType: "post-utme" as const,
    fetchFunction: fetchPostUtmeQuestions,
  },
};

const defaultSubjects = [
  { name: "Mathematics", icon: "📊", questions: 40 },
  { name: "English Language", icon: "📚", questions: 40 },
  { name: "Physics", icon: "⚡", questions: 40 },
  { name: "Chemistry", icon: "🧪", questions: 40 },
  { name: "Biology", icon: "🧬", questions: 40 },
  { name: "Economics", icon: "💰", questions: 40 },
  { name: "Geography", icon: "🌍", questions: 40 },
  { name: "Government", icon: "🏛️", questions: 40 },
];

function PastQuestionsPage() {
  const searchParams = useSearchParams();
  const examType =
    (searchParams.get("exam") as keyof typeof examConfig) || "jamb";

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [isLoading, setIsLoading] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(1000);

  const currentExam = examConfig[examType];

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: "from-green-500 to-emerald-500",
        card: "from-green-50 to-emerald-50",
        badge: "bg-green-100 text-green-700",
        button: "bg-green-600 hover:bg-green-700",
      },
      blue: {
        bg: "from-blue-500 to-cyan-500",
        card: "from-blue-50 to-cyan-50",
        badge: "bg-blue-100 text-blue-700",
        button: "bg-blue-600 hover:bg-blue-700",
      },
      purple: {
        bg: "from-purple-500 to-violet-500",
        card: "from-purple-50 to-violet-50",
        badge: "bg-purple-100 text-purple-700",
        button: "bg-purple-600 hover:bg-purple-700",
      },
      orange: {
        bg: "from-orange-500 to-amber-500",
        card: "from-orange-50 to-amber-50",
        badge: "bg-orange-100 text-orange-700",
        button: "bg-orange-600 hover:bg-orange-700",
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const colorClasses = getColorClasses(currentExam.color);

  const canStartPractice = selectedYear && selectedSubject;
  const selectedSubjectData = subjects.find((s) => s.name === selectedSubject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-gray-900">
                  ExamPrep+
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div
          className={`bg-gradient-to-r ${colorClasses.bg} rounded-3xl p-8 text-white mb-8`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              {examType === "jamb" ? (
                <GraduationCap className="w-12 h-12" />
              ) : (
                <FileText className="w-12 h-12" />
              )}
              <div>
                <h1 className="font-heading font-bold text-4xl mb-2">
                  {currentExam.name} Past Questions
                </h1>
                <p className="text-white/90 text-lg">{currentExam.fullName}</p>
              </div>
            </div>
            <p className="text-white/80 text-lg mb-6">
              Practice with authentic past questions from {currentExam.years[0]}{" "}
              to {currentExam.years[currentExam.years.length - 1]}. Master your
              exam preparation with real questions and detailed explanations.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{currentExam.years.length} Years Available</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{subjects.length} Subjects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{totalQuestions}+ Questions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selection Panel */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl rounded-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Select Practice Options
                </CardTitle>
                <p className="text-gray-600">
                  Choose your year and subject to start practicing
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Year Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Year
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose examination year" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentExam.years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year} {year === currentExam.years[0] && "(Latest)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Subject
                  </label>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.name} value={subject.name}>
                          <div className="flex items-center gap-2">
                            <span>{subject.icon}</span>
                            <span>{subject.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Practice Summary */}
                {canStartPractice && (
                  <div
                    className={`bg-gradient-to-r ${colorClasses.card} rounded-xl p-4 border`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Practice Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exam:</span>
                        <Badge className={colorClasses.badge}>
                          {currentExam.name}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium">{selectedYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">{selectedSubject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Questions:</span>
                        <span className="font-medium">
                          {selectedSubjectData?.questions}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Start Practice Button */}
                <Link
                  href={
                    canStartPractice
                      ? `/quiz?id=${selectedSubject
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}-${selectedYear}&type=past-question&exam=${examType}`
                      : "#"
                  }
                  className={canStartPractice ? "" : "pointer-events-none"}
                >
                  <Button
                    className={`w-full h-12 rounded-xl ${colorClasses.button} ${
                      !canStartPractice ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!canStartPractice}
                  >
                    {canStartPractice ? (
                      <>
                        Start Practice
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      "Select Year & Subject"
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Subjects Grid */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2">
                Available Subjects
              </h2>
              <p className="text-gray-600">
                Click on any subject to select it for practice
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading subjects...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {subjects.map((subject) => (
                  <Card
                    key={subject.name}
                    className={`border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer group ${
                      selectedSubject === subject.name
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setSelectedSubject(subject.name)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <span className="text-2xl">{subject.icon}</span>
                        </div>
                        <Badge className={colorClasses.badge}>
                          {subject.questions} Questions
                        </Badge>
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">
                        {subject.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Practice with {subject.questions} carefully selected
                        questions from past {currentExam.name} examinations
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>
                            ~{Math.ceil(subject.questions * 1.5)} mins
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Target className="w-4 h-4" />
                          <span>All Levels</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {currentExam.years.length} Years
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Past questions available
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {subjects.length} Subjects
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive coverage
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {totalQuestions}+
                  </h3>
                  <p className="text-gray-600 text-sm">Practice questions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainPastQuestionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PastQuestionsPage />
    </Suspense>
  );
}
