"use client";

import { motion } from "framer-motion";
import { Users, Plus, Search, Heart } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmptyStateScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm w-full text-center"
      >
        {/* Illustration */}
        <div className="mb-8">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: [20, -10, 20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-48 h-48 mb-6"
          >
            {/* Background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"></div>

            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-full"
            ></motion.div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Floating icons */}
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center"
            >
              <Heart className="w-4 h-4 text-secondary" />
            </motion.div>

            <motion.div
              animate={{
                x: [0, -8, 0],
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-6 left-6 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center"
            >
              <Plus className="w-3 h-3 text-primary" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Journey
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            No patients yet? That's okay! Begin by adding your first patient
            record to start providing better healthcare in your community.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/patients/new">
              <Button size="lg" className="w-full h-14 text-lg">
                <Plus className="w-5 h-5 mr-3" />
                Add First Patient
              </Button>
            </Link>

            <Link href="/training">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg"
              >
                <Search className="w-5 h-5 mr-3" />
                Learn How to Use
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                Quick Tips to Get Started
              </h3>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use voice commands to quickly add patient information
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  All data is stored locally and synced when you have internet
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Generate QR codes for easy patient information sharing
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Set reminders for follow-ups and medication schedules
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            ASHA Ki Kiran - Empowering community healthcare
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
