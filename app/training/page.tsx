'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Book, Video, CheckCircle, Lock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';

export default function TrainingPage() {
  const router = useRouter();

  const modules = [
    {
      id: '1',
      title: 'Maternal & Child Health',
      description: 'Essential care for mothers and newborns',
      lessons: 8,
      duration: '2h 30m',
      completed: true,
      progress: 100,
    },
    {
      id: '2',
      title: 'Voice Recording Best Practices',
      description: 'How to effectively use voice input for patient visits',
      lessons: 5,
      duration: '1h 15m',
      completed: true,
      progress: 100,
    },
    {
      id: '3',
      title: 'Managing Chronic Diseases',
      description: 'Diabetes, hypertension, and COPD management',
      lessons: 10,
      duration: '3h 45m',
      completed: true,
      progress: 100,
    },
    {
      id: '4',
      title: 'Emergency Response',
      description: 'Handling medical emergencies in the field',
      lessons: 6,
      duration: '1h 50m',
      completed: false,
      progress: 30,
    },
  ];

  const quickTips = [
    {
      id: '1',
      title: 'Taking Blood Pressure',
      duration: '3 min',
      icon: '🩺',
    },
    {
      id: '2',
      title: 'Recognizing Danger Signs',
      duration: '5 min',
      icon: '⚠️',
    },
    {
      id: '3',
      title: 'Proper Hand Washing',
      duration: '2 min',
      icon: '🧼',
    },
    {
      id: '4',
      title: 'Using the App Offline',
      duration: '4 min',
      icon: '📱',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Training & Tips</h1>
            <p className="text-green-100 text-sm">Continue learning</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Overall Progress</span>
            <span className="text-sm font-semibold">75%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-green-100 mt-2">3 of 4 modules completed</p>
        </div>
      </div>

      {/* Training Modules */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Training Modules</h2>
        
        <div className="space-y-3">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  module.completed ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {module.completed ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <Book size={24} className="text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-secondary text-base mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>📚 {module.lessons} lessons</span>
                    <span>⏱️ {module.duration}</span>
                  </div>
                  
                  {!module.completed && (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2" 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{module.progress}% complete</p>
                    </>
                  )}
                  
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className={`mt-3 px-4 py-2 rounded-lg font-semibold text-sm ${
                      module.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {module.completed ? '✓ Completed' : 'Continue Learning'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Quick Tips</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {quickTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-4 shadow-md text-center"
            >
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h3 className="font-semibold text-secondary text-sm mb-1">
                {tip.title}
              </h3>
              <p className="text-xs text-gray-600 mb-3">{tip.duration}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary/10 text-primary py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1"
              >
                <Play size={14} />
                Watch
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
          <div className="text-center">
            <span className="text-5xl mb-3 block">🏆</span>
            <h3 className="font-bold text-secondary mb-2">Earn Certificates</h3>
            <p className="text-sm text-gray-600 mb-4">
              Complete all modules to earn official recognition
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs bg-white px-3 py-1 rounded-full">3 Earned</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-600">1 In Progress</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
