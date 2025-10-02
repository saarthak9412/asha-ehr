'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertCircle, User, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import patientsData from '@/data/patients.json';

export default function AlertsPage() {
  const router = useRouter();
  
  const highRiskPatients = patientsData.filter(p => p.riskLevel === 'high');
  const mediumRiskPatients = patientsData.filter(p => p.riskLevel === 'medium');

  const alerts = [
    {
      id: '1',
      type: 'critical',
      title: 'High Blood Sugar Alert',
      patient: 'Rajesh Kumar',
      patientId: '2',
      message: 'Blood sugar levels consistently above 200 mg/dL. Immediate follow-up required.',
      time: '2 hours ago',
      priority: 'high',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Missed Vaccination',
      patient: 'Meera Reddy',
      patientId: '5',
      message: 'Patient missed scheduled prenatal vaccination. Reschedule immediately.',
      time: '5 hours ago',
      priority: 'high',
    },
    {
      id: '3',
      type: 'info',
      title: 'TB Treatment Progress',
      patient: 'Arun Patel',
      patientId: '4',
      message: 'Patient showing good response to DOTS therapy. Continue monitoring.',
      time: '1 day ago',
      priority: 'medium',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-500 text-red-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-500 text-green-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-red-500 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Alerts & Risks</h1>
            <p className="text-red-100 text-sm">{alerts.length} active alerts</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold">{highRiskPatients.length}</p>
              <p className="text-xs text-red-100">High Risk</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{mediumRiskPatients.length}</p>
              <p className="text-xs text-red-100">Medium Risk</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{alerts.length}</p>
              <p className="text-xs text-red-100">Active Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Active Alerts</h2>
        
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/patients/${alert.patientId}`)}
              className={`bg-white rounded-2xl p-4 shadow-md border-l-4 ${getPriorityColor(alert.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{getTypeIcon(alert.type)}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-secondary text-base">
                      {alert.title}
                    </h3>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2 font-semibold">
                    {alert.patient}
                  </p>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {alert.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* High Risk Patients */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-secondary mb-4">High Risk Patients</h2>
        
        <div className="space-y-3">
          {highRiskPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/patients/${patient.id}`)}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-red-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-secondary text-base">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} yrs • {patient.village}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full border border-red-200">
                      HIGH
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {patient.conditions.slice(0, 2).map((condition, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
