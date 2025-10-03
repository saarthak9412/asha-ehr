"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityScreen() {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setIsError(false);

      if (newPin.length === 4) {
        // Simulate PIN verification
        setTimeout(() => {
          if (newPin === "1234") {
            router.push("/onboarding");
          } else {
            setIsError(true);
            setPin("");
          }
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setIsError(false);
  };

  const handleBiometric = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-16 pb-8 text-center"
      >
        <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Access</h1>
        <p className="text-gray-600 px-8">
          Enter your 4-digit PIN to access ASHA Ki Kiran
        </p>
      </motion.div>

      {/* PIN Display */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="flex space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`w-4 h-4 rounded-full border-2 ${
                pin.length > index
                  ? showPin
                    ? "bg-primary border-primary"
                    : "bg-gray-400 border-gray-400"
                  : "border-gray-300"
              } ${isError ? "border-red-500 bg-red-100" : ""}`}
            >
              {showPin && pin[index] && (
                <span className="text-xs text-white flex items-center justify-center h-full">
                  {pin[index]}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Error Message */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-red-500 text-sm">
            Incorrect PIN. Please try again.
          </p>
        </motion.div>
      )}

      {/* PIN Visibility Toggle */}
      <div className="flex justify-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPin(!showPin)}
          className="text-gray-600"
        >
          {showPin ? (
            <EyeOff className="w-4 h-4 mr-2" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          )}
          {showPin ? "Hide PIN" : "Show PIN"}
        </Button>
      </div>

      {/* Number Pad */}
      <div className="flex-1 px-8">
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <motion.button
              key={number}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.05 * number }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePinInput(number.toString())}
              className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-soft flex items-center justify-center text-xl font-semibold text-gray-800 active:bg-gray-50"
            >
              {number}
            </motion.button>
          ))}

          {/* Empty space */}
          <div></div>

          {/* Zero */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePinInput("0")}
            className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-soft flex items-center justify-center text-xl font-semibold text-gray-800 active:bg-gray-50"
          >
            0
          </motion.button>

          {/* Backspace */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackspace}
            className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-soft flex items-center justify-center text-gray-600 active:bg-gray-50"
          >
            ←
          </motion.button>
        </div>
      </div>

      {/* Biometric Authentication */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="p-8"
      >
        <Button
          onClick={handleBiometric}
          variant="outline"
          className="w-full h-14 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Fingerprint className="w-6 h-6 mr-3" />
          Use Fingerprint
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Default PIN: 1234 for demo
        </p>
      </motion.div>
    </div>
  );
}
