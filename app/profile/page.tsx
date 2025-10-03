"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Shield,
  Globe,
  Mic,
  RefreshCw,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Edit3,
  Phone,
  MapPin,
  Mail,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const profileData = {
  name: "Priya Kumari",
  role: "ASHA Worker",
  id: "AW-12345",
  phone: "+91 98765 43210",
  email: "priya.kumari@asha.gov.in",
  village: "Kumhari, Durg District",
  state: "Chhattisgarh",
  experience: "3 years",
  certification: "ASHA Certified - 2021",
  supervisor: "Dr. Neha Agarwal",
  patientsManaged: 45,
};

const settingsSections = [
  {
    title: "Account",
    items: [
      {
        icon: User,
        label: "Edit Profile",
        href: "/profile-settings",
        description: "Update personal information",
      },
      {
        icon: Shield,
        label: "Privacy & Security",
        href: "/profile/security",
        description: "PIN, biometric settings",
      },
      {
        icon: Bell,
        label: "Notifications",
        href: "/profile/notifications",
        description: "Reminder and alert preferences",
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        icon: Globe,
        label: "Language",
        href: "/profile/language",
        description: "हिंदी • Change language",
      },
      {
        icon: Mic,
        label: "Voice Settings",
        href: "/profile/voice",
        description: "Voice commands and recognition",
      },
      {
        icon: RefreshCw,
        label: "Sync Preferences",
        href: "/profile/sync",
        description: "Data synchronization options",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: HelpCircle,
        label: "Help & Training",
        href: "/training",
        description: "Tutorials and quick tips",
      },
      {
        icon: Award,
        label: "Certification",
        href: "/profile/certification",
        description: "View certificates and badges",
      },
      {
        icon: LogOut,
        label: "Sign Out",
        href: "/logout",
        description: "Logout from this device",
      },
    ],
  },
];

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-primary to-secondary px-6 pt-12 pb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-white hover:bg-white/20"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-600" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {profileData.name}
                </h2>
                <p className="text-primary font-medium mb-1">
                  {profileData.role}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  ID: {profileData.id}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium text-gray-900">
                      {profileData.experience}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Patients</p>
                    <p className="font-medium text-gray-900">
                      {profileData.patientsManaged}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {profileData.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {profileData.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {profileData.village}, {profileData.state}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Sections */}
      <div className="p-6 space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {section.title}
            </h3>

            <Card>
              <CardContent className="p-0">
                {section.items.map((item, itemIndex) => {
                  const isLast = itemIndex === section.items.length - 1;
                  const isSignOut = item.label === "Sign Out";

                  return (
                    <Link key={item.label} href={item.href}>
                      <div
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !isLast ? "border-b border-gray-100" : ""
                        } ${isSignOut ? "hover:bg-red-50" : ""}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isSignOut ? "bg-red-100" : "bg-gray-100"
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 ${
                                isSignOut ? "text-red-600" : "text-gray-600"
                              }`}
                            />
                          </div>

                          <div className="flex-1">
                            <h4
                              className={`font-medium ${
                                isSignOut ? "text-red-600" : "text-gray-900"
                              }`}
                            >
                              {item.label}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>

                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* App Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-100">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">ASHA Ki Kiran v2.1.0</p>
              <p className="text-xs text-gray-500">
                Ministry of Health & Family Welfare, Government of India
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Last sync: Today at 2:30 PM
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800">
                    Emergency Support
                  </h4>
                  <p className="text-sm text-red-600">
                    24/7 Helpline: 1800-123-4567
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
}
