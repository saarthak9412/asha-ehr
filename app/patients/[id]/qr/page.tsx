"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Share2,
  User,
  QrCode,
  Calendar,
  MapPin,
  Phone,
  Heart,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import QRCode from "react-qr-code";
import patientsData from "@/data/patients.json";

export default function PatientQRScreen() {
  const params = useParams();
  const patientId = params.id as string;
  const [copied, setCopied] = useState(false);

  const patient = patientsData.find((p) => p.id === patientId);

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

  // Create comprehensive patient data for QR code
  const qrData = {
    id: patient.id,
    name: patient.name,
    age: patient.age,
    healthCard: patient.healthCard,
    village: patient.village,
    phone: patient.phone,
    conditions: patient.conditions,
    medications: patient.medications,
    allergies: patient.allergies,
    riskLevel: patient.riskLevel,
    emergencyContact: patient.emergencyContact,
    lastVisit: patient.lastVisit,
    ashaWorker: "Priya Kumari",
    generated: new Date().toISOString(),
  };

  const qrString = JSON.stringify(qrData);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sharePatientCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${patient.name} - Health Card`,
          text: `Health information for ${patient.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <Link href={`/patients/${patient.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <h1 className="text-xl font-bold text-gray-900">Health Card</h1>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={sharePatientCard}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Patient Health Card */}
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-6">
              {/* Card Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {patient.name}
                </h2>
                <p className="text-gray-600">
                  Health Card ID: {patient.healthCard}
                </p>
              </div>

              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Age</p>
                  <p className="font-medium text-gray-900">
                    {patient.age} years
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Risk Level</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      patient.riskLevel === "High"
                        ? "bg-red-100 text-red-700"
                        : patient.riskLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {patient.riskLevel}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Village</p>
                  <p className="font-medium text-gray-900">{patient.village}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phone</p>
                  <p className="font-medium text-gray-900">{patient.phone}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="bg-white p-4 rounded-xl shadow-inner inline-block">
                  <QRCode
                    value={qrString}
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox="0 0 256 256"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Scan to access complete health information
                </p>
              </div>

              {/* Medical Summary */}
              <div className="space-y-4">
                {patient.conditions.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      Conditions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.map((condition, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {patient.allergies.length > 0 && (
                  <div>
                    <h3 className="font-medium text-red-700 mb-2">
                      ⚠️ Allergies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Emergency Contact
                  </h3>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">
                      {patient.emergencyContact.name}
                    </p>
                    <p>({patient.emergencyContact.relation})</p>
                    <p className="flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" />
                      {patient.emergencyContact.phone}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    ASHA Worker: Priya Kumari
                  </p>
                  <p className="text-xs text-gray-500">
                    Generated: {new Date().toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Ministry of Health & Family Welfare, Government of India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-3"
        >
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="w-full h-12"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy Health Data"}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="h-12"
              onClick={sharePatientCard}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Card
            </Button>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                <QrCode className="w-4 h-4 mr-2" />
                How to use this QR code
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Healthcare workers can scan to access patient information
                </li>
                <li>• Works offline - data is embedded in the QR code</li>
                <li>• Share with specialists or during emergency situations</li>
                <li>• Always verify patient identity before sharing</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
