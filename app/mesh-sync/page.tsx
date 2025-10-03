"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Wifi,
  WifiOff,
  Smartphone,
  Users,
  Database,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Signal,
  Share2,
  Download,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MeshDevice {
  id: string;
  name: string;
  type: "asha_worker" | "anm" | "supervisor" | "phc";
  distance: number;
  signal: "strong" | "medium" | "weak";
  status: "online" | "syncing" | "offline";
  lastSeen: string;
  dataSharing: boolean;
  pendingData: {
    patients: number;
    voice_recordings: number;
    assessments: number;
  };
}

const mockMeshDevices: MeshDevice[] = [
  {
    id: "1",
    name: "Sunita Devi (ASHA)",
    type: "asha_worker",
    distance: 150,
    signal: "strong",
    status: "online",
    lastSeen: new Date().toISOString(),
    dataSharing: true,
    pendingData: { patients: 3, voice_recordings: 2, assessments: 1 },
  },
  {
    id: "2",
    name: "ANM Ravi Kumar",
    type: "anm",
    distance: 300,
    signal: "medium",
    status: "syncing",
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    dataSharing: true,
    pendingData: { patients: 12, voice_recordings: 8, assessments: 5 },
  },
  {
    id: "3",
    name: "Kumhari PHC",
    type: "phc",
    distance: 1200,
    signal: "weak",
    status: "online",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    dataSharing: true,
    pendingData: { patients: 45, voice_recordings: 23, assessments: 15 },
  },
  {
    id: "4",
    name: "Dr. Anjali Singh (Supervisor)",
    type: "supervisor",
    distance: 800,
    signal: "medium",
    status: "offline",
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    dataSharing: false,
    pendingData: { patients: 0, voice_recordings: 0, assessments: 0 },
  },
];

export default function MeshSyncScreen() {
  const [devices, setDevices] = useState<MeshDevice[]>(mockMeshDevices);
  const [isScanning, setIsScanning] = useState(false);
  const [meshEnabled, setMeshEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const scanForDevices = () => {
    setIsScanning(true);

    // Simulate device discovery
    setTimeout(() => {
      setIsScanning(false);
      // In a real app, this would discover actual nearby devices
      console.log("Scanning for mesh devices...");
    }, 3000);
  };

  const connectToDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? { ...device, status: "syncing" as const }
          : device
      )
    );

    // Simulate connection and sync
    setTimeout(() => {
      setDevices((prev) =>
        prev.map((device) =>
          device.id === deviceId
            ? {
                ...device,
                status: "online" as const,
                dataSharing: true,
                lastSeen: new Date().toISOString(),
              }
            : device
        )
      );
    }, 2000);
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "strong":
        return <Signal className="w-4 h-4 text-green-500" />;
      case "medium":
        return <Signal className="w-4 h-4 text-yellow-500" />;
      case "weak":
        return <Signal className="w-4 h-4 text-red-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "asha_worker":
        return <Users className="w-5 h-5 text-primary" />;
      case "anm":
        return <Database className="w-5 h-5 text-blue-500" />;
      case "supervisor":
        return <Users className="w-5 h-5 text-purple-500" />;
      case "phc":
        return <Database className="w-5 h-5 text-green-500" />;
      default:
        return <Smartphone className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDistance = (distance: number) => {
    if (distance < 1000) return `${distance}m`;
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const formatLastSeen = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const onlineDevices = devices.filter(
    (d) => d.status === "online" || d.status === "syncing"
  );
  const totalPendingData = devices.reduce(
    (sum, device) =>
      sum +
      device.pendingData.patients +
      device.pendingData.voice_recordings +
      device.pendingData.assessments,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b p-4 pt-12"
      >
        <div className="flex items-center justify-between">
          <Link href="/sync-queue">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Mesh Sync</h1>
            <p className="text-sm text-gray-600">
              {onlineDevices.length} devices connected
            </p>
          </div>

          <Button
            onClick={scanForDevices}
            size="sm"
            variant="outline"
            disabled={isScanning}
          >
            <RefreshCw
              className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Status Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-3 gap-4"
        >
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <Wifi className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {onlineDevices.length}
              </p>
              <p className="text-sm text-gray-600">Connected</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {totalPendingData}
              </p>
              <p className="text-sm text-gray-600">Pending Items</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Share2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {devices.filter((d) => d.dataSharing).length}
              </p>
              <p className="text-sm text-gray-600">Sharing Data</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mesh Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Mesh Network Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Mesh Network</p>
                      <p className="text-sm text-gray-600">
                        Enable peer-to-peer connectivity
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                      meshEnabled ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => setMeshEnabled(!meshEnabled)}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        meshEnabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Auto Sync</p>
                      <p className="text-sm text-gray-600">
                        Automatically sync with nearby devices
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                      autoSync ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => setAutoSync(!autoSync)}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        autoSync ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="font-semibold text-gray-900">Nearby Devices</h3>

          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`${
                  device.status === "online"
                    ? "border-green-200 bg-green-50"
                    : device.status === "syncing"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border">
                        {getDeviceIcon(device.type)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">
                            {device.name}
                          </h4>
                          {getSignalIcon(device.signal)}
                          <span className="text-xs text-gray-500">
                            {formatDistance(device.distance)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              device.status === "online"
                                ? "bg-green-100 text-green-700"
                                : device.status === "syncing"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {device.status === "syncing"
                              ? "Syncing..."
                              : device.status}
                          </span>
                          <span>
                            Last seen: {formatLastSeen(device.lastSeen)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {device.status === "offline" ? (
                        <Button
                          onClick={() => connectToDevice(device.id)}
                          size="sm"
                          variant="outline"
                        >
                          Connect
                        </Button>
                      ) : (
                        <div className="text-xs text-gray-600">
                          <div className="flex items-center space-x-2 mb-1">
                            <Download className="w-3 h-3" />
                            <span>
                              {Object.values(device.pendingData).reduce(
                                (a, b) => a + b,
                                0
                              )}{" "}
                              items
                            </span>
                          </div>
                          {device.dataSharing && (
                            <div className="flex items-center space-x-2">
                              <Upload className="w-3 h-3 text-green-500" />
                              <span className="text-green-600">Sharing</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pending Data Breakdown */}
                  {device.status !== "offline" && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">
                            {device.pendingData.patients}
                          </p>
                          <p className="text-gray-600">Patients</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">
                            {device.pendingData.voice_recordings}
                          </p>
                          <p className="text-gray-600">Voice Notes</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">
                            {device.pendingData.assessments}
                          </p>
                          <p className="text-gray-600">Assessments</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                About Mesh Sync
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Share data with nearby ASHA workers without internet</li>
                <li>• Automatically discovers devices within 2km range</li>
                <li>• Encrypted peer-to-peer communication</li>
                <li>• Works even in remote areas with no cellular coverage</li>
                <li>• Conserves battery with smart sync scheduling</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
