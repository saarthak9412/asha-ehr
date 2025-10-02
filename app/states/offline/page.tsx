'use client';

import { useRouter } from 'next/navigation';
import { WifiOff, RefreshCw, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OfflineStatePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-6">
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
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-200">
            <WifiOff size={64} className="text-yellow-600" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-secondary mb-3">
          You're Offline
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          No internet connection detected. Don't worry, you can continue working. Your data will sync automatically when connected.
        </p>

        {/* Feature Cards */}
        <div className="space-y-3 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-md text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-sm mb-1">
                  Full Offline Access
                </h4>
                <p className="text-xs text-gray-600">
                  View all patients, add records, and record visits
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-sm mb-1">
                  Auto-Sync Ready
                </h4>
                <p className="text-xs text-gray-600">
                  Changes saved locally will sync when online
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-sm mb-1">
                  Mesh Sync Available
                </h4>
                <p className="text-xs text-gray-600">
                  Share data with nearby workers via Bluetooth
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Mock connection check
              alert('Checking connection...');
            }}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw size={24} />
            Check Connection
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/sync/mesh')}
            className="w-full bg-white text-secondary py-4 rounded-xl font-semibold text-lg shadow-md flex items-center justify-center gap-2 border-2 border-neutral"
          >
            Try Mesh Sync
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/home')}
            className="w-full text-primary font-semibold"
          >
            Continue Working Offline
          </motion.button>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>Last synced: 2 hours ago</p>
          <p className="mt-1">3 items pending sync</p>
        </div>
      </motion.div>
    </div>
  );
}
