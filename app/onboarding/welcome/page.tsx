'use client';

import { useRouter } from 'next/navigation';
import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeOnboarding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/10 flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-8 shadow-xl"
        >
          <Heart size={64} className="text-white fill-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-secondary mb-4"
        >
          Welcome to<br />ASHA EHR Companion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-600 max-w-md mb-12 px-4"
        >
          Your trusted digital assistant for community health care. 
          Empowering ASHA workers across India with offline-first technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 w-full max-w-sm"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎤</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-secondary mb-1">Voice First</h3>
                <p className="text-sm text-gray-600">Record patient visits using your voice in Hindi or local language</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📱</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-secondary mb-1">Offline Ready</h3>
                <p className="text-sm text-gray-600">Work seamlessly without internet. Sync when connected</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-secondary mb-1">Secure & Private</h3>
                <p className="text-sm text-gray-600">Patient data encrypted and protected at all times</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push('/onboarding/privacy')}
        className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
      >
        Get Started
        <ArrowRight size={24} />
      </motion.button>

      <div className="flex justify-center gap-2 mt-6">
        <div className="w-8 h-1 bg-primary rounded-full"></div>
        <div className="w-2 h-1 bg-neutral rounded-full"></div>
        <div className="w-2 h-1 bg-neutral rounded-full"></div>
      </div>
    </div>
  );
}
