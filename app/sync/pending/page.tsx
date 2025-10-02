'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Upload, WifiOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PendingSyncPage() {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);

  const pendingItems = [
    {
      id: '1',
      type: 'patient',
      title: 'New Patient: Geeta Devi',
      description: 'Patient registration form with photo',
      size: '2.4 MB',
      timestamp: '2 hours ago',
      status: 'pending',
    },
    {
      id: '2',
      type: 'visit',
      title: 'Voice Visit: Rajesh Kumar',
      description: 'Voice recording and transcript',
      size: '5.1 MB',
      timestamp: '3 hours ago',
      status: 'pending',
    },
    {
      id: '3',
      type: 'update',
      title: 'Patient Update: Priya Sharma',
      description: 'Antenatal checkup notes',
      size: '0.8 MB',
      timestamp: '5 hours ago',
      status: 'pending',
    },
    {
      id: '4',
      type: 'message',
      title: 'Message to Supervisor',
      description: 'Weekly report submission',
      size: '0.3 MB',
      timestamp: '1 day ago',
      status: 'pending',
    },
  ];

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      // Mock success
    }, 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'patient': return '👤';
      case 'visit': return '🎤';
      case 'update': return '📝';
      case 'message': return '💬';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-yellow-500 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Pending Sync</h1>
            <p className="text-yellow-100 text-sm">{pendingItems.length} items waiting</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <WifiOff size={20} />
              <span className="font-semibold">Offline Mode</span>
            </div>
            <span className="text-sm text-yellow-100">8.9 MB total</span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSyncAll}
            disabled={syncing}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
              syncing
                ? 'bg-white/20 cursor-not-allowed'
                : 'bg-white text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            {syncing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload size={20} />
                </motion.div>
                Syncing...
              </>
            ) : (
              <>
                <Upload size={20} />
                Sync All Now
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Pending Items */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-secondary">Pending Items</h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/sync/history')}
            className="text-primary text-sm font-semibold"
          >
            View History
          </motion.button>
        </div>
        
        <div className="space-y-3">
          {pendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  {getTypeIcon(item.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-secondary text-sm">
                      {item.title}
                    </h3>
                    <Clock size={14} className="text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.size}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 mb-6">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-secondary text-sm mb-1">Auto-sync Enabled</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your data will automatically sync when you connect to WiFi or mobile data. 
                You can also manually sync anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/sync/mesh')}
            className="bg-white rounded-2xl p-4 shadow-md text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">📡</span>
            </div>
            <p className="font-semibold text-secondary text-sm">Mesh Sync</p>
            <p className="text-xs text-gray-600 mt-1">Peer-to-peer</p>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/sync/history')}
            className="bg-white rounded-2xl p-4 shadow-md text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <p className="font-semibold text-secondary text-sm">Sync History</p>
            <p className="text-xs text-gray-600 mt-1">View logs</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
