'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityLockScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      // Auto-submit when 4 digits entered
      if (newPin.length === 4) {
        setTimeout(() => {
          router.push('/onboarding/welcome');
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const renderPinDots = () => {
    return (
      <div className="flex gap-4 justify-center mb-8">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            animate={{ scale: pin.length > i ? 1.1 : 1 }}
            className={`w-4 h-4 rounded-full border-2 ${
              pin.length > i 
                ? 'bg-primary border-primary' 
                : 'bg-white border-neutral'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-white to-secondary/10 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-secondary mb-2">ASHA EHR</h1>
        <p className="text-gray-600 text-lg">Enter your security PIN</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm"
      >
        {renderPinDots()}

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePinInput(num.toString())}
              className="h-16 bg-white rounded-xl shadow-md text-2xl font-semibold text-secondary hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPin(!showPin)}
            className="h-16 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            {showPin ? <EyeOff size={24} className="text-gray-600" /> : <Eye size={24} className="text-gray-600" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePinInput('0')}
            className="h-16 bg-white rounded-xl shadow-md text-2xl font-semibold text-secondary hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="h-16 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <span className="text-2xl text-gray-600">⌫</span>
          </motion.button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Forgot PIN? Contact your supervisor
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-8 text-center text-xs text-gray-400"
      >
        <p>Secured by Ministry of Health & Family Welfare</p>
        <p className="mt-1">Government of India</p>
      </motion.div>
    </div>
  );
}
