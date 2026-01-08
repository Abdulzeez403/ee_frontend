"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Users,
  BookOpen,
  TrendingUp,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Save,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "suspended";
  coins: number;
  streak: number;
}

interface Question {
  id: number;
  subject: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "approved" | "pending" | "rejected";
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    status: "active" as const,
  });
  const [newQuestion, setNewQuestion] = useState({
    subject: "",
    topic: "",
    difficulty: "Medium" as const,
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  // Mock data with enhanced structure
  const stats = {
    totalUsers: 12847,
    activeUsers: 8932,
    totalQuestions: 2456,
    completedQuizzes: 45678,
  };

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Adebayo Johnson",
      email: "adebayo@email.com",
      status: "active",
      coins: 1250,
      streak: 7,
    },
    {
      id: 2,
      name: "Fatima Okafor",
      email: "fatima@email.com",
      status: "active",
      coins: 890,
      streak: 12,
    },
    {
      id: 3,
      name: "Chidi Nwankwo",
      email: "chidi@email.com",
      status: "suspended",
      coins: 450,
      streak: 0,
    },
    {
      id: 4,
      name: "Aisha Bello",
      email: "aisha@email.com",
      status: "active",
      coins: 2100,
      streak: 15,
    },
  ]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "Medium",
      status: "approved",
      question: "What is the value of x in 2x + 5 = 15?",
      options: ["5", "10", "7.5", "12"],
      correctAnswer: 0,
    },
    {
      id: 2,
      subject: "English",
      topic: "Grammar",
      difficulty: "Easy",
      status: "pending",
      question: "Which of the following is a noun?",
      options: ["Run", "Beautiful", "House", "Quickly"],
      correctAnswer: 2,
    },
    {
      id: 3,
      subject: "Physics",
      topic: "Mechanics",
      difficulty: "Hard",
      status: "approved",
      question: "What is Newton's second law of motion?",
      options: ["F = ma", "E = mc²", "v = u + at", "s = ut + ½at²"],
      correctAnswer: 0,
    },
    {
      id: 4,
      subject: "Chemistry",
      topic: "Organic",
      difficulty: "Medium",
      status: "rejected",
      question: "What is the molecular formula of methane?",
      options: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"],
      correctAnswer: 0,
    },
  ]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const user: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: newUser.name,
      email: newUser.email,
      status: newUser.status,
      coins: 0,
      streak: 0,
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", status: "active" });
    setIsAddUserModalOpen(false);
    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
    toast({
      title: "Success",
      description: "User updated successfully",
    });
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "suspended" : "active",
            }
          : user
      )
    );
    toast({
      title: "Success",
      description: "User status updated",
    });
  };

  const handleAddQuestion = () => {
    if (
      !newQuestion.subject ||
      !newQuestion.question ||
      newQuestion.options.some((opt) => !opt.trim())
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const question: Question = {
      id: Math.max(...questions.map((q) => q.id)) + 1,
      ...newQuestion,
      status: "pending",
    };

    setQuestions([...questions, question]);
    setNewQuestion({
      subject: "",
      topic: "",
      difficulty: "Medium",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setIsAddQuestionModalOpen(false);
    toast({
      title: "Success",
      description: "Question added successfully",
    });
  };

  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setIsEditQuestionModalOpen(true);
  };

  const handleUpdateQuestion = () => {
    if (!selectedQuestion) return;

    setQuestions(
      questions.map((q) =>
        q.id === selectedQuestion.id ? selectedQuestion : q
      )
    );
    setIsEditQuestionModalOpen(false);
    setSelectedQuestion(null);
    toast({
      title: "Success",
      description: "Question updated successfully",
    });
  };

  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    toast({
      title: "Success",
      description: "Question deleted successfully",
    });
  };

  const handleApproveQuestion = (questionId: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, status: "approved" as const } : q
      )
    );
    toast({
      title: "Success",
      description: "Question approved",
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Overview Tab */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-90">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.activeUsers.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-90">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">
                    Total Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalQuestions.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-90">+156 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">
                    Completed Quizzes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.completedQuizzes.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-90">+23% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-xs text-gray-500">
                        Kemi Adebayo joined 2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Quiz completed</p>
                      <p className="text-xs text-gray-500">
                        Mathematics quiz by Tunde Okafor
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Question submitted</p>
                      <p className="text-xs text-gray-500">
                        Physics question pending review
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Server load is higher than usual. Consider scaling
                      resources.
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Database backup completed successfully at 2:00 AM.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Users Tab */}
          {/* <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  User Management
                </h2>
                <p className="text-gray-600">
                  Manage user accounts and permissions
                </p>
              </div>
              <Dialog
                open={isAddUserModalOpen}
                onOpenChange={setIsAddUserModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account for the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newUser.status}
                        onValueChange={(value: "active" | "suspended") =>
                          setNewUser({ ...newUser, status: value as any })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddUserModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddUser}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          User
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Coins
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Streak
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder-32px.png`} />
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-medium text-yellow-600">
                              {user.coins}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">
                              {user.streak} days
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-blue-50"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                className="hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleUserStatus(user.id)}
                                className="hover:bg-red-50"
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Dialog
              open={isEditUserModalOpen}
              onOpenChange={setIsEditUserModalOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                    Update user information and settings.
                  </DialogDescription>
                </DialogHeader>
                {selectedUser && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input
                        id="edit-name"
                        value={selectedUser.name}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-coins">Coins</Label>
                      <Input
                        id="edit-coins"
                        type="number"
                        value={selectedUser.coins}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            coins: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-streak">Streak (days)</Label>
                      <Input
                        id="edit-streak"
                        type="number"
                        value={selectedUser.streak}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            streak: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditUserModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateUser}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent> */}

          {/* Questions Tab */}
          {/* <TabsContent value="questions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Question Management
                </h2>
                <p className="text-gray-600">
                  Review and manage quiz questions
                </p>
              </div>
              <Dialog
                open={isAddQuestionModalOpen}
                onOpenChange={setIsAddQuestionModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Question</DialogTitle>
                    <DialogDescription>
                      Create a new quiz question for the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                          value={newQuestion.subject}
                          onValueChange={(value) =>
                            setNewQuestion({ ...newQuestion, subject: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">
                              Mathematics
                            </SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="topic">Topic</Label>
                        <Input
                          id="topic"
                          value={newQuestion.topic}
                          onChange={(e) =>
                            setNewQuestion({
                              ...newQuestion,
                              topic: e.target.value,
                            })
                          }
                          placeholder="Enter topic"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={newQuestion.difficulty}
                        onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                          setNewQuestion({
                            ...newQuestion,
                            difficulty: value as any,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="question">Question</Label>
                      <Textarea
                        id="question"
                        value={newQuestion.question}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            question: e.target.value,
                          })
                        }
                        placeholder="Enter the question"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Answer Options</Label>
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...newQuestion.options];
                              newOptions[index] = e.target.value;
                              setNewQuestion({
                                ...newQuestion,
                                options: newOptions,
                              });
                            }}
                            placeholder={`Option ${index + 1}`}
                          />
                          <Button
                            type="button"
                            variant={
                              newQuestion.correctAnswer === index
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setNewQuestion({
                                ...newQuestion,
                                correctAnswer: index,
                              })
                            }
                            className={
                              newQuestion.correctAnswer === index
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }
                          >
                            {newQuestion.correctAnswer === index
                              ? "Correct"
                              : "Mark Correct"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddQuestionModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddQuestion}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Subject
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Topic
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Difficulty
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((question) => (
                        <tr
                          key={question.id}
                          className="border-b hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="p-4 font-medium text-gray-900">
                            {question.subject}
                          </td>
                          <td className="p-4 text-gray-700">
                            {question.topic}
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                question.difficulty === "Easy"
                                  ? "secondary"
                                  : question.difficulty === "Medium"
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                question.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800"
                                  : question.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {question.difficulty}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                question.status === "approved"
                                  ? "default"
                                  : question.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className={
                                question.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : question.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {question.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-blue-50"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditQuestion(question)}
                                className="hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              {question.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleApproveQuestion(question.id)
                                  }
                                  className="hover:bg-green-50 text-green-600"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteQuestion(question.id)
                                }
                                className="hover:bg-red-50 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Dialog
              open={isEditQuestionModalOpen}
              onOpenChange={setIsEditQuestionModalOpen}
            >
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Question</DialogTitle>
                  <DialogDescription>
                    Update question information and settings.
                  </DialogDescription>
                </DialogHeader>
                {selectedQuestion && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-subject">Subject</Label>
                        <Select
                          value={selectedQuestion.subject}
                          onValueChange={(value) =>
                            setSelectedQuestion({
                              ...selectedQuestion,
                              subject: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">
                              Mathematics
                            </SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-topic">Topic</Label>
                        <Input
                          id="edit-topic"
                          value={selectedQuestion.topic}
                          onChange={(e) =>
                            setSelectedQuestion({
                              ...selectedQuestion,
                              topic: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-difficulty">Difficulty</Label>
                      <Select
                        value={selectedQuestion.difficulty}
                        onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                          setSelectedQuestion({
                            ...selectedQuestion,
                            difficulty: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-question">Question</Label>
                      <Textarea
                        id="edit-question"
                        value={selectedQuestion.question}
                        onChange={(e) =>
                          setSelectedQuestion({
                            ...selectedQuestion,
                            question: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Answer Options</Label>
                      {selectedQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...selectedQuestion.options];
                              newOptions[index] = e.target.value;
                              setSelectedQuestion({
                                ...selectedQuestion,
                                options: newOptions,
                              });
                            }}
                            placeholder={`Option ${index + 1}`}
                          />
                          <Button
                            type="button"
                            variant={
                              selectedQuestion.correctAnswer === index
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setSelectedQuestion({
                                ...selectedQuestion,
                                correctAnswer: index,
                              })
                            }
                            className={
                              selectedQuestion.correctAnswer === index
                                ? "bg-green-600 hover:bg-green-700"
                                : ""
                            }
                          >
                            {selectedQuestion.correctAnswer === index
                              ? "Correct"
                              : "Mark Correct"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditQuestionModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateQuestion}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Question
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent> */}

          {/* Analytics Tab */}
          {/* <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
              <p className="text-gray-600">
                Track platform performance and user engagement
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Subject Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mathematics</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">English</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Physics</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chemistry</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    User Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="text-sm font-medium">8,932</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quiz Completion Rate</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Session Time</span>
                      <span className="text-sm font-medium">24 min</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Retention (7-day)</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators for the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      94.2%
                    </div>
                    <p className="text-sm text-gray-600">System Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      1.2s
                    </div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      4.8/5
                    </div>
                    <p className="text-sm text-gray-600">User Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
