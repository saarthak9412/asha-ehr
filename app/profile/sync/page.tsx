"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Wifi,
  WifiOff,
  Cloud,
  HardDrive,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SyncPreferencesScreen() {
  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("hourly");
  const [dataTypes, setDataTypes] = useState({
    patients: true,
    visits: true,
    medications: true,
    vitals: false,
    images: false,
  });
  const [lastSync, setLastSync] = useState("2 hours ago");
  const [isManualSync, setIsManualSync] = useState(false);

  const handleManualSync = async () => {
    setIsManualSync(true);

    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLastSync("Just now");
    setIsManualSync(false);
  };

  const handleDataTypeToggle = (type: keyof typeof dataTypes) => {
    setDataTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
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
                Sync Preferences
              </h1>
              <p className="text-sm text-gray-500">सिंक प्राथमिकताएं</p>
            </div>
          </div>

          <RefreshCw className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Sync Status */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sync Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-900">
                      All data synced
                    </p>
                    <p className="text-sm text-green-700">
                      Last sync: {lastSync}
                    </p>
                  </div>
                </div>

                <Cloud className="w-5 h-5 text-green-500" />
              </div>

              <button
                onClick={handleManualSync}
                disabled={isManualSync}
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isManualSync ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Sync Now
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Auto Sync Settings */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Automatic Sync
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Enable Auto Sync</p>
                  <p className="text-sm text-gray-600">
                    Automatically sync data when online
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {autoSync && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">WiFi Only</p>
                      <p className="text-sm text-gray-600">
                        Only sync when connected to WiFi
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wifiOnly}
                        onChange={(e) => setWifiOnly(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sync Frequency
                    </label>
                    <select
                      value={syncFrequency}
                      onChange={(e) => setSyncFrequency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="realtime">Real-time</option>
                      <option value="15min">Every 15 minutes</option>
                      <option value="hourly">Every hour</option>
                      <option value="daily">Daily</option>
                      <option value="manual">Manual only</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data Types */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Data to Sync
            </h2>

            <div className="space-y-3">
              {[
                {
                  key: "patients",
                  label: "Patient Records",
                  description: "Basic patient information and demographics",
                  icon: "👥",
                },
                {
                  key: "visits",
                  label: "Visit Records",
                  description: "Consultation notes and visit history",
                  icon: "🏥",
                },
                {
                  key: "medications",
                  label: "Medications",
                  description: "Prescriptions and medication history",
                  icon: "💊",
                },
                {
                  key: "vitals",
                  label: "Vital Signs",
                  description: "Blood pressure, temperature, pulse data",
                  icon: "❤️",
                },
                {
                  key: "images",
                  label: "Images & Files",
                  description: "Photos, documents, and attachments",
                  icon: "📷",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dataTypes[item.key as keyof typeof dataTypes]}
                      onChange={() =>
                        handleDataTypeToggle(item.key as keyof typeof dataTypes)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Storage Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Storage Usage
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Local Storage
                  </span>
                </div>
                <span className="text-sm text-gray-600">245 MB</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Cloud Storage
                  </span>
                </div>
                <span className="text-sm text-gray-600">1.2 GB</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Sync Optimization
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Large files are compressed before syncing to save
                      bandwidth and storage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Status */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Connection Status
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-900">
                    WiFi Connected
                  </span>
                </div>
                <span className="text-xs text-green-700">Strong signal</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-900">
                    Server Connected
                  </span>
                </div>
                <span className="text-xs text-green-700">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
