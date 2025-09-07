"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronRight, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

const exams = [
  {
    name: "WAEC",
    years: "2015-2024",
    availableYears: "10 Years",
    desc: "West African Examinations Council past questions",
    href: "/past-questions?exam=waec",
    icon: FileText,
    color: "green",
    gradient: "from-green-50 to-emerald-50",
  },
  {
    name: "NECO",
    years: "2015-2024",
    availableYears: "10 Years",
    desc: "National Examinations Council past questions",
    href: "/past-questions?exam=neco",
    icon: FileText,
    color: "blue",
    gradient: "from-blue-50 to-cyan-50",
  },
  {
    name: "JAMB",
    years: "2010-2024",
    availableYears: "15 Years",
    desc: "Joint Admissions and Matriculation Board",
    href: "/past-questions?exam=jamb",
    icon: GraduationCap,
    color: "purple",
    gradient: "from-purple-50 to-violet-50",
  },
  {
    name: "POST-UTME",
    years: "2018-2024",
    availableYears: "7 Years",
    desc: "University screening examination questions",
    href: "/past-questions?exam=post-utme",
    icon: GraduationCap,
    color: "orange",
    gradient: "from-orange-50 to-amber-50",
  },
];

export default function PastQuestionSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-gray-900">
          Practice Past Questions
        </h2>
        <span className="text-gray-500 text-sm">Choose your exam type</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {exams.map((exam) => {
          const Icon = exam.icon;
          return (
            <Card
              key={exam.name}
              className={`border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br ${exam.gradient}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-${exam.color}-100 rounded-xl flex items-center justify-center group-hover:bg-${exam.color}-200 transition-colors`}
                  >
                    <Icon className={`w-6 h-6 text-${exam.color}-600`} />
                  </div>
                  <Badge
                    className={`bg-${exam.color}-100 text-${exam.color}-700 border-${exam.color}-200`}
                  >
                    {exam.years}
                  </Badge>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {exam.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{exam.desc}</p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-500">Available Years</span>
                  <span className={`font-medium text-${exam.color}-600`}>
                    {exam.availableYears}
                  </span>
                </div>
                <Link href={exam.href}>
                  <Button
                    size="sm"
                    className={`w-full bg-${exam.color}-600 hover:bg-${exam.color}-700 text-white`}
                  >
                    Start Practice
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
