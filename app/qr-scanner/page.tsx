'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QRScannerPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(true);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <X size={20} className="text-white" />
          </motion.button>
          <h1 className="text-white font-bold">Scan QR Code</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Scanner Frame */}
      <div className="h-screen flex items-center justify-center p-6">
        <div className="relative">
          {/* Camera View Placeholder */}
          <div className="w-72 h-72 bg-gray-800 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera size={64} className="text-gray-600" />
            </div>
          </div>

          {/* Scanning Frame */}
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 border-4 border-primary rounded-3xl"
          >
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-3xl"></div>
          </motion.div>

          {/* Scanning Line */}
          {scanning && (
            <motion.div
              animate={{
                y: [0, 280, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-lg shadow-primary/50"
            />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
          <p className="text-white font-semibold mb-2">
            Align QR code within frame
          </p>
          <p className="text-white/80 text-sm">
            Hold steady for automatic scanning
          </p>
        </div>

        {/* Mock Success */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Mock successful scan - redirect to patient detail
            router.push('/patients/1');
          }}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2"
        >
          ✓ Scan Successful - View Patient
        </motion.button>
      </div>
    </div>
  );
}
