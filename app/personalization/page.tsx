"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Globe, ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const languages = [
  { code: "hi", name: "हिंदी", english: "Hindi", flag: "🇮🇳" },
  { code: "en", name: "English", english: "English", flag: "🇺🇸" },
  { code: "te", name: "తెలుగు", english: "Telugu", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", english: "Tamil", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", english: "Bengali", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", english: "Marathi", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", english: "Gujarati", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", english: "Malayalam", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi", flag: "🇮🇳" },
];

export default function PersonalizationScreen() {
  const [detectedLanguage, setDetectedLanguage] = useState("hi");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const router = useRouter();

  const handleLanguageDetection = () => {
    setIsDetecting(true);
    // Simulate language detection
    setTimeout(() => {
      setDetectedLanguage("hi");
      setSelectedLanguage("hi");
      setIsDetecting(false);
    }, 2000);
  };

  const handleContinue = () => {
    router.push("/voice-preference");
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-16 pb-8 text-center px-6"
      >
        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-soft">
          <Globe className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Language Setup
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Choose your preferred language for voice commands and interface
        </p>
      </motion.div>

      {/* Language Detection */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-6 mb-8"
      >
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-4">
              Automatic Language Detection
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Say "नमस्ते, मैं ASHA कार्यकर्ता हूं" to detect your language
            </p>

            <Button
              onClick={handleLanguageDetection}
              disabled={isDetecting}
              variant="outline"
              className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white"
            >
              {isDetecting ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center"
                >
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                  Detecting...
                </motion.div>
              ) : (
                "Start Detection"
              )}
            </Button>

            {detectedLanguage && !isDetecting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center text-green-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">Hindi detected!</span>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Manual Language Selection */}
      <div className="px-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Or choose manually:
        </h3>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full p-4 bg-white border border-gray-200 rounded-xl shadow-soft flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{selectedLang?.flag}</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  {selectedLang?.name}
                </p>
                <p className="text-sm text-gray-500">{selectedLang?.english}</p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setSelectedLanguage(language.code);
                    setShowDropdown(false);
                  }}
                  className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-900">{language.name}</p>
                    <p className="text-sm text-gray-500">{language.english}</p>
                  </div>
                  {selectedLanguage === language.code && (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Information Note */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-6 mb-8"
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You can change this language setting
              anytime from the app settings. Voice commands will work in your
              selected language.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto p-6"
      >
        <Button onClick={handleContinue} className="w-full h-14 text-lg">
          Continue Setup
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Voice recognition accuracy improves with usage
        </p>
      </motion.div>
    </div>
  );
}
