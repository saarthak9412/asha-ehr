"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", flag: "🇮🇳" },
];

export default function LanguageSettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === selectedLanguage) return;

    setIsChanging(true);

    // Simulate language change process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSelectedLanguage(languageCode);
    setIsChanging(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Language Settings
              </h1>
              <p className="text-sm text-gray-500">भाषा सेटिंग्स</p>
            </div>
          </div>

          <Globe className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Current Language
            </h2>
            <p className="text-gray-600 mb-4">
              Choose your preferred language for the app interface
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {
                    languages.find((lang) => lang.code === selectedLanguage)
                      ?.flag
                  }
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    {
                      languages.find((lang) => lang.code === selectedLanguage)
                        ?.name
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {
                      languages.find((lang) => lang.code === selectedLanguage)
                        ?.nativeName
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Languages
            </h2>

            <div className="space-y-2">
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isChanging}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                    selectedLanguage === language.code
                      ? "bg-blue-50 border-blue-500 shadow-md"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  } ${
                    isChanging
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{language.flag}</span>
                      <div className="text-left">
                        <p
                          className={`font-medium ${
                            selectedLanguage === language.code
                              ? "text-blue-900"
                              : "text-gray-900"
                          }`}
                        >
                          {language.name}
                        </p>
                        <p
                          className={`text-sm ${
                            selectedLanguage === language.code
                              ? "text-blue-700"
                              : "text-gray-600"
                          }`}
                        >
                          {language.nativeName}
                        </p>
                      </div>
                    </div>

                    {selectedLanguage === language.code && (
                      <div className="flex items-center gap-2">
                        {isChanging ? (
                          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              Language Support Information
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Voice commands and speech recognition available in Hindi and
                  English
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Patient forms and medical terminology localized for all
                  supported languages
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Some features may have limited support in certain regional
                  languages
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Language changes take effect immediately without requiring app
                  restart
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
