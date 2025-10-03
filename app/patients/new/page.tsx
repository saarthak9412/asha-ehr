"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  MapPin,
  Calendar,
  Heart,
  AlertTriangle,
  Camera,
  Mic,
  QrCode,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePatients } from "@/lib/data";

export default function NewPatientScreen() {
  const router = useRouter();
  const { addPatient } = usePatients();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    age: "",
    gender: "female",
    phone: "",
    alternatePhone: "",

    // Address
    houseNumber: "",
    street: "",
    village: "",
    district: "Durg",
    state: "Chhattisgarh",
    pincode: "",

    // Health Information
    bloodGroup: "",
    height: "",
    weight: "",
    allergies: [] as string[],
    chronicConditions: [] as string[],
    medications: [] as string[],

    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",

    // Additional
    occupation: "",
    maritalStatus: "married",
    religion: "",
    caste: "",
    rationCardNumber: "",
    aadharNumber: "",
    healthCardNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addToArray = (
    field: "allergies" | "chronicConditions" | "medications",
    value: string
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  const removeFromArray = (
    field: "allergies" | "chronicConditions" | "medications",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.age.trim()) newErrors.age = "Age is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (formData.phone && !/^[+]?[0-9\s-()]+$/.test(formData.phone)) {
        newErrors.phone = "Invalid phone number format";
      }
    }

    if (stepNumber === 2) {
      if (!formData.village.trim()) newErrors.village = "Village is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    }

    if (stepNumber === 4) {
      if (!formData.emergencyName.trim())
        newErrors.emergencyName = "Emergency contact name is required";
      if (!formData.emergencyPhone.trim())
        newErrors.emergencyPhone = "Emergency contact phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const savePatient = () => {
    if (validateStep(step)) {
      // Create patient object with proper structure
      const patientData = {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender as "Male" | "Female",
        phone: formData.phone,
        address: `${formData.houseNumber} ${formData.street}, ${formData.village}, ${formData.district}, ${formData.state} - ${formData.pincode}`,
        bloodGroup: formData.bloodGroup,
        conditions: formData.chronicConditions,
        medications: formData.medications,
        riskLevel: "Low" as const,
        lastVisit: new Date().toISOString().split("T")[0],
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relation: formData.emergencyRelation,
        },
        vitals: {
          bp: "120/80",
          pulse: "72",
          temperature: "98.6",
          weight: formData.weight,
          height: formData.height,
          lastUpdated: new Date().toISOString().split("T")[0],
        },
        notes: voiceNote || "Initial registration",
        immunizations: [],
      };

      // Save patient to local storage
      const newPatient = addPatient(patientData);

      // Navigate to patient detail page
      router.push(`/patients/${newPatient.id}`);
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      // Simulate recording
      setTimeout(() => {
        setIsRecordingVoice(false);
        setVoiceNote(
          "Voice note recorded - Patient introduction and initial health assessment"
        );
      }, 3000);
    }
  };

  const stepTitles = [
    "Basic Information",
    "Address Details",
    "Health Information",
    "Emergency Contact",
    "Review & Save",
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className={`w-full p-3 border rounded-xl ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter patient's full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  className={`w-full p-3 border rounded-xl ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Age"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData("gender", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className={`w-full p-3 border rounded-xl ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alternate Phone
              </label>
              <input
                type="tel"
                value={formData.alternatePhone}
                onChange={(e) =>
                  updateFormData("alternatePhone", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="Alternate contact number"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  House Number
                </label>
                <input
                  type="text"
                  value={formData.houseNumber}
                  onChange={(e) =>
                    updateFormData("houseNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="House/Door No."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street/Area
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => updateFormData("street", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Street name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Village/Town *
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => updateFormData("village", e.target.value)}
                className={`w-full p-3 border rounded-xl ${
                  errors.village ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Village or town name"
              />
              {errors.village && (
                <p className="text-red-500 text-xs mt-1">{errors.village}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => updateFormData("district", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="Durg">Durg</option>
                  <option value="Raipur">Raipur</option>
                  <option value="Bhilai">Bhilai</option>
                  <option value="Korba">Korba</option>
                  <option value="Bilaspur">Bilaspur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => updateFormData("pincode", e.target.value)}
                  className={`w-full p-3 border rounded-xl ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="491001"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => updateFormData("state", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="State"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => updateFormData("bloodGroup", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="">Select</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="160"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="65"
                />
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Allergies
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {allergy}
                    <button
                      onClick={() => removeFromArray("allergies", index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-3 border border-gray-300 rounded-xl"
                  placeholder="Add allergy (e.g., Penicillin)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addToArray("allergies", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value) {
                      addToArray("allergies", input.value);
                      input.value = "";
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chronic Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chronic Conditions
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.chronicConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {condition}
                    <button
                      onClick={() =>
                        removeFromArray("chronicConditions", index)
                      }
                      className="ml-2 text-yellow-500 hover:text-yellow-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-3 border border-gray-300 rounded-xl"
                  placeholder="Add condition (e.g., Diabetes, Hypertension)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addToArray("chronicConditions", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget
                      .previousElementSibling as HTMLInputElement;
                    if (input.value) {
                      addToArray("chronicConditions", input.value);
                      input.value = "";
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Voice Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Notes
              </label>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant={isRecordingVoice ? "destructive" : "outline"}
                  onClick={toggleVoiceRecording}
                  className="w-full"
                  disabled={isRecordingVoice}
                >
                  <Mic
                    className={`w-4 h-4 mr-2 ${
                      isRecordingVoice ? "animate-pulse" : ""
                    }`}
                  />
                  {isRecordingVoice
                    ? "Recording..."
                    : "Record Health Assessment"}
                </Button>

                {voiceNote && (
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">{voiceNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name *
              </label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) =>
                  updateFormData("emergencyName", e.target.value)
                }
                className={`w-full p-3 border rounded-xl ${
                  errors.emergencyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Full name of emergency contact"
              />
              {errors.emergencyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emergencyName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <select
                value={formData.emergencyRelation}
                onChange={(e) =>
                  updateFormData("emergencyRelation", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
              >
                <option value="">Select relationship</option>
                <option value="husband">Husband</option>
                <option value="wife">Wife</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="brother">Brother</option>
                <option value="sister">Sister</option>
                <option value="friend">Friend</option>
                <option value="neighbor">Neighbor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Phone *
              </label>
              <input
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) =>
                  updateFormData("emergencyPhone", e.target.value)
                }
                className={`w-full p-3 border rounded-xl ${
                  errors.emergencyPhone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.emergencyPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emergencyPhone}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => updateFormData("occupation", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Farmer, Teacher, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    updateFormData("maritalStatus", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ration Card Number
              </label>
              <input
                type="text"
                value={formData.rationCardNumber}
                onChange={(e) =>
                  updateFormData("rationCardNumber", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder="Enter ration card number"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">
                      {formData.name}
                    </h3>
                    <p className="text-green-700">
                      Age {formData.age} • {formData.gender}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Contact Information
                </h4>
                <p className="text-gray-600">{formData.phone}</p>
                {formData.alternatePhone && (
                  <p className="text-gray-600">{formData.alternatePhone}</p>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600">
                  {[
                    formData.houseNumber,
                    formData.street,
                    formData.village,
                    formData.district,
                    formData.state,
                    formData.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>

              {formData.chronicConditions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Health Conditions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.chronicConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.allergies.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Emergency Contact
                </h4>
                <p className="text-gray-600">
                  {formData.emergencyName} ({formData.emergencyRelation})
                </p>
                <p className="text-gray-600">{formData.emergencyPhone}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
          <Link href="/patients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Add New Patient</h1>
            <p className="text-sm text-gray-600">
              Step {step} of {stepTitles.length}: {stepTitles[step - 1]}
            </p>
          </div>

          <div className="w-16" />
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / stepTitles.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Form Content */}
      <motion.div
        key={step}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <Card>
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t p-4"
      >
        <div className="flex space-x-3 max-w-md mx-auto">
          {step > 1 && (
            <Button onClick={prevStep} variant="outline" className="flex-1">
              Previous
            </Button>
          )}

          {step < stepTitles.length ? (
            <Button onClick={nextStep} className="flex-1">
              Next
            </Button>
          ) : (
            <Button onClick={savePatient} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Patient
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
