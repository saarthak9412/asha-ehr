'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  Languages, 
  Mic, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Download,
  Activity,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';

export default function ProfilePage() {
  const router = useRouter();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const stats = [
    { label: 'Patients Served', value: '147', icon: User, color: 'bg-blue-500' },
    { label: 'Visits This Month', value: '47', icon: Activity, color: 'bg-green-500' },
    { label: 'Achievement Score', value: '92%', icon: Award, color: 'bg-primary' },
  ];

  const menuItems = [
    { 
      icon: Languages, 
      label: 'Language Preferences', 
      value: 'Hindi',
      path: '/profile/language',
    },
    { 
      icon: Download, 
      label: 'Sync Settings', 
      path: '/sync/pending',
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      path: '/profile/privacy',
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      path: '/troubleshooting',
    },
    { 
      icon: Settings, 
      label: 'App Settings', 
      path: '/profile/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Profile Info */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-6 pt-12 pb-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
          >
            <User size={48} className="text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-1">ASHA Worker</h1>
          <p className="text-primary-100 text-sm">Worker ID: ASH-2024-0147</p>
          <p className="text-primary-100 text-sm">Jayanagar, Bangalore</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-md text-center"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1 leading-tight">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-secondary mb-3">Quick Settings</h2>
        
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mic size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-secondary text-sm">Voice Input</h3>
                  <p className="text-xs text-gray-600">Enable voice recording</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  voiceEnabled ? 'bg-primary' : 'bg-neutral'
                }`}
              >
                <motion.div
                  animate={{ x: voiceEnabled ? 24 : 0 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bell size={20} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-secondary text-sm">Notifications</h3>
                  <p className="text-xs text-gray-600">Push notifications</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-14 h-8 rounded-full transition-colors relative ${
                  notificationsEnabled ? 'bg-primary' : 'bg-neutral'
                }`}
              >
                <motion.div
                  animate={{ x: notificationsEnabled ? 24 : 0 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-secondary mb-3">Account & Settings</h2>
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-neutral/30' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-gray-700" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-secondary text-sm">{item.label}</p>
                    {item.value && (
                      <p className="text-xs text-gray-600">{item.value}</p>
                    )}
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Training Progress */}
      <div className="px-6 mb-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/training')}
          className="w-full bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Training Progress</h3>
            <ChevronRight size={24} />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{ width: '75%' }}></div>
            </div>
            <span className="font-semibold">75%</span>
          </div>
          <p className="text-xs text-green-100 mt-2">3 of 4 modules completed</p>
        </motion.button>
      </div>

      {/* Logout Button */}
      <div className="px-6 mb-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/security')}
          className="w-full bg-white text-red-600 rounded-2xl p-4 shadow-md font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Log Out
        </motion.button>
      </div>

      <div className="text-center text-xs text-gray-400 mb-4">
        <p>ASHA EHR Companion v1.0.0</p>
        <p className="mt-1">© 2024 Ministry of Health & Family Welfare</p>
      </div>

      <BottomNav />
    </div>
  );
}
