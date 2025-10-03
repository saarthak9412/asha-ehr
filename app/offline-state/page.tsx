"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WifiOff, RefreshCw, Home, Database, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OfflineStateScreen() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(
    new Date(Date.now() - 2 * 60 * 60 * 1000)
  ); // 2 hours ago

  const handleRetryConnection = () => {
    setIsRetrying(true);

    // Simulate connection retry
    setTimeout(() => {
      setIsRetrying(false);
      // In a real app, this would check actual connectivity
      console.log("Connection retry attempted");
    }, 3000);
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Offline Banner */}
      <div className="bg-orange-500 text-white p-3 text-center text-sm font-medium">
        <WifiOff className="w-4 h-4 inline mr-2" />
        No internet connection detected
      </div>

      <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-3rem)]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-sm w-full text-center"
        >
          {/* Offline Illustration */}
          <div className="mb-8">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-40 h-40 mb-6"
            >
              {/* Background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 rounded-full"></div>

              {/* WiFi off icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <WifiOff className="w-10 h-10 text-orange-500" />
                </div>
              </div>

              {/* Animated rings */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-4 border-2 border-orange-300 rounded-full"
              ></motion.div>

              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="absolute inset-4 border-2 border-orange-200 rounded-full"
              ></motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              You're Offline
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              No internet connection, but don't worry! You can still access all
              your patient data and continue working. Changes will sync when
              you're back online.
            </p>

            {/* Connection Status */}
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-orange-900">
                    Connection Status
                  </h3>
                  <span className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs">
                    Offline
                  </span>
                </div>
                <p className="text-sm text-orange-800 mb-3">
                  Last successful sync: {formatLastSync(lastSyncTime)}
                </p>
                <Button
                  onClick={handleRetryConnection}
                  disabled={isRetrying}
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  {isRetrying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 mr-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  {isRetrying ? "Checking..." : "Retry Connection"}
                </Button>
              </CardContent>
            </Card>

            {/* Available Features */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Database className="w-4 h-4 mr-2" />
                  Available Offline
                </h3>
                <div className="space-y-3 text-left">
                  {[
                    "View all patient records",
                    "Add new patient information",
                    "Record voice visits",
                    "Set reminders and appointments",
                    "Generate QR health cards",
                    "Access training materials",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/home">
                <Button size="lg" className="w-full h-14 text-lg">
                  <Home className="w-5 h-5 mr-3" />
                  Continue Working
                </Button>
              </Link>

              <Link href="/sync-queue">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 text-lg"
                >
                  <Database className="w-5 h-5 mr-3" />
                  View Pending Sync
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Offline Mode Tips
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• All your work is automatically saved locally</li>
                  <li>• Voice recordings are stored for later upload</li>
                  <li>• Data will sync automatically when connected</li>
                  <li>• Check sync queue to see pending uploads</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
