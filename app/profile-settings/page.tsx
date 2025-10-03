"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Smartphone,
  Wifi,
  Download,
  Upload,
  Eye,
  EyeOff,
  ChevronRight,
  Settings,
  Lock,
  Globe,
  Moon,
  Sun,
  Fingerprint,
  Key,
  Database,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  Camera,
  Edit3,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface UserProfile {
  name: string;
  role: string;
  id: string;
  phone: string;
  email: string;
  location: string;
  profilePicture?: string;
  joinedDate: string;
}

const userProfile: UserProfile = {
  name: "Priya Kumari",
  role: "ASHA Worker",
  id: "ASH001234",
  phone: "+91 98765 43210",
  email: "priya.kumari@asha.gov.in",
  location: "Kumhari, Durg District",
  joinedDate: "2023-03-15",
};

export default function ProfileSettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: true,
    autoSync: true,
    offlineMode: false,
    dataSharing: true,
    locationTracking: false,
    darkMode: false,
    autoBackup: true,
    reminders: true,
    privacy: {
      shareProfile: false,
      analyticsOptIn: true,
      crashReporting: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const toggleSetting = (key: string, subKey?: string) => {
    if (subKey && key === "privacy") {
      setSettings((prev) => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [subKey]: !prev.privacy[subKey as keyof typeof prev.privacy],
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev],
      }));
    }
  };

  const saveProfile = () => {
    // In a real app, this would save to server
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b p-4 pt-12"
      >
        <div className="flex items-center justify-between">
          <Link href="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <h1 className="text-xl font-bold text-gray-900">
            Profile & Settings
          </h1>

          <Button
            onClick={isEditing ? saveProfile : () => setIsEditing(true)}
            size="sm"
            variant={isEditing ? "default" : "ghost"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            name: e.target.value,
                          })
                        }
                        className="w-full text-xl font-bold bg-gray-50 border rounded-lg px-3 py-2"
                      />
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            location: e.target.value,
                          })
                        }
                        className="w-full text-gray-600 bg-gray-50 border rounded-lg px-3 py-1"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900">
                        {userProfile.name}
                      </h2>
                      <p className="text-primary font-medium">
                        {userProfile.role}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {userProfile.location}
                      </p>
                    </>
                  )}
                </div>

                {isEditing && (
                  <Button onClick={cancelEdit} variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{userProfile.phone}</p>
                    </div>
                  </div>
                  {showSensitiveData && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">
                        {showSensitiveData
                          ? userProfile.email
                          : "••••••@asha.gov.in"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowSensitiveData(!showSensitiveData)}
                    variant="ghost"
                    size="sm"
                  >
                    {showSensitiveData ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Worker ID</p>
                    <p className="font-medium">{userProfile.id}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="font-medium">
                      {new Date(userProfile.joinedDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Security & Privacy
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Fingerprint className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Biometric Login</p>
                      <p className="text-sm text-gray-600">
                        Use fingerprint or face unlock
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.biometric}
                    onCheckedChange={() => toggleSetting("biometric")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Auto-lock</p>
                      <p className="text-sm text-gray-600">
                        Lock app after inactivity
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Share Profile</p>
                      <p className="text-sm text-gray-600">
                        Allow other workers to see your profile
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.privacy.shareProfile}
                    onCheckedChange={() =>
                      toggleSetting("privacy", "shareProfile")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Location Tracking</p>
                      <p className="text-sm text-gray-600">
                        For visit tracking and reports
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.locationTracking}
                    onCheckedChange={() => toggleSetting("locationTracking")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary" />
                App Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-gray-600">
                        Reminders and alerts
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={() => toggleSetting("notifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Auto Sync</p>
                      <p className="text-sm text-gray-600">
                        Sync data when connected
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoSync}
                    onCheckedChange={() => toggleSetting("autoSync")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Offline Mode</p>
                      <p className="text-sm text-gray-600">
                        Work without internet
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.offlineMode}
                    onCheckedChange={() => toggleSetting("offlineMode")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Auto Backup</p>
                      <p className="text-sm text-gray-600">
                        Daily backup to cloud
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={() => toggleSetting("autoBackup")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {settings.darkMode ? (
                      <Moon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-600">
                        Dark theme for better battery
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={() => toggleSetting("darkMode")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data & Analytics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-primary" />
                Data & Analytics
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Share Usage Data</p>
                      <p className="text-sm text-gray-600">
                        Help improve the app
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.privacy.analyticsOptIn}
                    onCheckedChange={() =>
                      toggleSetting("privacy", "analyticsOptIn")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Crash Reporting</p>
                      <p className="text-sm text-gray-600">
                        Automatic error reports
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.privacy.crashReporting}
                    onCheckedChange={() =>
                      toggleSetting("privacy", "crashReporting")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Data Sharing</p>
                      <p className="text-sm text-gray-600">
                        Share with health department
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.dataSharing}
                    onCheckedChange={() => toggleSetting("dataSharing")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          <Link href="/data-management">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Database className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-gray-900">Data Management</p>
                <p className="text-xs text-gray-600">
                  Export, import & storage
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/training">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-gray-900">Help & Support</p>
                <p className="text-xs text-gray-600">Get assistance</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm space-y-1"
        >
          <p>ASHA Ki Kiran v2.1.0</p>
          <p>© 2024 Ministry of Health & Family Welfare</p>
          <p>Last sync: {new Date().toLocaleString("en-IN")}</p>
        </motion.div>
      </div>
    </div>
  );
}
