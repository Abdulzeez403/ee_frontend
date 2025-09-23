"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardNav } from "@/components/dashboard-nav";
import {
  Brain,
  Send,
  Sparkles,
  BookOpen,
  GraduationCap,
  Target,
  ArrowLeft,
  Lightbulb,
  Clock,
  Zap,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import App from "next/app";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  examType?: string;
}

interface ExamType {
  id: string;
  name: string;
  fullName: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

const examTypes: ExamType[] = [
  {
    id: "jamb",
    name: "JAMB",
    fullName: "Joint Admissions and Matriculation Board",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "University entrance examination",
  },
  {
    id: "waec",
    name: "WAEC",
    fullName: "West African Examinations Council",
    color: "bg-gradient-to-br from-green-400 to-emerald-600",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Senior Secondary Certificate Examination",
  },
  {
    id: "neco",
    name: "NECO",
    fullName: "National Examinations Council",
    color: "bg-gradient-to-br from-blue-400 to-cyan-600",
    icon: <Target className="w-6 h-6" />,
    description: "Senior School Certificate Examination",
  },
  {
    id: "post-utme",
    name: "POST-UTME",
    fullName: "Post Unified Tertiary Matriculation Examination",
    color: "bg-gradient-to-br from-orange-400 to-red-500",
    icon: <Sparkles className="w-6 h-6" />,
    description: "University screening examination",
  },
];

const sampleQuestions = [
  "Explain the concept of photosynthesis in plants",
  "What are the causes of the Nigerian Civil War?",
  "Solve: If 2x + 5 = 13, find the value of x",
  "Describe the structure and function of the human heart",
  "What is the difference between ionic and covalent bonds?",
];

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.auth);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      examType: selectedExam || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue, selectedExam),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (
    question: string,
    examType: string | null
  ): string => {
    const responses = [
      `Great question! Let me break this down for you step by step. This is particularly important for ${
        examType ? examTypes.find((e) => e.id === examType)?.name : "your exam"
      } preparation.`,
      `I'd be happy to help you understand this concept. This topic frequently appears in ${
        examType ? examTypes.find((e) => e.id === examType)?.name : "exam"
      } questions.`,
      `Excellent! This is a fundamental concept you'll need to master. Let me explain it in a way that's easy to remember for your ${
        examType ? examTypes.find((e) => e.id === examType)?.name : "exam"
      }.`,
      `This is a really important topic for your studies. Here's how I'd approach this question in an ${
        examType ? examTypes.find((e) => e.id === examType)?.name : "exam"
      } context.`,
    ];

    return (
      responses[Math.floor(Math.random() * responses.length)] +
      "\n\nKey points to remember:\n• Focus on understanding the core concept\n• Practice with similar questions\n• Review regularly for better retention\n\nWould you like me to provide some practice questions on this topic?"
    );
  };

  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: `Perfect! I'm now focused on helping you with ${
        examTypes.find((e) => e.id === examId)?.fullName
      } (${
        examTypes.find((e) => e.id === examId)?.name
      }) preparation. Ask me anything about your subjects, and I'll provide detailed explanations tailored for your exam success!`,
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  if (!selectedExam) {
    return (
      <div className="min-h-screen ai-tutor-gradient">
        <div className="container mx-auto px-4 py-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboards">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-white/90 rounded-full shadow-2xl">
                <Brain className="w-12 h-12 text-purple-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance">
              AI Tutor
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              Your Smart Study Companion
            </p>
            <p className="text-lg text-white/80 mb-12 text-pretty max-w-2xl mx-auto">
              Get instant help with JAMB, WAEC, NECO, and POST-UTME questions.
              Ask anything and receive detailed explanations tailored for exam
              success! 🚀
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Choose Your Exam
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {examTypes
                .filter((c) => user?.exams?.includes(c.name))
                .map((exam) => (
                  <Card
                    key={exam.id}
                    className="ai-tutor-card-gradient border-0 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-2xl hover:shadow-3xl"
                    onClick={() => handleExamSelect(exam.id)}
                  >
                    <div className="p-8">
                      <div className="flex items-start gap-6">
                        <div
                          className={`${exam.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          {exam.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {exam.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 font-medium">
                            {exam.fullName}
                          </p>
                          <p className="text-gray-700 text-base">
                            {exam.description}
                          </p>
                          <div className="mt-4 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 font-medium">
                              AI-Powered Learning
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
          {/* 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Instant Explanations
              </h3>
              <p className="text-white/80 leading-relaxed">
                Get detailed explanations for any question, concept, or topic in
                seconds
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                24/7 Available
              </h3>
              <p className="text-white/80 leading-relaxed">
                Study anytime, anywhere with your personal AI tutor that never
                sleeps
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mb-6 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Exam-Focused
              </h3>
              <p className="text-white/80 leading-relaxed">
                Tailored responses specifically for Nigerian examination
                requirements
              </p>
            </div>
          </div> */}
        </div>
        <DashboardNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen ai-tutor-gradient flex flex-col">
      <div className="border-b border-white/20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedExam(null)}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-4">
                <div
                  className={`${
                    examTypes.find((e) => e.id === selectedExam)?.color
                  } p-3 rounded-xl shadow-lg`}
                >
                  {examTypes.find((e) => e.id === selectedExam)?.icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {examTypes.find((e) => e.id === selectedExam)?.name} AI
                    Tutor
                  </h1>
                  <p className="text-sm text-white/80">
                    Ask me anything about your exam
                  </p>
                </div>
              </div>
            </div>
            <Badge className="bg-green-500 text-white border-0 shadow-lg">
              <Zap className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 pb-32">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150"></div>
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/90 rounded-full shadow-2xl">
                  <Brain className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                Ready to help you succeed!
              </h3>
              <p className="text-white/80 mb-8 text-lg">
                Ask me any question about your{" "}
                {examTypes.find((e) => e.id === selectedExam)?.name} preparation
              </p>

              <div className="max-w-3xl mx-auto">
                <p className="text-white/70 mb-6 font-medium">Try asking:</p>
                <div className="grid gap-4">
                  {sampleQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="text-left justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-auto py-4 px-6 rounded-xl backdrop-blur-sm"
                      onClick={() => handleSampleQuestion(question)}
                    >
                      <Sparkles className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-400" />
                      <span className="text-base">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 mb-8 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-lg ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    : "bg-white/90 text-gray-800 backdrop-blur-sm"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-3 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">You</span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/90 rounded-2xl px-6 py-4 backdrop-blur-sm shadow-lg">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-white/20 bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto">
          <div className="flex gap-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask me anything about ${
                examTypes.find((e) => e.id === selectedExam)?.name
              }...`}
              className="flex-1 bg-white/90 border-0 text-gray-800 placeholder:text-gray-500 rounded-xl shadow-lg backdrop-blur-sm"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-lg px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
