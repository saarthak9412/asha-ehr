"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Mic,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Settings,
  HeadphonesIcon,
  MicIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VoiceSettingsScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [micSensitivity, setMicSensitivity] = useState(0.7);
  const [selectedVoice, setSelectedVoice] = useState("female-hindi");

  const voices = [
    {
      id: "female-hindi",
      name: "Female Hindi",
      description: "महिला हिंदी आवाज़",
    },
    { id: "male-hindi", name: "Male Hindi", description: "पुरुष हिंदी आवाज़" },
    {
      id: "female-english",
      name: "Female English",
      description: "Female English Voice",
    },
    {
      id: "male-english",
      name: "Male English",
      description: "Male English Voice",
    },
  ];

  const handleTestRecording = () => {
    setIsRecording(!isRecording);
    // Simulate recording
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  const handleTestPlayback = () => {
    setIsPlaying(!isPlaying);
    // Simulate playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 2000);
    }
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
                Voice Settings
              </h1>
              <p className="text-sm text-gray-500">आवाज़ सेटिंग्स</p>
            </div>
          </div>

          <Mic className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Voice Commands Toggle */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Voice Commands
                </h2>
                <p className="text-sm text-gray-600">
                  Enable voice control for the app
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {voiceEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <Mic className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Voice commands are active
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Say "ASHA" to activate voice commands
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice Selection */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Voice Assistant
            </h2>

            <div className="space-y-3">
              {voices.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedVoice === voice.id
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`font-medium ${
                          selectedVoice === voice.id
                            ? "text-blue-900"
                            : "text-gray-900"
                        }`}
                      >
                        {voice.name}
                      </p>
                      <p
                        className={`text-sm ${
                          selectedVoice === voice.id
                            ? "text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        {voice.description}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestPlayback();
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Speech Speed */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Speech Speed
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Slow</span>
                <span className="text-sm text-gray-600">Fast</span>
              </div>

              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechSpeed}
                onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />

              <div className="text-center">
                <span className="text-sm font-medium text-gray-900">
                  {speechSpeed}x speed
                </span>
              </div>

              <button
                onClick={handleTestPlayback}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Stop Test
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Test Speech Speed
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Microphone Settings */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Microphone Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Microphone Sensitivity
                </label>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Low</span>
                    <span className="text-sm text-gray-600">High</span>
                  </div>

                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={micSensitivity}
                    onChange={(e) =>
                      setMicSensitivity(parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />

                  <div className="text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round(micSensitivity * 100)}% sensitivity
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleTestRecording}
                  className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isRecording
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  <MicIcon className="w-4 h-4" />
                  {isRecording ? "Stop Recording" : "Test Microphone"}
                </button>

                {isRecording && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">
                        Recording... Speak now
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Commands Help */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Voice Commands
            </h2>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">
                  "ASHA नया मरीज़"
                </p>
                <p className="text-sm text-gray-600">Add a new patient</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">
                  "ASHA voice visit"
                </p>
                <p className="text-sm text-gray-600">
                  Start a voice consultation
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">"ASHA QR scan"</p>
                <p className="text-sm text-gray-600">Open QR code scanner</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-900 mb-1">"ASHA home"</p>
                <p className="text-sm text-gray-600">Go to home screen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
