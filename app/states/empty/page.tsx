'use client';

import { useRouter } from 'next/navigation';
import { UserPlus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyStatePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-6"
        >
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-6xl">📋</span>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-secondary mb-3">
          No Patients Yet
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your patient list is empty. Start by adding your first patient to begin managing their health records.
        </p>

        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/patients/new')}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <UserPlus size={24} />
            Add First Patient
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/qr-scanner')}
            className="w-full bg-white text-secondary py-4 rounded-xl font-semibold text-lg shadow-md flex items-center justify-center gap-2 border-2 border-neutral"
          >
            <Search size={24} />
            Scan QR Code
          </motion.button>
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl p-4 border border-blue-200 text-left">
          <h4 className="font-semibold text-secondary text-sm mb-2">💡 Getting Started</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Add patients manually with their basic information</li>
            <li>• Use voice recording to quickly capture visit details</li>
            <li>• Generate QR codes for easy patient identification</li>
            <li>• All data is stored securely offline</li>
          </ul>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/home')}
          className="mt-6 text-primary font-semibold"
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
