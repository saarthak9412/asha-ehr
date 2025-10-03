"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Eye,
  Database,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const privacyFeatures = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "All patient data is encrypted before leaving your device",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Multi-factor authentication keeps unauthorized users out",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description: "Only you and authorized healthcare workers can access data",
  },
  {
    icon: Database,
    title: "Local Storage First",
    description: "Data is stored locally and synced securely when needed",
  },
];

export default function PrivacySecurityScreen() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (agreedToTerms) {
      router.push("/personalization");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-16 pb-8 text-center px-6"
      >
        <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center shadow-soft">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Privacy & Security
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Your patients' data is protected with industry-leading security
          measures
        </p>
      </motion.div>

      {/* Features List */}
      <div className="flex-1 px-6 space-y-4">
        {privacyFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <Card className="border-0 shadow-soft">
              <CardContent className="p-4 flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Key Points */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="px-6 py-6"
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              What this means for you:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Patient data never leaves your device unencrypted
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You control who has access to patient information
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Data can be accessed offline when needed
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Regular security audits ensure system integrity
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Agreement and Continue */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="p-6 space-y-4"
      >
        {/* Agreement Checkbox */}
        <div className="flex items-start space-x-3">
          <button
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
              agreedToTerms
                ? "bg-primary border-primary"
                : "border-gray-300 bg-white"
            }`}
          >
            {agreedToTerms && <CheckCircle className="w-3 h-3 text-white" />}
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              I understand and agree to the{" "}
              <span className="text-primary underline">Privacy Policy</span> and{" "}
              <span className="text-primary underline">Terms of Service</span>.
              I acknowledge that patient data will be handled according to
              healthcare privacy regulations.
            </p>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!agreedToTerms}
          className="w-full h-14 text-lg"
        >
          Continue
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-center text-xs text-gray-500">
          By continuing, you confirm that you are an authorized ASHA worker
        </p>
      </motion.div>
    </div>
  );
}
