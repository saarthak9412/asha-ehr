"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LogoutScreen() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const logoutSteps = [
    { text: "Saving unsaved data...", icon: CheckCircle },
    { text: "Syncing with server...", icon: CheckCircle },
    { text: "Securing patient data...", icon: Shield },
    { text: "Clearing session...", icon: CheckCircle },
    { text: "Logout complete", icon: CheckCircle },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Simulate logout steps
    for (let i = 0; i < logoutSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Redirect to security screen
    router.push("/security");
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-10 h-10 text-blue-500" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Logging Out
              </h2>
              <p className="text-sm text-gray-600">
                Please wait while we secure your data...
              </p>
            </motion.div>

            <div className="space-y-3">
              {logoutSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isCompleted
                        ? "bg-green-50 border border-green-200"
                        : isCurrent
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {isCurrent ? (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Icon
                        className={`w-5 h-5 ${
                          isCompleted
                            ? "text-green-500"
                            : isPending
                            ? "text-gray-400"
                            : "text-blue-500"
                        }`}
                      />
                    )}

                    <span
                      className={`text-sm ${
                        isCompleted
                          ? "text-green-700"
                          : isCurrent
                          ? "text-blue-700"
                          : "text-gray-500"
                      }`}
                    >
                      {step.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-10 h-10 text-red-500" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sign Out
              </h1>
              <p className="text-gray-600">
                Are you sure you want to sign out from ASHA Ki Kiran?
              </p>
            </div>

            {/* Security Information */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Your data is secure
                    </p>
                    <p className="text-xs text-blue-700">
                      All patient data will be encrypted and safely stored on
                      this device.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-900 mb-1">
                      Unsaved changes
                    </p>
                    <p className="text-xs text-orange-700">
                      Any unsaved data will be automatically saved before
                      logout.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Device access
                    </p>
                    <p className="text-xs text-gray-600">
                      You'll need to enter your PIN to access the app again.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Activity */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last activity: Today at 3:45 PM</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                size="lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>

              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Cancel
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Need help? Contact your supervisor or
                <br />
                call the ASHA helpline: 1800-XXX-XXXX
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
