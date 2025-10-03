"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Play,
  Clock,
  CheckCircle,
  BookOpen,
  Video,
  FileText,
  ArrowLeft,
  Search,
  Filter,
  Award,
  Download,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trainingModules = [
  {
    id: "1",
    title: "Managing Pregnancy Complications",
    description:
      "Learn to identify and manage common pregnancy complications in rural settings",
    duration: "45 mins",
    type: "video",
    difficulty: "Intermediate",
    progress: 100,
    completed: true,
    rating: 4.8,
    category: "Maternal Health",
  },
  {
    id: "2",
    title: "Child Immunization Schedule",
    description:
      "Complete guide to childhood immunization protocols and documentation",
    duration: "30 mins",
    type: "interactive",
    difficulty: "Beginner",
    progress: 75,
    completed: false,
    rating: 4.9,
    category: "Child Health",
  },
  {
    id: "3",
    title: "Tuberculosis Detection & Management",
    description:
      "Recognizing TB symptoms, DOTS therapy, and patient counseling",
    duration: "60 mins",
    type: "video",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    rating: 4.7,
    category: "Communicable Diseases",
  },
  {
    id: "4",
    title: "Digital Health Records",
    description: "Using ASHA Ki Kiran effectively - tips and best practices",
    duration: "25 mins",
    type: "tutorial",
    difficulty: "Beginner",
    progress: 100,
    completed: true,
    rating: 4.6,
    category: "Technology",
  },
  {
    id: "5",
    title: "Emergency Response Protocols",
    description: "Handling medical emergencies and when to refer patients",
    duration: "40 mins",
    type: "video",
    difficulty: "Advanced",
    progress: 30,
    completed: false,
    rating: 4.8,
    category: "Emergency Care",
  },
  {
    id: "6",
    title: "Mental Health Awareness",
    description: "Identifying mental health issues and providing basic support",
    duration: "35 mins",
    type: "interactive",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    rating: 4.5,
    category: "Mental Health",
  },
];

const quickTips = [
  {
    id: "1",
    title: "Voice Command Shortcuts",
    description:
      'Say "Add medication" to quickly add medicines to patient records',
    icon: "🎤",
    category: "App Tips",
  },
  {
    id: "2",
    title: "Offline Mode",
    description:
      "All patient data remains accessible even without internet connection",
    icon: "📱",
    category: "App Tips",
  },
  {
    id: "3",
    title: "Blood Pressure Reading",
    description:
      "Normal BP: 120/80 mmHg. Anything above 140/90 needs attention",
    icon: "🩺",
    category: "Clinical",
  },
  {
    id: "4",
    title: "Fever Management",
    description: "Temperature above 100.4°F (38°C) is considered fever",
    icon: "🌡️",
    category: "Clinical",
  },
];

const typeIcons = {
  video: Video,
  interactive: BookOpen,
  tutorial: FileText,
};

const difficultyColors = {
  Beginner: "text-green-600 bg-green-100",
  Intermediate: "text-yellow-600 bg-yellow-100",
  Advanced: "text-red-600 bg-red-100",
};

export default function TrainingScreen() {
  const [activeTab, setActiveTab] = useState("modules");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Maternal Health",
    "Child Health",
    "Technology",
    "Emergency Care",
    "Mental Health",
  ];

  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      searchQuery === "" ||
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || module.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const completedModules = trainingModules.filter((m) => m.completed).length;
  const totalProgress = Math.round(
    trainingModules.reduce((sum, m) => sum + m.progress, 0) /
      trainingModules.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-primary to-secondary px-6 pt-12 pb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <Link href="/profile">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <h1 className="text-xl font-bold text-white">Training</h1>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Award className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Summary */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Your Progress
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {completedModules} of {trainingModules.length} modules
                  completed
                </p>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {totalProgress}% overall progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("modules")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "modules"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Training Modules
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "tips"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Quick Tips
          </button>
        </div>

        {activeTab === "modules" ? (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search training modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category === "all" ? "All Categories" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Training Modules */}
            <div className="space-y-4">
              {filteredModules.map((module, index) => {
                const TypeIcon =
                  typeIcons[module.type as keyof typeof typeIcons];

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Module Icon */}
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <TypeIcon className="w-6 h-6 text-primary" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {module.title}
                              </h3>
                              {module.completed && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>

                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                              {module.description}
                            </p>

                            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {module.duration}
                              </div>

                              <span
                                className={`px-2 py-1 rounded-full ${
                                  difficultyColors[
                                    module.difficulty as keyof typeof difficultyColors
                                  ]
                                }`}
                              >
                                {module.difficulty}
                              </span>

                              <div className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                {module.rating}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            {module.progress > 0 && (
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{module.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${module.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant={
                                  module.completed ? "outline" : "default"
                                }
                              >
                                {module.completed ? (
                                  <>
                                    <Play className="w-3 h-3 mr-1" />
                                    Review
                                  </>
                                ) : module.progress > 0 ? (
                                  <>
                                    <Play className="w-3 h-3 mr-1" />
                                    Continue
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3 h-3 mr-1" />
                                    Start
                                  </>
                                )}
                              </Button>

                              <Button size="sm" variant="ghost">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {quickTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{tip.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tip.description}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {tip.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
