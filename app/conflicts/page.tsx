'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConflictResolutionPage() {
  const router = useRouter();

  const conflict = {
    patientName: 'Priya Sharma',
    patientId: '1',
    field: 'Blood Pressure Reading',
    timestamp: '2024-01-18 10:30 AM',
    localVersion: {
      value: '130/85 mmHg',
      recordedBy: 'You',
      device: 'Your Device',
      timestamp: '2024-01-18 10:30 AM',
    },
    serverVersion: {
      value: '125/80 mmHg',
      recordedBy: 'ASHA Worker - Sunita',
      device: 'Device #2',
      timestamp: '2024-01-18 10:25 AM',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-orange-500 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Resolve Conflict</h1>
            <p className="text-orange-100 text-sm">Data mismatch detected</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle size={24} />
          <div>
            <p className="font-semibold">Sync Conflict</p>
            <p className="text-xs text-orange-100">
              Two different values for the same record
            </p>
          </div>
        </div>
      </div>

      {/* Conflict Details */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <h3 className="font-bold text-secondary mb-3">Conflict Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Patient:</span>
              <span className="font-semibold text-secondary">{conflict.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Field:</span>
              <span className="font-semibold text-secondary">{conflict.field}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Detected:</span>
              <span className="font-semibold text-secondary">{conflict.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Version Comparison */}
        <h2 className="text-lg font-bold text-secondary mb-4">Choose Correct Version</h2>

        {/* Your Version */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-200 shadow-md mb-4"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-secondary">Your Version (Local)</h3>
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
              Version A
            </span>
          </div>
          
          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-600 mb-2">Blood Pressure Reading:</p>
            <p className="text-2xl font-bold text-secondary">{conflict.localVersion.value}</p>
          </div>

          <div className="space-y-1 text-xs text-gray-600 mb-4">
            <p>📝 Recorded by: <span className="font-semibold">{conflict.localVersion.recordedBy}</span></p>
            <p>📱 Device: <span className="font-semibold">{conflict.localVersion.device}</span></p>
            <p>⏰ Time: <span className="font-semibold">{conflict.localVersion.timestamp}</span></p>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Accept Version A
          </motion.button>
        </motion.div>

        {/* Server Version */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-200 shadow-md mb-4"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-secondary">Server Version</h3>
            <span className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
              Version B
            </span>
          </div>
          
          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-600 mb-2">Blood Pressure Reading:</p>
            <p className="text-2xl font-bold text-secondary">{conflict.serverVersion.value}</p>
          </div>

          <div className="space-y-1 text-xs text-gray-600 mb-4">
            <p>📝 Recorded by: <span className="font-semibold">{conflict.serverVersion.recordedBy}</span></p>
            <p>📱 Device: <span className="font-semibold">{conflict.serverVersion.device}</span></p>
            <p>⏰ Time: <span className="font-semibold">{conflict.serverVersion.timestamp}</span></p>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Accept Version B
          </motion.button>
        </motion.div>

        {/* Keep Both Option */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gray-200 text-secondary py-3 rounded-xl font-semibold mb-4"
        >
          Keep Both Records (Add Note)
        </motion.button>

        {/* Info */}
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
          <h4 className="font-semibold text-secondary text-sm mb-2">💡 Resolution Tips</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Check the timestamp - newer readings are often more accurate</li>
            <li>• Consider who recorded it - doctor's readings may be preferred</li>
            <li>• If uncertain, keep both records with a note</li>
            <li>• Contact your supervisor if needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
