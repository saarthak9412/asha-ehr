'use client';

import { useRouter } from 'next/navigation';
import { Shield, Lock, Eye, Database, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyOnboarding() {
  const router = useRouter();

  const privacyFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All patient data is encrypted both in transit and at rest',
    },
    {
      icon: Eye,
      title: 'Privacy by Design',
      description: 'Only you and authorized healthcare providers can access records',
    },
    {
      icon: Database,
      title: 'Local Data Storage',
      description: 'Data stored securely on your device, synced only when you approve',
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Meets ABDM and government healthcare data standards',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/5 flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 mt-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <Shield size={48} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-secondary mb-3">
          Privacy & Security
        </h1>
        <p className="text-gray-600 text-base px-4">
          Your patients' trust is our priority. Here's how we protect their data.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1 space-y-4 mb-6"
      >
        {privacyFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-md border border-neutral/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-secondary" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-secondary mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-primary/10 rounded-2xl p-5 mb-6 border border-primary/20"
      >
        <p className="text-sm text-secondary text-center">
          <span className="font-semibold">Important:</span> You are responsible for keeping your device PIN secure. Never share it with anyone.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push('/onboarding/personalize')}
        className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
      >
        I Understand
        <ArrowRight size={24} />
      </motion.button>

      <div className="flex justify-center gap-2 mt-6">
        <div className="w-2 h-1 bg-neutral rounded-full"></div>
        <div className="w-8 h-1 bg-primary rounded-full"></div>
        <div className="w-2 h-1 bg-neutral rounded-full"></div>
      </div>
    </div>
  );
}
