"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  SkipForward,
  Users,
  Heart,
  Shield,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const onboardingSteps = [
  {
    id: 1,
    icon: Users,
    title: "Welcome to ASHA Ki Kiran",
    subtitle: "Your digital health companion",
    description:
      "Manage patient records, track health progress, and provide better care for your community with our mobile-first platform.",
    illustration: "👩‍⚕️",
  },
  {
    id: 2,
    icon: Heart,
    title: "Patient-Centered Care",
    subtitle: "Everything in one place",
    description:
      "Access complete patient histories, medications, and treatment plans. Voice-enabled features make data entry quick and easy.",
    illustration: "💝",
  },
  {
    id: 3,
    icon: Shield,
    title: "Secure & Private",
    subtitle: "Your data is protected",
    description:
      "Advanced encryption and secure sync ensure patient data remains confidential and accessible only to authorized healthcare workers.",
    illustration: "🔒",
  },
  {
    id: 4,
    icon: Mic,
    title: "Voice-First Experience",
    subtitle: "Speak naturally, work efficiently",
    description:
      "Record patient visits, update records, and set reminders using natural voice commands in Hindi, English, or your local language.",
    illustration: "🎤",
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/privacy-security");
    }
  };

  const skipOnboarding = () => {
    router.push("/privacy-security");
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const currentOnboardingStep = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header with Skip */}
      <div className="flex justify-between items-center p-6 pt-12">
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={skipOnboarding}
          className="text-gray-600 p-2"
        >
          <SkipForward className="w-4 h-4 mr-1" />
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full flex flex-col"
          >
            {/* Illustration */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <Card className="w-64 h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 border-0">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {currentOnboardingStep.illustration}
                    </div>
                    <currentOnboardingStep.icon className="w-12 h-12 text-primary mx-auto" />
                  </div>
                </Card>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full"></div>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h1 className="text-3xl font-bold text-gray-900">
                {currentOnboardingStep.title}
              </h1>
              <p className="text-lg text-primary font-medium">
                {currentOnboardingStep.subtitle}
              </p>
              <p className="text-gray-600 leading-relaxed px-4">
                {currentOnboardingStep.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-6 space-y-4"
      >
        <Button onClick={nextStep} className="w-full h-14 text-lg">
          {currentStep < onboardingSteps.length - 1 ? (
            <>
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {currentStep + 1} of {onboardingSteps.length}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
