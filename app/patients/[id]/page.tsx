'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Phone, MapPin, Calendar, AlertCircle, Activity, QrCode, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import patientsData from '@/data/patients.json';

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Patient not found</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/patients')}
            className="bg-primary text-white px-6 py-3 rounded-xl"
          >
            Back to Patients
          </motion.button>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className={`${getRiskColor(patient.riskLevel)} text-white px-6 pt-8 pb-20`}>
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/patients/${patientId}/edit`)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <Edit size={20} />
          </motion.button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
          <p className="text-white/90 text-lg mb-1">
            {patient.age} years • {patient.gender} • {patient.bloodGroup}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mt-2">
            <AlertCircle size={16} />
            <span className="text-sm font-semibold">{patient.riskLevel.toUpperCase()} RISK</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-12 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/voice-visit?patientId=' + patientId)}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <Activity size={24} className="text-green-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-secondary">New Visit</p>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/patients/${patientId}/qr`)}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <QrCode size={24} className="text-primary mx-auto mb-2" />
            <p className="text-xs font-semibold text-secondary">Show QR</p>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = `tel:${patient.phone}`}
            className="bg-white rounded-2xl p-4 shadow-lg text-center"
          >
            <Phone size={24} className="text-blue-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-secondary">Call</p>
          </motion.button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-6 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="font-bold text-secondary mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-secondary">{patient.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-secondary">{patient.address}</p>
                <p className="text-sm text-gray-600 mt-1">Village: {patient.village}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Conditions */}
      <div className="px-6 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="font-bold text-secondary mb-4">Health Conditions</h3>
          
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((condition, idx) => (
              <span
                key={idx}
                className="bg-red-50 text-red-700 px-3 py-2 rounded-full text-sm font-medium border border-red-200"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Visit History */}
      <div className="px-6 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-secondary">Recent Visits</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-primary text-sm font-semibold"
            >
              View All
            </motion.button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-neutral/30">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-secondary text-sm">Regular Checkup</p>
                <p className="text-xs text-gray-600 mt-1">{patient.lastVisit}</p>
                <p className="text-xs text-gray-500 mt-1">{patient.notes}</p>
              </div>
            </div>
            
            <div className="text-center py-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/voice-visit?patientId=' + patientId)}
                className="text-primary text-sm font-semibold"
              >
                + Add New Visit
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Preview */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-5 shadow-lg text-center">
          <h3 className="font-bold mb-4">Health Card QR</h3>
          <div className="bg-white p-4 rounded-xl inline-block">
            <QRCode
              value={JSON.stringify({
                id: patient.id,
                name: patient.name,
                age: patient.age,
                bloodGroup: patient.bloodGroup,
              })}
              size={120}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/patients/${patientId}/qr`)}
            className="mt-4 text-sm font-semibold underline"
          >
            View Full QR Card
          </motion.button>
        </div>
      </div>
    </div>
  );
}
