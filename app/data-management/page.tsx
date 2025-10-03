"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Upload,
  Trash2,
  Database,
  FileText,
  BarChart3,
  Calendar,
  User,
  Shield,
  Bell,
  Wifi,
  HardDrive,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DataStats {
  patients: { count: number; size: string };
  voiceRecordings: { count: number; size: string };
  assessments: { count: number; size: string };
  photos: { count: number; size: string };
  total: string;
  lastBackup: string;
  syncStatus: "synced" | "pending" | "failed";
}

export default function DataManagementScreen() {
  const [dataStats, setDataStats] = useState<DataStats>({
    patients: { count: 47, size: "2.3 MB" },
    voiceRecordings: { count: 156, size: "45.2 MB" },
    assessments: { count: 89, size: "1.8 MB" },
    photos: { count: 23, size: "12.4 MB" },
    total: "61.7 MB",
    lastBackup: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    syncStatus: "synced",
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [storageUsage, setStorageUsage] = useState({
    used: 61.7,
    available: 938.3,
    total: 1000,
  });

  const exportData = async () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      // In a real app, this would generate and download actual data
      const exportData = {
        timestamp: new Date().toISOString(),
        version: "2.1.0",
        ashaWorker: "Priya Kumari",
        data: {
          patients: dataStats.patients.count,
          voiceRecordings: dataStats.voiceRecordings.count,
          assessments: dataStats.assessments.count,
          photos: dataStats.photos.count,
        },
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `asha-data-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      a.click();
      URL.revokeObjectURL(url);

      setIsExporting(false);
    }, 3000);
  };

  const importData = async () => {
    setIsImporting(true);

    // Create file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            console.log("Imported data:", data);

            // Simulate processing
            setTimeout(() => {
              setDataStats((prev) => ({
                ...prev,
                lastBackup: new Date().toISOString(),
                syncStatus: "pending",
              }));
              setIsImporting(false);
            }, 2000);
          } catch (error) {
            console.error("Import failed:", error);
            setIsImporting(false);
          }
        };
        reader.readAsText(file);
      } else {
        setIsImporting(false);
      }
    };

    input.click();
  };

  const clearLocalData = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear all local data? This action cannot be undone."
      )
    ) {
      setIsClearing(true);

      // Simulate clearing
      setTimeout(() => {
        setDataStats({
          patients: { count: 0, size: "0 MB" },
          voiceRecordings: { count: 0, size: "0 MB" },
          assessments: { count: 0, size: "0 MB" },
          photos: { count: 0, size: "0 MB" },
          total: "0 MB",
          lastBackup: new Date().toISOString(),
          syncStatus: "synced",
        });

        setStorageUsage({
          used: 0,
          available: 1000,
          total: 1000,
        });

        setIsClearing(false);
      }, 2000);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStoragePercentage = () => {
    return (storageUsage.used / storageUsage.total) * 100;
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
          <Link href="/profile-settings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <h1 className="text-xl font-bold text-gray-900">Data Management</h1>

          <div className="w-16" />
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Storage Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HardDrive className="w-5 h-5 mr-2 text-primary" />
                Storage Usage
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Used: {storageUsage.used.toFixed(1)} MB</span>
                    <span>
                      Available: {storageUsage.available.toFixed(1)} MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getStoragePercentage()}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-3 rounded-full ${
                        getStoragePercentage() > 80
                          ? "bg-red-500"
                          : getStoragePercentage() > 60
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {getStoragePercentage().toFixed(1)}% of {storageUsage.total}{" "}
                    MB used
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900">
                      {dataStats.total}
                    </p>
                    <p className="text-gray-600">Total Data</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-gray-900">
                      {formatTimestamp(dataStats.lastBackup)}
                    </p>
                    <p className="text-gray-600">Last Backup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Breakdown */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Data Breakdown
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Patient Records
                      </p>
                      <p className="text-sm text-gray-600">
                        {dataStats.patients.count} records
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {dataStats.patients.size}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Voice Recordings
                      </p>
                      <p className="text-sm text-gray-600">
                        {dataStats.voiceRecordings.count} recordings
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {dataStats.voiceRecordings.size}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Health Assessments
                      </p>
                      <p className="text-sm text-gray-600">
                        {dataStats.assessments.count} assessments
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {dataStats.assessments.size}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Photos & Documents
                      </p>
                      <p className="text-sm text-gray-600">
                        {dataStats.photos.count} files
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {dataStats.photos.size}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sync Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            className={`${
              dataStats.syncStatus === "synced"
                ? "bg-green-50 border-green-200"
                : dataStats.syncStatus === "pending"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {dataStats.syncStatus === "synced" ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : dataStats.syncStatus === "pending" ? (
                  <Clock className="w-6 h-6 text-yellow-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                )}

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {dataStats.syncStatus === "synced"
                      ? "All Data Synced"
                      : dataStats.syncStatus === "pending"
                      ? "Sync Pending"
                      : "Sync Failed"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {dataStats.syncStatus === "synced"
                      ? "Your data is up to date with the server"
                      : dataStats.syncStatus === "pending"
                      ? "Some data is waiting to be synchronized"
                      : "Unable to sync with server. Check connection."}
                  </p>
                </div>

                <Link href="/sync-queue">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Management Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-gray-900">Data Actions</h3>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Export Data</p>
                      <p className="text-sm text-gray-600">
                        Download all data as backup file
                      </p>
                    </div>
                  </div>
                  <Button onClick={exportData} disabled={isExporting} size="sm">
                    {isExporting ? "Exporting..." : "Export"}
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Upload className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">Import Data</p>
                        <p className="text-sm text-gray-600">
                          Restore from backup file
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={importData}
                      disabled={isImporting}
                      size="sm"
                      variant="outline"
                    >
                      {isImporting ? "Importing..." : "Import"}
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Clear Local Data
                        </p>
                        <p className="text-sm text-gray-600">
                          Remove all data from device
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={clearLocalData}
                      disabled={isClearing}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                    >
                      {isClearing ? "Clearing..." : "Clear"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Guidelines */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Data Management Guidelines
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Export data regularly for backup purposes</li>
                <li>• Sync data when connected to reliable internet</li>
                <li>• Clear cache if storage is running low</li>
                <li>• Patient data is encrypted and secure</li>
                <li>• Voice recordings are compressed automatically</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
