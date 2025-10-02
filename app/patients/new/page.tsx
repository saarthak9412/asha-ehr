'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mic, User, Calendar, MapPin, Phone, Save, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewPatientPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Female',
    bloodGroup: '',
    phone: '',
    address: '',
    village: '',
    conditions: '',
    notes: '',
  });

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Mock voice recording
    setTimeout(() => {
      if (!isRecording) {
        setFormData({
          ...formData,
          name: 'Geeta Devi',
          age: '32',
          village: 'Indiranagar',
          notes: 'First prenatal visit. Patient is in good health.',
        });
      }
      setIsRecording(false);
    }, 2000);
  };

  const handleSave = () => {
    // Mock save
    router.push('/patients');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">New Patient</h1>
            <p className="text-primary-100 text-sm">Add patient record</p>
          </div>
        </div>

        {/* Voice Input Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleVoiceRecord}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all ${
            isRecording
              ? 'bg-red-500 animate-pulse'
              : 'bg-white/20 backdrop-blur-sm border-2 border-white/30'
          }`}
        >
          <Mic size={24} />
          {isRecording ? 'Recording... Tap to stop' : 'Tap to record patient details'}
        </motion.button>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-8 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-12 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-10 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-14 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-10 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-12 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-8 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <p className="text-xs text-white/80 mt-2">Speak clearly in Hindi or English</p>
          </motion.div>
        )}
      </div>

      {/* Form */}
      <div className="px-6 py-6 space-y-4">
        {/* Photo */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <label className="block text-secondary font-semibold mb-3 text-sm">Patient Photo</label>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full border-2 border-dashed border-neutral rounded-xl py-8 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors"
          >
            <Camera size={32} className="text-gray-400" />
            <span className="text-sm text-gray-600">Tap to capture photo</span>
          </motion.button>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
          <h3 className="font-bold text-secondary flex items-center gap-2">
            <User size={18} />
            Basic Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter patient name"
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Age"
                className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select blood group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
          <h3 className="font-bold text-secondary flex items-center gap-2">
            <Phone size={18} />
            Contact Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Village/Area *</label>
            <input
              type="text"
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              placeholder="Enter village or area name"
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Complete address"
              rows={3}
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Medical Info */}
        <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
          <h3 className="font-bold text-secondary">Medical Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Conditions</label>
            <textarea
              value={formData.conditions}
              onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
              placeholder="List any known health conditions"
              rows={3}
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or observations"
              rows={3}
              className="w-full px-4 py-3 border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!formData.name || !formData.age || !formData.village}
          className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 ${
            formData.name && formData.age && formData.village
              ? 'bg-primary text-white'
              : 'bg-neutral text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save size={20} />
          Save Patient Record
        </motion.button>
      </div>
    </div>
  );
}
