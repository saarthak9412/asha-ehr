'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Radio, Users, Wifi, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MeshSyncPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [peers, setPeers] = useState<any[]>([]);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setPeers([
        {
          id: '1',
          name: 'ASHA Worker - Sunita',
          distance: '12m',
          signal: 'strong',
          lastSeen: 'Now',
        },
        {
          id: '2',
          name: 'ASHA Worker - Kavita',
          distance: '28m',
          signal: 'medium',
          lastSeen: '2m ago',
        },
      ]);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-purple-500 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Mesh Sync</h1>
            <p className="text-purple-100 text-sm">Peer-to-peer data sharing</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Radio size={32} className="mx-auto mb-2" />
          <p className="font-semibold mb-1">Bluetooth & WiFi Direct</p>
          <p className="text-xs text-purple-100">
            Share data with nearby ASHA workers without internet
          </p>
        </div>
      </div>

      {/* Scan Section */}
      <div className="px-6 py-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleScan}
          disabled={scanning}
          className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg ${
            scanning
              ? 'bg-gray-300 text-gray-600'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          {scanning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw size={20} />
              </motion.div>
              Scanning for peers...
            </>
          ) : (
            <>
              <Radio size={20} />
              Scan for Nearby Workers
            </>
          )}
        </motion.button>
      </div>

      {/* Peers List */}
      {peers.length > 0 && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
            <Users size={20} />
            Nearby Workers ({peers.length})
          </h2>
          
          <div className="space-y-3">
            {peers.map((peer, index) => (
              <motion.div
                key={peer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary text-sm">
                        {peer.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {peer.distance} away • {peer.lastSeen}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`flex gap-0.5 ${
                      peer.signal === 'strong' ? 'opacity-100' : 'opacity-40'
                    }`}>
                      <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                      <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                      <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 bg-purple-100 text-purple-700 py-2 rounded-lg font-semibold text-sm"
                >
                  Sync Data
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* How it Works */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-bold text-secondary mb-4">How Mesh Sync Works</h3>
        
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">1️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-sm mb-1">
                  Scan for Peers
                </h4>
                <p className="text-xs text-gray-600">
                  Find other ASHA workers within 30m range
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">2️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-sm mb-1">
                  Connect Securely
                </h4>
                <p className="text-xs text-gray-600">
                  Encrypted peer-to-peer connection
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">3️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-secondary text-sm mb-1">
                  Sync & Share
                </h4>
                <p className="text-xs text-gray-600">
                  Exchange patient data and updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-200">
          <h4 className="font-semibold text-secondary text-sm mb-3">✨ Benefits</h4>
          <ul className="text-xs text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <Wifi size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
              <span>Works without internet or mobile data</span>
            </li>
            <li className="flex items-start gap-2">
              <Users size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
              <span>Share knowledge and patient updates instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <Radio size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
              <span>Automatic synchronization when in range</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
