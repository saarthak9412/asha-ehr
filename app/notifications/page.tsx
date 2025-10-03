"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Heart,
  Settings,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type NotificationType =
  | "alert"
  | "reminder"
  | "update"
  | "appointment"
  | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  patient?: {
    name: string;
    id: string;
  };
}

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<"all" | NotificationType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      title: "Critical Patient Alert",
      message: "राम शर्मा का BP 180/120 है - तुरंत ध्यान दें",
      time: "5 min ago",
      isRead: false,
      priority: "high",
      patient: { name: "राम शर्मा", id: "P001" },
    },
    {
      id: "2",
      type: "reminder",
      title: "Medication Reminder",
      message: "सुनीता देवी की दवा का समय हो गया है",
      time: "15 min ago",
      isRead: false,
      priority: "high",
      patient: { name: "सुनीता देवी", id: "P002" },
    },
    {
      id: "3",
      type: "appointment",
      title: "Upcoming Visit",
      message: "अजय कुमार का अपॉइंटमेंट आज दोपहर 2 बजे है",
      time: "1 hour ago",
      isRead: true,
      priority: "medium",
      patient: { name: "अजय कुमार", id: "P003" },
    },
    {
      id: "4",
      type: "update",
      title: "Health Record Updated",
      message: "प्रिया वर्मा का health record update हो गया",
      time: "2 hours ago",
      isRead: true,
      priority: "low",
      patient: { name: "प्रिया वर्मा", id: "P004" },
    },
    {
      id: "5",
      type: "system",
      title: "Sync Complete",
      message: "45 records successfully synced to central server",
      time: "3 hours ago",
      isRead: true,
      priority: "low",
    },
    {
      id: "6",
      type: "alert",
      title: "Vaccine Due",
      message: "बच्चों के लिए पोलियो वैक्सीन कैंप कल है",
      time: "4 hours ago",
      isRead: true,
      priority: "medium",
    },
    {
      id: "7",
      type: "reminder",
      title: "Weekly Report Due",
      message: "साप्ताहिक रिपोर्ट submit करना है",
      time: "1 day ago",
      isRead: true,
      priority: "medium",
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "reminder":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "appointment":
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case "update":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter = filter === "all" || notif.type === filter;
    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notif.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false);
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">
                {unreadCount} unread messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              { value: "all", label: "All", icon: Bell },
              { value: "alert", label: "Alerts", icon: AlertCircle },
              { value: "reminder", label: "Reminders", icon: Clock },
              { value: "appointment", label: "Appointments", icon: Calendar },
              { value: "update", label: "Updates", icon: CheckCircle },
              { value: "system", label: "System", icon: Settings },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setFilter(value as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "No notifications match your search"
                : "You're all caught up!"}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                notification.priority === "high"
                  ? "border-l-red-500"
                  : notification.priority === "medium"
                  ? "border-l-orange-500"
                  : "border-l-gray-300"
              } ${!notification.isRead ? "bg-blue-50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </span>

                        {notification.patient && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {notification.patient.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-500 hover:text-blue-600 text-xs font-medium"
                        >
                          Mark read
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {notification.patient && (
                    <div className="mt-3">
                      <Link
                        href={`/patients/${notification.patient.id}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <User className="w-3 h-3" />
                        View Patient
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <div className="fixed bottom-6 right-6">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <CheckCircle className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
