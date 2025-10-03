"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Heart, Stethoscope } from "lucide-react";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push("/security");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/25 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-white/15 rounded-full blur-lg"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="flex flex-col items-center space-y-6 z-10"
      >
        {/* App Icon */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 1,
          }}
          className="relative"
        >
          <div className="w-24 h-24 bg-white rounded-3xl shadow-soft flex items-center justify-center">
            <div className="relative">
              <Heart className="w-12 h-12 text-primary fill-current" />
              <Stethoscope className="w-8 h-8 text-secondary absolute -bottom-1 -right-1" />
            </div>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">ASHA Ki Kiran</h1>
          <p className="text-white/90 text-lg">स्वास्थ्य सेवा हमारे साथ</p>
          <p className="text-white/80 text-base mt-1">
            Community Health Records
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
          }}
          className="text-white/80 text-center text-base px-8 max-w-xs"
        >
          Empowering ASHA workers with digital health records
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 flex flex-col items-center space-y-4"
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </div>
        <p className="text-white/70 text-sm">Loading...</p>
      </motion.div>

      {/* Bottom branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 text-center"
      >
        <p className="text-white/60 text-xs">
          Ministry of Health & Family Welfare
        </p>
        <p className="text-white/60 text-xs">Government of India</p>
      </motion.div>
    </div>
  );
}
