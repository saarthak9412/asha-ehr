'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Upload, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SyncHistoryPage() {
  const router = useRouter();

  const syncHistory = [
    {
      id: '1',
      type: 'auto',
      status: 'success',
      items: 8,
      size: '12.3 MB',
      timestamp: '2024-01-18 10:30 AM',
      duration: '2m 15s',
    },
    {
      id: '2',
      type: 'manual',
      status: 'success',
      items: 5,
      size: '7.8 MB',
      timestamp: '2024-01-17 3:45 PM',
      duration: '1m 42s',
    },
    {
      id: '3',
      type: 'auto',
      status: 'success',
      items: 12,
      size: '18.5 MB',
      timestamp: '2024-01-17 9:20 AM',
      duration: '3m 08s',
    },
    {
      id: '4',
      type: 'manual',
      status: 'partial',
      items: 4,
      size: '5.2 MB',
      timestamp: '2024-01-16 6:15 PM',
      duration: '1m 55s',
      note: '2 items failed - retried successfully',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-500 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Sync History</h1>
            <p className="text-green-100 text-sm">Audit logs & records</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs text-green-100">Total Syncs</p>
            </div>
            <div>
              <p className="text-2xl font-bold">234</p>
              <p className="text-xs text-green-100">Items Synced</p>
            </div>
            <div>
              <p className="text-2xl font-bold">99%</p>
              <p className="text-xs text-green-100">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Recent Syncs</h2>
        
        <div className="space-y-3">
          {syncHistory.map((sync, index) => (
            <motion.div
              key={sync.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  sync.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {sync.status === 'success' ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <Upload size={24} className="text-yellow-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          sync.status === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {sync.status === 'success' ? 'Success' : 'Partial'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          sync.type === 'auto'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {sync.type === 'auto' ? 'Auto' : 'Manual'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {sync.items} items • {sync.size}
                      </p>
                    </div>
                    <Wifi size={16} className="text-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{sync.timestamp}</span>
                    <span>{sync.duration}</span>
                  </div>
                  
                  {sync.note && (
                    <p className="text-xs text-gray-600 mt-2 bg-yellow-50 px-2 py-1 rounded">
                      ℹ️ {sync.note}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="px-6 mb-6">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <h4 className="font-semibold text-secondary text-sm mb-2">📊 Sync Statistics</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Last sync:</span>
              <span className="font-semibold">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span>Next auto-sync:</span>
              <span className="font-semibold">In 22 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Total data synced:</span>
              <span className="font-semibold">342.8 MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
