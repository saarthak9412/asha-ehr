'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Filter, User, AlertCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import patientsData from '@/data/patients.json';

export default function PatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'all' || patient.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <OfflineBanner isOffline={false} />
      
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary">My Patients</h1>
            <p className="text-sm text-gray-600">{filteredPatients.length} registered</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/patients/new')}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
          >
            <Plus size={24} className="text-white" />
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or village..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'high', 'medium', 'low'].map((risk) => (
            <motion.button
              key={risk}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilterRisk(risk)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterRisk === risk
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-neutral'
              }`}
            >
              {risk === 'all' ? 'All Patients' : `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Patients List */}
      <div className="px-6 py-4 space-y-3">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/patients/${patient.id}`)}
            className="bg-white rounded-2xl p-4 shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={24} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-secondary text-base">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {patient.age} yrs • {patient.gender} • {patient.bloodGroup}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRiskColor(patient.riskLevel)}`}>
                    {patient.riskLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <MapPin size={12} />
                  <span className="truncate">{patient.village}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {patient.conditions.slice(0, 2).map((condition, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                  {patient.conditions.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{patient.conditions.length - 2} more
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Last visit: {patient.lastVisit}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No patients found</p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchQuery('');
                setFilterRisk('all');
              }}
              className="text-primary font-semibold mt-2"
            >
              Clear filters
            </motion.button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
