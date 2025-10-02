'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  AlertCircle, 
  Calendar, 
  Activity, 
  TrendingUp,
  Users,
  Bell,
  Wifi,
  WifiOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import patientsData from '@/data/patients.json';
import remindersData from '@/data/reminders.json';

export default function HomePage() {
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);

  const pendingReminders = remindersData.filter(r => r.status === 'pending');
  const highRiskPatients = patientsData.filter(p => p.riskLevel === 'high');
  const todayVisits = 3; // Mock data

  const quickActions = [
    { 
      icon: Plus, 
      label: 'New Patient', 
      path: '/patients/new',
      color: 'bg-primary',
    },
    { 
      icon: Activity, 
      label: 'Voice Visit', 
      path: '/voice-visit',
      color: 'bg-green-500',
    },
    { 
      icon: Calendar, 
      label: 'Reminders', 
      path: '/reminders',
      color: 'bg-blue-500',
    },
    { 
      icon: AlertCircle, 
      label: 'Alerts', 
      path: '/alerts',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <OfflineBanner isOffline={isOffline} />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-6 pt-8 pb-20 rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Namaste 🙏</h1>
            <p className="text-primary-100 text-sm">Welcome back, ASHA Worker</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOffline(!isOffline)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            {isOffline ? <WifiOff size={20} /> : <Wifi size={20} />}
          </motion.button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-3xl font-bold">{todayVisits}</p>
              <p className="text-xs text-primary-100 mt-1">Today's Visits</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center flex-1">
              <p className="text-3xl font-bold">{pendingReminders.length}</p>
              <p className="text-xs text-primary-100 mt-1">Pending Tasks</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center flex-1">
              <p className="text-3xl font-bold">{highRiskPatients.length}</p>
              <p className="text-xs text-primary-100 mt-1">High Risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-12 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(action.path)}
                className={`${action.color} text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <Icon size={28} className="mb-3" />
                <p className="font-semibold text-base">{action.label}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* High Risk Alerts */}
      {highRiskPatients.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-secondary">High Risk Patients</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/alerts')}
              className="text-primary text-sm font-semibold"
            >
              View All
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {highRiskPatients.slice(0, 2).map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/patients/${patient.id}`)}
                className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-red-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary text-base mb-1">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{patient.age} yrs • {patient.village}</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.slice(0, 2).map((condition, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                    <AlertCircle size={14} className="text-red-600" />
                    <span className="text-xs font-semibold text-red-600">High</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Reminders */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-secondary">Today's Reminders</h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/reminders')}
            className="text-primary text-sm font-semibold"
          >
            View All
          </motion.button>
        </div>
        
        <div className="space-y-3">
          {pendingReminders.slice(0, 3).map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary text-sm mb-1">
                    {reminder.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {reminder.patientName}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{reminder.date} at {reminder.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Card */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-secondary to-secondary/80 text-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} />
            <h3 className="font-bold text-lg">This Month's Progress</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs text-white/80">Patients Visited</p>
            </div>
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-xs text-white/80">New Registrations</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
