"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Phone,
  CheckCircle,
  X,
  Calendar,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ConflictData {
  patientId: string;
  patientName: string;
  field: string;
  localValue: any;
  serverValue: any;
  lastModified: {
    local: string;
    server: string;
  };
  modifiedBy: {
    local: string;
    server: string;
  };
}

const mockConflicts: ConflictData[] = [
  {
    patientId: "1",
    patientName: "Priya Sharma",
    field: "phone",
    localValue: "+91 98765 43210",
    serverValue: "+91 98765 43211",
    lastModified: {
      local: "2024-01-15T10:30:00Z",
      server: "2024-01-15T14:45:00Z",
    },
    modifiedBy: {
      local: "Priya Kumari (You)",
      server: "Dr. Rajesh Kumar",
    },
  },
  {
    patientId: "1",
    patientName: "Priya Sharma",
    field: "address",
    localValue: "House No. 45, Main Road, Kumhari, Durg",
    serverValue: "House No. 47, Main Road, Kumhari, Durg",
    lastModified: {
      local: "2024-01-14T16:20:00Z",
      server: "2024-01-15T09:15:00Z",
    },
    modifiedBy: {
      local: "Priya Kumari (You)",
      server: "ASHA Supervisor",
    },
  },
  {
    patientId: "2",
    patientName: "Amit Kumar",
    field: "medications",
    localValue: ["Metformin 500mg - Morning", "Glimepiride 2mg - Evening"],
    serverValue: [
      "Metformin 500mg - Morning, Evening",
      "Insulin 10 units - Before meals",
    ],
    lastModified: {
      local: "2024-01-15T08:00:00Z",
      server: "2024-01-15T11:30:00Z",
    },
    modifiedBy: {
      local: "Priya Kumari (You)",
      server: "Dr. Anjali Singh",
    },
  },
];

export default function ConflictResolutionScreen() {
  const [conflicts, setConflicts] = useState<ConflictData[]>(mockConflicts);
  const [resolvedConflicts, setResolvedConflicts] = useState<Set<number>>(
    new Set()
  );
  const router = useRouter();

  const resolveConflict = (conflictIndex: number, chooseLocal: boolean) => {
    setResolvedConflicts(
      (prev) => new Set(Array.from(prev).concat(conflictIndex))
    );

    // In a real app, this would sync the chosen value
    console.log(
      `Conflict ${conflictIndex} resolved with ${
        chooseLocal ? "local" : "server"
      } value`
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFieldIcon = (field: string) => {
    switch (field) {
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "address":
        return <MapPin className="w-4 h-4" />;
      case "medications":
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const formatFieldName = (field: string) => {
    switch (field) {
      case "phone":
        return "Phone Number";
      case "address":
        return "Address";
      case "medications":
        return "Medications";
      default:
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
  };

  const renderValue = (field: string, value: any) => {
    if (field === "medications" && Array.isArray(value)) {
      return (
        <ul className="space-y-1">
          {value.map((med, index) => (
            <li key={index} className="text-sm">
              • {med}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm">{value}</p>;
  };

  const allResolved = resolvedConflicts.size === conflicts.length;

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
            <h1 className="text-xl font-bold text-gray-900">
              Resolve Conflicts
            </h1>
            <p className="text-sm text-gray-600">
              {conflicts.length - resolvedConflicts.size} conflicts remaining
            </p>
          </div>
          <div className="w-16" /> {/* Spacer for center alignment */}
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Status Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-4 rounded-xl flex items-center space-x-3 ${
            allResolved
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {allResolved ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <div>
            <p className="font-medium">
              {allResolved
                ? "All conflicts resolved!"
                : `${
                    conflicts.length - resolvedConflicts.size
                  } data conflicts need your attention`}
            </p>
            <p className="text-sm opacity-80">
              {allResolved
                ? "Your data will sync automatically"
                : "Choose which version to keep for each conflict"}
            </p>
          </div>
        </motion.div>

        {/* Conflicts List */}
        <div className="space-y-4">
          {conflicts.map((conflict, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`${
                  resolvedConflicts.has(index)
                    ? "opacity-50 bg-green-50 border-green-200"
                    : "border-yellow-200"
                }`}
              >
                <CardContent className="p-4">
                  {/* Conflict Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getFieldIcon(conflict.field)}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {conflict.patientName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatFieldName(conflict.field)} conflict
                        </p>
                      </div>
                    </div>

                    {resolvedConflicts.has(index) && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Resolved</span>
                      </div>
                    )}
                  </div>

                  {!resolvedConflicts.has(index) && (
                    <>
                      {/* Local Version */}
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700">
                            Your Version (Local)
                          </span>
                          <Button
                            onClick={() => resolveConflict(index, true)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Choose This
                          </Button>
                        </div>
                        {renderValue(conflict.field, conflict.localValue)}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-blue-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDate(conflict.lastModified.local)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{conflict.modifiedBy.local}</span>
                          </div>
                        </div>
                      </div>

                      {/* Server Version */}
                      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-orange-700">
                            Server Version
                          </span>
                          <Button
                            onClick={() => resolveConflict(index, false)}
                            size="sm"
                            variant="outline"
                            className="border-orange-300 text-orange-700 hover:bg-orange-100"
                          >
                            Choose This
                          </Button>
                        </div>
                        {renderValue(conflict.field, conflict.serverValue)}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-orange-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatDate(conflict.lastModified.server)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{conflict.modifiedBy.server}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        {allResolved && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex space-x-3"
          >
            <Button
              onClick={() => router.push("/sync-queue")}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Sync
            </Button>
          </motion.div>
        )}
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 pt-0"
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              How to resolve conflicts:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Review both versions carefully</li>
              <li>• Choose the most accurate and up-to-date information</li>
              <li>• Local version is what you changed on your device</li>
              <li>
                • Server version is from other healthcare workers or systems
              </li>
              <li>• When in doubt, choose the most recent version</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
