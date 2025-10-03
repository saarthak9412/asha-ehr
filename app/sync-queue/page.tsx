"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  FileText,
  Mic,
  Calendar,
  ArrowLeft,
  Wifi,
  WifiOff,
  RotateCcw,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import syncQueueData from "@/data/syncQueue.json";

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    label: "Pending",
  },
  syncing: {
    icon: RefreshCw,
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-200",
    label: "Syncing",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-200",
    label: "Completed",
  },
  failed: {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-100",
    border: "border-red-200",
    label: "Failed",
  },
};

const typeConfig = {
  patient_record: { icon: User, label: "Patient Record" },
  voice_recording: { icon: Mic, label: "Voice Recording" },
  medication_update: { icon: FileText, label: "Medication Update" },
  reminder_completion: { icon: Calendar, label: "Reminder Completion" },
  health_assessment: { icon: FileText, label: "Health Assessment" },
};

export default function SyncQueueScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [syncingItems, setSyncingItems] = useState<string[]>([]);

  const retrySync = (itemId: string) => {
    setSyncingItems((prev) => [...prev, itemId]);

    // Simulate sync attempt
    setTimeout(() => {
      setSyncingItems((prev) => prev.filter((id) => id !== itemId));
      // In real app, would update the item status based on result
    }, 3000);
  };

  const retryAll = () => {
    const failedItems = syncQueueData.filter(
      (item) => item.status === "failed"
    );
    setSyncingItems(failedItems.map((item) => item.id));

    setTimeout(() => {
      setSyncingItems([]);
    }, 5000);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const pendingCount = syncQueueData.filter(
    (item) => item.status === "pending"
  ).length;
  const failedCount = syncQueueData.filter(
    (item) => item.status === "failed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Offline Banner */}
      {!isOnline && (
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="bg-yellow-500 text-white p-3 text-center text-sm font-medium"
        >
          <WifiOff className="w-4 h-4 inline mr-2" />
          No internet connection - Items will sync when connected
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <Link href="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <h1 className="text-xl font-bold text-gray-900">Sync Queue</h1>

          <div className="flex items-center space-x-2">
            <Link href="/mesh-sync">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Mesh Sync
              </Button>
            </Link>

            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{failedCount}</p>
              <p className="text-sm text-gray-600">Failed</p>
            </CardContent>
          </Card>
        </div>

        {/* Retry All Button */}
        {failedCount > 0 && isOnline && (
          <Button
            onClick={retryAll}
            className="w-full mt-4"
            disabled={syncingItems.length > 0}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry All Failed Items
          </Button>
        )}
      </motion.div>

      {/* Sync Items */}
      <div className="p-6">
        {syncQueueData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              All Synced!
            </h3>
            <p className="text-gray-600">
              All your data is up to date with the server
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {syncQueueData.map((item, index) => {
              const isSyncing = syncingItems.includes(item.id);
              const status = isSyncing ? "syncing" : item.status;
              const statusStyle =
                statusConfig[status as keyof typeof statusConfig];
              const typeStyle =
                typeConfig[item.type as keyof typeof typeConfig];
              const StatusIcon = statusStyle.icon;
              const TypeIcon = typeStyle.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`${statusStyle.border} ${
                      status === "failed" ? "hover:shadow-lg" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Type Icon */}
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="w-5 h-5 text-gray-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {typeStyle.label}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full ${statusStyle.bg} ${statusStyle.color}`}
                            >
                              {statusStyle.label}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            Patient: {item.patientName}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatTimestamp(item.timestamp)}</span>
                            <span>{item.size}</span>
                            {item.retryCount > 0 && (
                              <span>Retry {item.retryCount}</span>
                            )}
                          </div>

                          {item.error && (
                            <div className="mt-2 p-2 bg-red-50 rounded-lg">
                              <p className="text-xs text-red-600">
                                Error: {item.error}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Status & Actions */}
                        <div className="flex flex-col items-end space-y-2">
                          <div className={`p-2 rounded-lg ${statusStyle.bg}`}>
                            <StatusIcon
                              className={`w-4 h-4 ${statusStyle.color} ${
                                isSyncing ? "animate-spin" : ""
                              }`}
                            />
                          </div>

                          {status === "failed" && isOnline && !isSyncing && (
                            <Button
                              onClick={() => retrySync(item.id)}
                              size="sm"
                              variant="outline"
                              className="text-xs h-8"
                            >
                              Retry
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">About Sync</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Data is automatically synced when connected to internet
                </li>
                <li>• Failed items can be retried manually</li>
                <li>• Large files sync in background to save time</li>
                <li>• All data is encrypted during transmission</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
