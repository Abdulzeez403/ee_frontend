"use client";

import { useState } from "react";
import { AdminNav } from "@/components/admin-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const subjectsData = [
  {
    id: 1,
    name: "Mathematics",
    icon: "📊",
    questionCount: 45,
    questions: [
      {
        id: 1,
        question: "If 2x + 3 = 11, what is the value of x?",
        options: ["A) 2", "B) 4", "C) 6", "D) 8"],
        correctAnswer: "B",
        difficulty: "Easy",
        exam: "JAMB",
      },
      {
        id: 2,
        question: "What is the derivative of x²?",
        options: ["A) x", "B) 2x", "C) x²", "D) 2x²"],
        correctAnswer: "B",
        difficulty: "Medium",
        exam: "JAMB",
      },
      {
        id: 3,
        question: "Solve for y: 3y - 7 = 14",
        options: ["A) 5", "B) 7", "C) 9", "D) 11"],
        correctAnswer: "B",
        difficulty: "Easy",
        exam: "WAEC",
      },
    ],
  },
  {
    id: 2,
    name: "English Language",
    icon: "📚",
    questionCount: 38,
    questions: [
      {
        id: 4,
        question: "Choose the correct synonym for 'abundant':",
        options: ["A) Scarce", "B) Plentiful", "C) Limited", "D) Rare"],
        correctAnswer: "B",
        difficulty: "Medium",
        exam: "JAMB",
      },
      {
        id: 5,
        question:
          "Identify the figure of speech: 'The wind whispered through the trees'",
        options: [
          "A) Metaphor",
          "B) Simile",
          "C) Personification",
          "D) Hyperbole",
        ],
        correctAnswer: "C",
        difficulty: "Medium",
        exam: "WAEC",
      },
    ],
  },
  {
    id: 3,
    name: "Physics",
    icon: "⚡",
    questionCount: 32,
    questions: [
      {
        id: 6,
        question: "What is the unit of electric current?",
        options: ["A) Volt", "B) Ampere", "C) Ohm", "D) Watt"],
        correctAnswer: "B",
        difficulty: "Easy",
        exam: "JAMB",
      },
      {
        id: 7,
        question: "The acceleration due to gravity is approximately:",
        options: ["A) 9.8 m/s²", "B) 10.8 m/s²", "C) 8.9 m/s²", "D) 11.2 m/s²"],
        correctAnswer: "A",
        difficulty: "Easy",
        exam: "WAEC",
      },
    ],
  },
  {
    id: 4,
    name: "Chemistry",
    icon: "🧪",
    questionCount: 29,
    questions: [
      {
        id: 8,
        question: "What is the chemical symbol for Gold?",
        options: ["A) Go", "B) Gd", "C) Au", "D) Ag"],
        correctAnswer: "C",
        difficulty: "Easy",
        exam: "JAMB",
      },
    ],
  },
  {
    id: 5,
    name: "Biology",
    icon: "🧬",
    questionCount: 35,
    questions: [
      {
        id: 9,
        question: "Which organelle is known as the powerhouse of the cell?",
        options: [
          "A) Nucleus",
          "B) Mitochondria",
          "C) Ribosome",
          "D) Golgi apparatus",
        ],
        correctAnswer: "B",
        difficulty: "Medium",
        exam: "JAMB",
      },
    ],
  },
];

export default function AdminQuestionsPage() {
  const [expandedSubjects, setExpandedSubjects] = useState<number[]>([1]);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSubject = (subjectId: number) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getExamColor = (exam: string) => {
    switch (exam) {
      case "JAMB":
        return "bg-blue-100 text-blue-700";
      case "WAEC":
        return "bg-purple-100 text-purple-700";
      case "NECO":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className=" p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Question Management
          </h1>
          <p className="text-gray-600">
            Create and manage quiz questions organized by subjects
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectsData.map((subject) => (
                        <SelectItem key={subject.id} value={subject.name}>
                          {subject.icon} {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Textarea placeholder="Enter your question here..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="optionA">Option A</Label>
                    <Input placeholder="Option A" />
                  </div>
                  <div>
                    <Label htmlFor="optionB">Option B</Label>
                    <Input placeholder="Option B" />
                  </div>
                  <div>
                    <Label htmlFor="optionC">Option C</Label>
                    <Input placeholder="Option C" />
                  </div>
                  <div>
                    <Label htmlFor="optionD">Option D</Label>
                    <Input placeholder="Option D" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="correct">Correct Answer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="exam">Exam Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JAMB">JAMB</SelectItem>
                        <SelectItem value="WAEC">WAEC</SelectItem>
                        <SelectItem value="NECO">NECO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddQuestionOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddQuestionOpen(false)}>
                    Add Question
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {subjectsData.map((subject) => (
            <Card key={subject.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSubject(subject.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expandedSubjects.includes(subject.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                    <div className="text-2xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {subject.questionCount} questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {subject.questionCount} Questions
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <BookOpen className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedSubjects.includes(subject.id) && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {subject.questions.map((question) => (
                      <div
                        key={question.id}
                        className="p-4 border rounded-lg bg-white"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="font-medium mb-2">
                              {question.question}
                            </p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className={getDifficultyColor(
                                  question.difficulty
                                )}
                              >
                                {question.difficulty}
                              </Badge>
                              <Badge className={getExamColor(question.exam)}>
                                {question.exam}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          {question.options.map((option, index) => (
                            <p
                              key={index}
                              className={
                                option.startsWith(question.correctAnswer)
                                  ? "font-medium text-green-700 bg-green-50 px-2 py-1 rounded"
                                  : ""
                              }
                            >
                              {option}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
