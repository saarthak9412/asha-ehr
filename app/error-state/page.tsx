"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorStateScreen() {
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();

  const handleRetry = () => {
    setIsRetrying(true);

    // Simulate retry attempt
    setTimeout(() => {
      setIsRetrying(false);
      // In a real app, this might reload the page or retry the failed operation
      router.refresh();
    }, 2000);
  };

  const reportError = () => {
    // In a real app, this would send error report to backend
    console.log("Error reported to support team");
    alert("Error report sent! Our team will investigate this issue.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm w-full text-center"
      >
        {/* Error Illustration */}
        <div className="mb-8">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{
              rotate: [-10, 10, -10],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto w-40 h-40 mb-6"
          >
            {/* Background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-full"></div>

            {/* Error icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            {/* Animated warning rings */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0.3, 0.7],
                rotate: [0, 360, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 border-2 border-dashed border-red-300 rounded-full"
            ></motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            We encountered an unexpected error. Don't worry - your patient data
            is safe. Please try again or contact support if the problem
            persists.
          </p>

          {/* Error Details */}
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-red-900 mb-2">Error Details</h3>
              <div className="text-sm text-red-800 text-left space-y-1">
                <p>
                  <strong>Error Code:</strong> EHR-500
                </p>
                <p>
                  <strong>Time:</strong> {new Date().toLocaleString()}
                </p>
                <p>
                  <strong>Component:</strong> Patient Data Sync
                </p>
                <p>
                  <strong>Message:</strong> Unable to process request
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              size="lg"
              className="w-full h-14 text-lg"
            >
              {isRetrying ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 mr-3"
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
              ) : (
                <RefreshCw className="w-5 h-5 mr-3" />
              )}
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/home">
                <Button variant="outline" size="lg" className="w-full h-12">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>

              <Button
                onClick={reportError}
                variant="outline"
                size="lg"
                className="w-full h-12"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Report Error
              </Button>
            </div>

            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Troubleshooting Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-3">
                Quick Troubleshooting
              </h3>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Check your internet connection
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Close and reopen the app
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Try again in a few minutes
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Contact support if issue persists
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6"
        >
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our support team is available 24/7 to help you
              </p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Helpline:</strong> 1800-123-4567
                </p>
                <p>
                  <strong>Email:</strong> support@asha-ehr.gov.in
                </p>
                <p>
                  <strong>WhatsApp:</strong> +91 98765 43210
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
