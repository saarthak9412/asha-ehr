'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Download, Share2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import patientsData from '@/data/patients.json';

export default function PatientQRPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    return null;
  }

  const qrData = JSON.stringify({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    bloodGroup: patient.bloodGroup,
    phone: patient.phone,
    village: patient.village,
    conditions: patient.conditions,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 text-center relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="absolute top-4 left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <X size={20} />
            </motion.button>
            
            <div className="mb-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🏥</span>
              </div>
              <h1 className="text-2xl font-bold">Health Card</h1>
              <p className="text-primary-100 text-sm">ASHA EHR System</p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="p-6 border-b border-neutral">
            <h2 className="text-2xl font-bold text-secondary text-center mb-2">
              {patient.name}
            </h2>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-600">Age</p>
                <p className="font-semibold text-secondary">{patient.age} yrs</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Gender</p>
                <p className="font-semibold text-secondary">{patient.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Blood Group</p>
                <p className="font-semibold text-secondary">{patient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Village</p>
                <p className="font-semibold text-secondary">{patient.village}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-8 text-center">
            <div className="bg-white p-6 rounded-2xl inline-block shadow-inner border-4 border-neutral/30">
              <QRCode
                value={qrData}
                size={220}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Scan this QR code to access patient health records
            </p>
          </div>

          {/* Health Conditions */}
          <div className="px-6 pb-6">
            <h3 className="font-bold text-secondary mb-3 text-sm">Health Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {patient.conditions.slice(0, 3).map((condition, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-gray-50 flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-secondary py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 border-neutral"
            >
              <Share2 size={18} />
              Share
            </motion.button>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <p className="text-xs text-gray-600">
              Patient ID: {patient.id} • Last Updated: {patient.lastVisit}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Issued by: Ministry of Health & Family Welfare, Govt. of India
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
