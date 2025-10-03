"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Download,
  Share,
  Calendar,
  CheckCircle,
  Star,
  Medal,
  Trophy,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Certification {
  id: string;
  title: string;
  organization: string;
  dateEarned: string;
  validUntil: string;
  status: "valid" | "expiring" | "expired";
  badgeColor: string;
  description: string;
  skills: string[];
}

export default function CertificationScreen() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      title: "ASHA Certified Health Worker",
      organization: "Ministry of Health & Family Welfare",
      dateEarned: "2023-06-15",
      validUntil: "2026-06-15",
      status: "valid",
      badgeColor: "bg-green-500",
      description:
        "Certified to provide basic healthcare services in rural communities",
      skills: ["Primary Healthcare", "Community Outreach", "Health Education"],
    },
    {
      id: "2",
      title: "Digital Health Literacy",
      organization: "Digital India Health Mission",
      dateEarned: "2023-08-20",
      validUntil: "2025-08-20",
      status: "valid",
      badgeColor: "bg-blue-500",
      description: "Proficient in using digital tools for healthcare delivery",
      skills: ["Digital Tools", "Data Management", "Telemedicine"],
    },
    {
      id: "3",
      title: "Maternal Health Specialist",
      organization: "National Health Mission",
      dateEarned: "2023-03-10",
      validUntil: "2024-12-31",
      status: "expiring",
      badgeColor: "bg-orange-500",
      description: "Specialized training in maternal and child healthcare",
      skills: ["Prenatal Care", "Postnatal Care", "Child Health"],
    },
    {
      id: "4",
      title: "Emergency Response Training",
      organization: "Indian Red Cross Society",
      dateEarned: "2022-11-05",
      validUntil: "2023-11-05",
      status: "expired",
      badgeColor: "bg-red-500",
      description: "Training in emergency medical response and first aid",
      skills: ["First Aid", "Emergency Response", "CPR"],
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "expiring":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "expired":
        return <Clock className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Valid";
      case "expiring":
        return "Expiring Soon";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "text-green-600 bg-green-50 border-green-200";
      case "expiring":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "expired":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Certifications
              </h1>
              <p className="text-sm text-gray-500">प्रमाणपत्र और बैज</p>
            </div>
          </div>

          <Award className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {certifications.filter((c) => c.status === "valid").length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Medal className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {certifications.length}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-600">Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Certifications List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Certifications
          </h2>

          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Badge */}
                    <div
                      className={`w-16 h-16 ${cert.badgeColor} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <FileText className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {cert.organization}
                          </p>
                          <p className="text-sm text-gray-700 mb-3">
                            {cert.description}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Dates */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                Earned:{" "}
                                {new Date(cert.dateEarned).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                Valid until:{" "}
                                {new Date(cert.validUntil).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col items-end gap-3 ml-4">
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              cert.status
                            )}`}
                          >
                            {getStatusIcon(cert.status)}
                            {getStatusText(cert.status)}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Renewal Reminders */}
        {certifications.some(
          (c) => c.status === "expiring" || c.status === "expired"
        ) && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Action Required
              </h3>

              <div className="space-y-3">
                {certifications
                  .filter(
                    (c) => c.status === "expiring" || c.status === "expired"
                  )
                  .map((cert) => (
                    <div
                      key={cert.id}
                      className={`p-4 rounded-lg border ${getStatusColor(
                        cert.status
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{cert.title}</p>
                          <p className="text-sm">
                            {cert.status === "expiring"
                              ? `Expires on ${new Date(
                                  cert.validUntil
                                ).toLocaleDateString()}`
                              : `Expired on ${new Date(
                                  cert.validUntil
                                ).toLocaleDateString()}`}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Renew Now
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Certifications */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available Certifications
            </h3>

            <div className="space-y-3">
              {[
                {
                  title: "Advanced Digital Health",
                  description:
                    "Advanced training in digital health technologies",
                  duration: "6 weeks",
                  level: "Advanced",
                },
                {
                  title: "Mental Health First Aid",
                  description: "Basic mental health support and intervention",
                  duration: "3 weeks",
                  level: "Beginner",
                },
                {
                  title: "Nutrition & Wellness",
                  description: "Community nutrition and wellness promotion",
                  duration: "4 weeks",
                  level: "Intermediate",
                },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{cert.title}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {cert.description}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>Duration: {cert.duration}</span>
                        <span>Level: {cert.level}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Enroll
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
