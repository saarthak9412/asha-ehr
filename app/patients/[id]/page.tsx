"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Pill,
  Activity,
  Edit3,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { usePatients } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { useTranslatedData } from "@/lib/dataHelpers";

export default function PatientDetailScreen() {
  const params = useParams();
  const patientId = params.id as string;
  const { getPatient } = usePatients();
  const { t } = useTranslation();
  const { translatePatient } = useTranslatedData();

  const patient = getPatient(patientId);
  const translatedPatient = patient ? translatePatient(patient) : null;

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Patient Not Found
          </h2>
          <Link href="/patients">
            <Button>Back to Patients</Button>
          </Link>
        </div>
      </div>
    );
  }

  const riskColor = {
    Low: "text-green-600 bg-green-100",
    Medium: "text-yellow-600 bg-yellow-100",
    High: "text-red-600 bg-red-100",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <Link href="/patients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patients
            </Button>
          </Link>

          <div className="flex space-x-2">
            <Link href={`/patients/${patient.id}/qr`}>
              <Button variant="outline" size="sm">
                <QrCode className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/patients/${patient.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Patient Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {translatedPatient?.name}
                  </h1>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      riskColor[patient.riskLevel as keyof typeof riskColor]
                    }`}
                  >
                    {patient.riskLevel} Risk
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Age {patient.age} • ID: {patient.id}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {translatedPatient?.address}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {patient.phone}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Health Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Health Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Current Status
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      patient.riskLevel === "High"
                        ? "bg-red-100 text-red-700"
                        : patient.riskLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Risk: {patient.riskLevel}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Last Visit</h4>
                  <p className="text-gray-600">
                    {new Date(patient.lastVisit).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medical Conditions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Medical Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {translatedPatient && translatedPatient.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {translatedPatient.conditions.map(
                    (condition: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                      >
                        {condition}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No medical conditions recorded
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Medications */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {translatedPatient && translatedPatient.medications.length > 0 ? (
                <div className="space-y-3">
                  {translatedPatient.medications.map(
                    (medication: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium text-gray-900">
                          {medication}
                        </span>
                        <span className="text-sm text-gray-500">Active</span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">No medications recorded</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-900">
                    {translatedPatient?.emergencyContact.name}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({translatedPatient?.emergencyContact.relation})
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {patient.emergencyContact.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
