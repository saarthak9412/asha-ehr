'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import remindersData from '@/data/reminders.json';

export default function RemindersPage() {
  const router = useRouter();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredReminders = remindersData.filter(reminder => {
    if (filter === 'all') return true;
    return reminder.status === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checkup': return '🏥';
      case 'antenatal': return '🤰';
      case 'medication': return '💊';
      case 'counseling': return '💬';
      case 'home-visit': return '🏠';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <OfflineBanner isOffline={false} />
      
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Reminders</h1>
            <p className="text-sm text-gray-600">
              {filteredReminders.filter(r => r.status === 'pending').length} pending tasks
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/reminders/new')}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
          >
            <Plus size={24} className="text-white" />
          </motion.button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('list')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              view === 'list'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            List View
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('calendar')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              view === 'calendar'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Calendar View
          </motion.button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'pending', 'completed'].map((status) => (
            <motion.button
              key={status}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 border border-neutral'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reminders List */}
      {view === 'list' && (
        <div className="px-6 py-4 space-y-3">
          {filteredReminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/reminders/${reminder.id}`)}
              className={`bg-white rounded-2xl p-4 shadow-md ${
                reminder.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  {getTypeIcon(reminder.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-secondary text-base">
                        {reminder.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {reminder.patientName}
                      </p>
                    </div>
                    {reminder.status === 'completed' ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(reminder.priority)}`}>
                        {reminder.priority}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {reminder.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={14} />
                      <span>{reminder.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredReminders.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reminders found</p>
            </div>
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="px-6 py-4">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <CalendarIcon size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-secondary mb-2">Calendar View</h3>
            <p className="text-sm text-gray-600">
              Interactive calendar coming soon
            </p>
          </div>

          {/* Upcoming tasks preview */}
          <div className="mt-6">
            <h3 className="font-bold text-secondary mb-3">Upcoming This Week</h3>
            <div className="space-y-2">
              {filteredReminders.slice(0, 3).map((reminder) => (
                <div
                  key={reminder.id}
                  className="bg-white rounded-xl p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-secondary">
                        {reminder.title}
                      </p>
                      <p className="text-xs text-gray-500">{reminder.date}</p>
                    </div>
                    <span className="text-xs">
                      {getTypeIcon(reminder.type)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
