'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorStatePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-6">
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
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-200">
            <AlertCircle size={64} className="text-red-600" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-secondary mb-3">
          Oops! Something Went Wrong
        </h2>
        <p className="text-gray-600 mb-2 leading-relaxed">
          We encountered an unexpected error. Don't worry, your data is safe.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Error Code: ERR_SYNC_FAILED_001
        </p>

        {/* What Happened */}
        <div className="bg-white rounded-2xl p-5 shadow-md text-left mb-6">
          <h3 className="font-bold text-secondary mb-3 text-sm">What Happened?</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            The app encountered an error while trying to sync your data. This is usually temporary and can be fixed by retrying or restarting the app.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.location.reload();
            }}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw size={24} />
            Try Again
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/home')}
            className="w-full bg-white text-secondary py-4 rounded-xl font-semibold text-lg shadow-md flex items-center justify-center gap-2 border-2 border-neutral"
          >
            <Home size={24} />
            Go to Home
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/troubleshooting')}
            className="w-full bg-white text-secondary py-4 rounded-xl font-semibold text-lg shadow-md flex items-center justify-center gap-2 border-2 border-neutral"
          >
            <HelpCircle size={24} />
            Get Help
          </motion.button>
        </div>

        {/* Troubleshooting Tips */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-left">
          <h4 className="font-semibold text-secondary text-sm mb-2">💡 Quick Fixes</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Restart the app</li>
            <li>• Clear app cache in settings</li>
            <li>• Contact your supervisor if error persists</li>
          </ul>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>ASHA EHR Companion v1.0.0</p>
          <p className="mt-1">Session ID: sess_abc123xyz</p>
        </div>
      </motion.div>
    </div>
  );
}
