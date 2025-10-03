"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation, SupportedLanguage } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";
import {
  Heart,
  Users,
  Calendar,
  Shield,
  CheckCircle,
  ChevronRight,
  Star,
  Globe,
  Smartphone,
  Activity,
} from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>("en");

  const steps = [
    {
      id: "language",
      title: t("chooseLanguage"),
      subtitle: t("selectLanguage"),
      icon: Globe,
      component: (
        <LanguageSelector
          onLanguageSelect={(lang) => {
            setSelectedLanguage(lang);
            setCurrentStep(1);
          }}
        />
      ),
    },
    {
      id: "welcome",
      title: t("welcome"),
      subtitle: t("welcomeMessage"),
      icon: Heart,
      component: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
          >
            <Heart className="w-12 h-12 text-primary" />
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {t("appName")}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {t("welcomeMessage")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 p-4 rounded-lg text-center"
            >
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900">
                {t("patients")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-50 p-4 rounded-lg text-center"
            >
              <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900">
                {t("reminders")}
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: "features",
      title: t("quickActions"),
      subtitle: "Powerful tools for healthcare management",
      icon: Star,
      component: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              {
                icon: Users,
                title: t("patients"),
                description: "Complete patient records management",
                color: "blue",
              },
              {
                icon: Calendar,
                title: t("reminders"),
                description: "Never miss important checkups",
                color: "green",
              },
              {
                icon: Activity,
                title: t("vitals"),
                description: "Track health metrics and trends",
                color: "purple",
              },
              {
                icon: Shield,
                title: t("security"),
                description: "Secure and private data storage",
                color: "red",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="border-l-4 border-l-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 bg-${feature.color}-100 rounded-lg flex items-center justify-center`}
                      >
                        <feature.icon
                          className={`w-5 h-5 text-${feature.color}-600`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as complete
      if (typeof window !== "undefined") {
        localStorage.setItem("onboarding_completed", "true");
      }
      onComplete();
    }
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("onboarding_completed", "true");
    }
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-blue-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {t("step")} {currentStep + 1} {t("of")} {steps.length}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                {t("skip")}
              </Button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                >
                  <currentStepData.icon className="w-12 h-12 text-primary mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-600">{currentStepData.subtitle}</p>
              </div>

              {currentStepData.component}

              {/* Navigation Buttons */}
              {currentStep > 0 && (
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    {t("previous")}
                  </Button>

                  <Button onClick={handleNext}>
                    {currentStep === steps.length - 1
                      ? t("getStarted")
                      : t("next")}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
