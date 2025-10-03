"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useTranslation,
  supportedLanguages,
  SupportedLanguage,
} from "@/lib/i18n";
import { Check, ChevronRight, Globe } from "lucide-react";

interface LanguageSelectorProps {
  onLanguageSelect?: (language: SupportedLanguage) => void;
  compact?: boolean;
}

export default function LanguageSelector({
  onLanguageSelect,
  compact = false,
}: LanguageSelectorProps) {
  const { t, currentLanguage, setLanguage } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(currentLanguage);

  const handleLanguageSelect = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    setLanguage(language);
    onLanguageSelect?.(language);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {t("language")}
        </label>
        <select
          value={currentLanguage}
          onChange={(e) =>
            handleLanguageSelect(e.target.value as SupportedLanguage)
          }
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <Globe className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">
          {t("chooseLanguage")}
        </h2>
        <p className="text-gray-600">{t("selectLanguage")}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
        {supportedLanguages.map((language) => (
          <motion.div
            key={language.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: supportedLanguages.indexOf(language) * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedLanguage === language.code
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-gray-200 hover:border-primary/50"
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {language.nativeName}
                      </p>
                      <p className="text-sm text-gray-500">{language.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedLanguage === language.code && (
                      <span className="px-2 py-1 text-xs bg-primary text-white rounded-full flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        {t("selected")}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {onLanguageSelect && (
        <div className="text-center pt-4">
          <Button
            onClick={() => onLanguageSelect(selectedLanguage)}
            className="px-8"
          >
            {t("continue")} <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
