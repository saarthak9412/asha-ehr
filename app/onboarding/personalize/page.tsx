'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, Languages, Mic, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PersonalizeOnboarding() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Bengali'];

  const handleComplete = () => {
    // In a real app, this would save preferences
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/10 flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 mt-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <User size={48} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-secondary mb-3">
          Personalize Your App
        </h1>
        <p className="text-gray-600 text-base px-4">
          Let's customize the app for your needs
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1 space-y-6 mb-6"
      >
        {/* Name Input */}
        <div>
          <label className="flex items-center gap-2 text-secondary font-semibold mb-3 text-base">
            <User size={20} />
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-4 bg-white border-2 border-neutral rounded-xl focus:border-primary focus:outline-none text-base"
          />
        </div>

        {/* Area/Village Input */}
        <div>
          <label className="flex items-center gap-2 text-secondary font-semibold mb-3 text-base">
            <MapPin size={20} />
            Your Service Area
          </label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Village or area name"
            className="w-full px-4 py-4 bg-white border-2 border-neutral rounded-xl focus:border-primary focus:outline-none text-base"
          />
        </div>

        {/* Language Selection */}
        <div>
          <label className="flex items-center gap-2 text-secondary font-semibold mb-3 text-base">
            <Languages size={20} />
            Preferred Language
          </label>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <motion.button
                key={lang}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-3 rounded-xl font-medium text-base transition-all ${
                  language === lang
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-neutral hover:border-primary/50'
                }`}
              >
                {lang}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Voice Input Toggle */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-neutral/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mic size={24} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-secondary text-base">Voice Input</h3>
                <p className="text-sm text-gray-600">Enable voice recording for visits</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                voiceEnabled ? 'bg-primary' : 'bg-neutral'
              }`}
            >
              <motion.div
                animate={{ x: voiceEnabled ? 24 : 0 }}
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleComplete}
        disabled={!name || !area}
        className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 transition-colors ${
          name && area
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-neutral text-gray-400 cursor-not-allowed'
        }`}
      >
        Complete Setup
        <Check size={24} />
      </motion.button>

      <div className="flex justify-center gap-2 mt-6">
        <div className="w-2 h-1 bg-neutral rounded-full"></div>
        <div className="w-2 h-1 bg-neutral rounded-full"></div>
        <div className="w-8 h-1 bg-primary rounded-full"></div>
      </div>
    </div>
  );
}
