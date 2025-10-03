"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Users,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Heart,
  ChevronRight,
  Wifi,
  WifiOff,
  Mic,
  Plus,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { usePatients, useReminders } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { useTranslatedData } from "@/lib/dataHelpers";
import { formatDisplayDate } from "@/lib/dates";
import TodayTasks from "@/components/TodayTasks";

export default function HomeScreen() {
  const { t, currentLanguage } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { patients } = usePatients();
  const { reminders } = useReminders();
  const { translatePatient, translateReminder } = useTranslatedData();

  const localeMap: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    te: "te-IN",
    ta: "ta-IN",
    bn: "bn-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    od: "or-IN",
    pa: "pa-IN",
  };

  const activeLocale = localeMap[currentLanguage] ?? "en-IN";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const todayReminders = reminders.filter((reminder) => {
    const today = new Date().toISOString().split("T")[0];
    return reminder.dueDate === today && reminder.status === "pending";
  });

  const criticalPatients = patients.filter(
    (patient) => patient.riskLevel === "High"
  );

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t("morning");
    if (hour < 17) return t("afternoon");
    return t("evening");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Offline Banner */}
      {!isOnline && (
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="bg-yellow-500 text-white p-3 text-center text-sm font-medium"
        >
          <WifiOff className="w-4 h-4 inline mr-2" />
          {t("offlineSyncMessage")}
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}
            </h1>
            <p className="text-gray-600">{t("ashaWorkerTagline")}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-gray-100 rounded-xl">
              <Wifi className="w-5 h-5 text-green-500" />
            </button>
            <Link
              href="/notifications"
              className="p-2 bg-gray-100 rounded-xl relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {todayReminders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {todayReminders.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 bg-primary/10">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">
                {patients.length}
              </p>
              <p className="text-xs text-gray-600">{t("totalPatients")}</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-secondary/10">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-secondary mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">
                {todayReminders.length}
              </p>
              <p className="text-xs text-gray-600">{t("todayTasks")}</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-900">
                {criticalPatients.length}
              </p>
              <p className="text-xs text-gray-600">{t("criticalPatients")}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("quickActions")}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Link href="/patients/new">
              <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
                <CardContent className="p-4 text-center">
                  <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-medium text-gray-900">{t("addPatientAction")}</p>
                  <p className="text-xs text-gray-600">{t("createRecordHint")}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/voice-visit">
              <Card className="border-2 border-dashed border-secondary/30 hover:border-secondary/60 transition-colors">
                <CardContent className="p-4 text-center">
                  <Mic className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="font-medium text-gray-900">{t("voiceVisit")}</p>
                  <p className="text-xs text-gray-600">{t("startRecording")}</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/qr-scan">
              <Card className="border-2 border-dashed border-blue-300 hover:border-blue-600 transition-colors">
                <CardContent className="p-4 text-center">
                  <QrCode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">{t("scanQr")}</p>
                  <p className="text-xs text-gray-600">{t("patientHealthCard")}</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mesh-sync">
              <Card className="border-2 border-dashed border-purple-300 hover:border-purple-600 transition-colors">
                <CardContent className="p-4 text-center">
                  <Wifi className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">{t("meshSync")}</p>
                  <p className="text-xs text-gray-600">{t("connectNearby")}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TodayTasks />
        </motion.div>

        {/* Today's Visits */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("todaysVisits")}
            </h2>
            <Link
              href="/reminders"
              className="text-primary text-sm font-medium"
            >
              {t("viewAll")}
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              {todayReminders.slice(0, 3).map((reminder, index) => {
                const patient = reminder.patientId
                  ? patients.find((p) => p.id === reminder.patientId)
                  : null;
                const translatedPatient = patient
                  ? translatePatient(patient)
                  : null;
                const translatedReminder = translateReminder(
                  reminder,
                  translatedPatient?.name
                );

                return (
                  <div
                    key={reminder.id}
                    className={`p-4 ${
                      index < 2 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          reminder.priority === "high"
                            ? "bg-red-100"
                            : reminder.priority === "medium"
                            ? "bg-orange-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            reminder.priority === "high"
                              ? "text-red-500"
                              : reminder.priority === "medium"
                              ? "text-orange-500"
                              : "text-blue-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {translatedReminder.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDisplayDate(reminder.dueDate, activeLocale)}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                );
              })}

              {todayReminders.length === 0 && (
                <div className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t("noVisitsToday")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TodayTasks />
        </motion.div>

        {/* Critical Patients */}
        {criticalPatients.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("criticalPatients")}
              </h2>
              <Link
                href="/patients?filter=critical"
                className="text-red-500 text-sm font-medium"
              >
                {t("viewAll")}
              </Link>
            </div>

            <Card className="border-red-200">
              <CardContent className="p-0">
                {criticalPatients.slice(0, 2).map((patient, index) => {
                  const translatedPatient = translatePatient(patient);

                  return (
                    <Link key={patient.id} href={`/patients/${patient.id}`}>
                      <div
                        className={`p-4 hover:bg-gray-50 ${
                          index < 1 ? "border-b border-gray-100" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {translatedPatient.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {translatedPatient.address.split(",")[0]} • {" "}
                              {translatedPatient.conditions.join(", ")}
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
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
