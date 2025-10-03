"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Syringe,
  Stethoscope,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { useReminders, usePatients } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { useTranslatedData } from "@/lib/dataHelpers";
import { formatDisplayDate } from "@/lib/dates";
import type { TranslationKey } from "@/lib/i18n";

const priorityConfig = {
  high: { color: "text-red-600", bg: "bg-red-100", border: "border-red-200" },
  medium: {
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-200",
  },
  low: {
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-200",
  },
};

const typeConfig = {
  medication: { icon: Bell, color: "text-purple-600" },
  appointment: { icon: User, color: "text-blue-600" },
  meeting: { icon: CalendarIcon, color: "text-green-600" },
  vaccination: { icon: Syringe, color: "text-emerald-600" },
  checkup: { icon: Stethoscope, color: "text-teal-600" },
  followup: { icon: RefreshCw, color: "text-orange-600" },
  consultation: { icon: User, color: "text-indigo-600" },
} as const;

export default function RemindersScreen() {
  const { t, currentLanguage } = useTranslation();
  const { translateReminder, translatePatient } = useTranslatedData();
  const { reminders } = useReminders();
  const { getPatient } = usePatients();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "critical">("all");

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

  const dayNames = useMemo(() => {
    const baseDate = new Date(2021, 0, 3); // Sunday
    return Array.from({ length: 7 }).map((_, index) =>
      new Date(baseDate.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString(
        activeLocale,
        { weekday: "short" }
      )
    );
  }, [activeLocale]);

  // Get current date info
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const calendarDays = [];

  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Filter reminders based on selected criteria
  const filteredReminders = reminders.filter((reminder) => {
    if (filter === "completed") return reminder.status === "completed";
    if (filter === "pending") return reminder.status === "pending";
    if (filter === "critical")
      return reminder.priority === "high" || reminder.status === "overdue";
    return true;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(activeLocale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatReminderDate = (dateString: string) =>
    formatDisplayDate(dateString, activeLocale);

  const hasRemindersOnDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return reminders.some((reminder) => reminder.dueDate === dateStr);
  };

  const toggleReminderComplete = (reminderId: string) => {
    // This would normally update the backend
    console.log("Toggling reminder completion for:", reminderId);
  };

  const filterOptions = [
    { value: "all", labelKey: "all" },
    { value: "pending", labelKey: "pending" },
    { value: "completed", labelKey: "completed" },
    { value: "critical", labelKey: "critical" },
  ] as const;

  const activeFilterLabelKey =
    filterOptions.find((option) => option.value === filter)?.labelKey ?? "all";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t("reminders")}</h1>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <List className="w-4 h-4 inline mr-1" />
              {t("listView")}
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "calendar"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              {t("calendarView")}
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === option.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        {viewMode === "calendar" ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Calendar Navigation */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() =>
                      setSelectedDate(
                        new Date(currentYear, currentMonth - 1, 1)
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedDate.toLocaleDateString(activeLocale, {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedDate(
                        new Date(currentYear, currentMonth + 1, 1)
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-2">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <div key={index} className="aspect-square">
                        {day && (
                          <button
                            onClick={() =>
                              setSelectedDate(
                                new Date(currentYear, currentMonth, day)
                              )
                            }
                            className={`w-full h-full rounded-lg text-sm flex flex-col items-center justify-center relative transition-colors ${
                              day === today.getDate() &&
                              currentMonth === today.getMonth() &&
                              currentYear === today.getFullYear()
                                ? "bg-primary text-white font-semibold"
                                : hasRemindersOnDate(day)
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {day}
                            {hasRemindersOnDate(day) && (
                              <div className="w-1 h-1 bg-current rounded-full mt-1"></div>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Reminders */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {formatDate(selectedDate)}
              </h3>

              {/* This would show reminders for selected date */}
              <Card>
                <CardContent className="p-6 text-center">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t("noRemindersForDate")}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {filteredReminders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("noRemindersTitle")}
                  </h3>
                  <p className="text-gray-600">
                    {filter === "all"
                      ? t("noRemindersGeneral")
                      : t("noRemindersForStatus", {
                          status: t(activeFilterLabelKey as TranslationKey),
                        })}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredReminders.map((reminder, index) => {
                const TypeIcon =
                  typeConfig[reminder.type as keyof typeof typeConfig]?.icon ||
                  Bell;
                const typeColor =
                  typeConfig[reminder.type as keyof typeof typeConfig]?.color ||
                  "text-primary";
                const priorityStyle =
                  priorityConfig[
                    reminder.priority as keyof typeof priorityConfig
                  ] ?? priorityConfig.low;
                const patient = reminder.patientId
                  ? getPatient(reminder.patientId)
                  : null;
                const translatedPatient = patient
                  ? translatePatient(patient)
                  : null;
                const translatedReminder = translateReminder(
                  reminder,
                  translatedPatient?.name
                );
                const formattedDueDate = formatReminderDate(reminder.dueDate);

                return (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`${priorityStyle.border} ${
                        reminder.status === "completed" ? "opacity-60" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Completion Toggle */}
                          <button
                            onClick={() => toggleReminderComplete(reminder.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 transition-colors ${
                              reminder.status === "completed"
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-gray-300 hover:border-green-400"
                            }`}
                          >
                            {reminder.status === "completed" && (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <TypeIcon
                                className={`w-4 h-4 ${typeColor}`}
                              />
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full ${priorityStyle.bg} ${priorityStyle.color}`}
                              >
                                {t(reminder.priority as any)}
                              </span>
                            </div>

                            <h3
                              className={`font-semibold text-gray-900 mb-1 ${
                                reminder.status === "completed"
                                  ? "line-through"
                                  : ""
                              }`}
                            >
                                {translatedReminder.title}
                            </h3>

                            <p className="text-sm text-gray-600 mb-2">
                                {translatedReminder.description}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                  {formattedDueDate}
                              </div>

                                {translatedPatient && (
                                <div className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  <Link
                                    href={`/patients/${reminder.patientId}`}
                                    className="text-primary hover:underline"
                                  >
                                      {translatedPatient.name}
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Priority Indicator */}
                          {reminder.priority === "high" && (
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
