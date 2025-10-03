"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  MapPin,
  Heart,
  Calendar,
  AlertCircle,
  Upload,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  address: string;
  bloodGroup: string;
  conditions: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  vitals: {
    bp: string;
    pulse: string;
    temperature: string;
    weight: string;
    height: string;
  };
  notes: string;
}

export default function EditPatientScreen() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState<Patient>({
    id: patientId,
    name: "राम शर्मा",
    age: 45,
    gender: "Male",
    phone: "+91 98765-43210",
    address: "गांव - नयागांव, पोस्ट - सिरसा, जिला - हरियाणा - 125055",
    bloodGroup: "B+",
    conditions: ["Diabetes Type 2", "Hypertension"],
    medications: ["Metformin 500mg", "Amlodipine 5mg"],
    emergencyContact: {
      name: "सुनीता शर्मा",
      phone: "+91 98765-43211",
      relation: "Wife",
    },
    vitals: {
      bp: "140/90",
      pulse: "72",
      temperature: "98.6",
      weight: "75",
      height: "170",
    },
    notes: "Patient is cooperative and follows medication schedule well.",
  });

  const handleSave = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    router.push(`/patients/${patientId}`);
  };

  const handleInputChange = (field: string, value: any) => {
    setPatient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVitalChange = (vital: string, value: string) => {
    setPatient((prev) => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [vital]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setPatient((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href={`/patients/${patientId}`}>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Edit Patient</h1>
              <p className="text-sm text-gray-500">{patient.name}</p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </div>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={patient.age}
                  onChange={(e) =>
                    handleInputChange("age", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={patient.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={patient.bloodGroup}
                  onChange={(e) =>
                    handleInputChange("bloodGroup", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={patient.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={patient.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitals */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Current Vitals
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure
                </label>
                <input
                  type="text"
                  value={patient.vitals.bp}
                  onChange={(e) => handleVitalChange("bp", e.target.value)}
                  placeholder="120/80"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pulse (bpm)
                </label>
                <input
                  type="text"
                  value={patient.vitals.pulse}
                  onChange={(e) => handleVitalChange("pulse", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature (°F)
                </label>
                <input
                  type="text"
                  value={patient.vitals.temperature}
                  onChange={(e) =>
                    handleVitalChange("temperature", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="text"
                  value={patient.vitals.weight}
                  onChange={(e) => handleVitalChange("weight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="text"
                  value={patient.vitals.height}
                  onChange={(e) => handleVitalChange("height", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Emergency Contact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={patient.emergencyContact.name}
                  onChange={(e) =>
                    handleEmergencyContactChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={patient.emergencyContact.phone}
                  onChange={(e) =>
                    handleEmergencyContactChange("phone", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relation
                </label>
                <input
                  type="text"
                  value={patient.emergencyContact.relation}
                  onChange={(e) =>
                    handleEmergencyContactChange("relation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clinical Notes */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Clinical Notes
            </h2>

            <textarea
              value={patient.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={4}
              placeholder="Add any additional notes about the patient..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-3">
          <Link href={`/patients/${patientId}`}>
            <Button variant="outline">Cancel</Button>
          </Link>

          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
