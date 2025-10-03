"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import Onboarding from "@/components/Onboarding";

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboarding_completed");

    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }

    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <>{children}</>;
}
