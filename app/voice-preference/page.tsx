"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Hand, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const voicePreferences = [
  {
    id: "max-voice",
    title: "Maximum Voice Control",
    subtitle: "Hands-free operation",
    description:
      "Use voice for all interactions including navigation, data entry, and commands. Perfect for busy field work.",
    icon: Volume2,
    features: [
      "Voice navigation",
      "Voice data entry",
      "Voice commands",
      "Audio feedback",
    ],
    recommended: true,
  },
  {
    id: "hybrid",
    title: "Voice + Manual",
    subtitle: "Best of both worlds",
    description:
      "Combine voice commands for data entry with touch controls for navigation. Ideal for most ASHA workers.",
    icon: Mic,
    features: [
      "Voice data entry",
      "Touch navigation",
      "Voice shortcuts",
      "Mixed input",
    ],
    recommended: false,
  },
  {
    id: "manual",
    title: "Manual Only",
    subtitle: "Traditional touch interface",
    description:
      "Use touch and typing for all interactions. Good for quiet environments or when voice is not preferred.",
    icon: Hand,
    features: [
      "Touch navigation",
      "Keyboard input",
      "Visual interface",
      "Silent operation",
    ],
    recommended: false,
  },
];

export default function VoicePreferenceScreen() {
  const [selectedPreference, setSelectedPreference] = useState("max-voice");
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const handlePreviewVoice = () => {
    setIsPlaying(true);
    // Simulate voice preview
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleContinue = () => {
    router.push("/home");
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
        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-soft">
          <Mic className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Voice Preferences
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Choose how you'd like to interact with the app
        </p>
      </motion.div>

      {/* Voice Preview */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8"
      >
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Try Voice Commands
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Listen to how voice interactions work
            </p>
            <Button
              onClick={handlePreviewVoice}
              disabled={isPlaying}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              {isPlaying ? (
                <motion.div className="flex items-center">
                  <div className="flex space-x-1 mr-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-4 bg-primary rounded-full"
                        animate={{
                          scaleY: [1, 2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  Playing...
                </motion.div>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Play Sample
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preference Options */}
      <div className="flex-1 px-6 space-y-4">
        {voicePreferences.map((preference, index) => (
          <motion.div
            key={preference.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card
              className={`border-2 transition-all cursor-pointer ${
                selectedPreference === preference.id
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPreference(preference.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedPreference === preference.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <preference.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {preference.title}
                      </h3>
                      {preference.recommended && (
                        <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-primary font-medium mb-2">
                      {preference.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {preference.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {preference.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Information */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-6 py-4"
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              <strong>Good to know:</strong> You can change these preferences
              anytime in settings. Voice features require microphone
              permissions.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-6"
      >
        <Button onClick={handleContinue} className="w-full h-14 text-lg">
          Start Using ASHA Ki Kiran
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
