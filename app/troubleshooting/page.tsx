'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, HelpCircle, Book, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TroubleshootingPage() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I sync my data?',
      answer: 'Go to Profile > Sync Settings, or tap the sync icon on the home screen. Your data will automatically sync when you have internet connection.',
    },
    {
      id: '2',
      question: 'Voice recording is not working',
      answer: 'Make sure you have granted microphone permissions to the app. Go to your phone Settings > Apps > ASHA EHR > Permissions and enable Microphone.',
    },
    {
      id: '3',
      question: 'How to use offline mode?',
      answer: 'The app works offline by default. All your data is saved locally and will sync automatically when you connect to internet or WiFi.',
    },
    {
      id: '4',
      question: 'Cannot scan QR code',
      answer: 'Ensure you have granted camera permissions. Hold your phone steady and make sure the QR code is well-lit and within the scanning frame.',
    },
    {
      id: '5',
      question: 'How to reset my PIN?',
      answer: 'Contact your supervisor or PHC administrator to reset your security PIN. For security reasons, this cannot be done from the app.',
    },
  ];

  const quickActions = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Complete app documentation',
      color: 'bg-blue-500',
    },
    {
      icon: MessageSquare,
      title: 'Contact Support',
      description: 'Message your supervisor',
      color: 'bg-green-500',
      action: () => router.push('/messages'),
    },
    {
      icon: Phone,
      title: 'Helpline',
      description: 'Call 1800-XXX-XXXX',
      color: 'bg-purple-500',
      action: () => window.location.href = 'tel:1800000000',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-blue-100 text-sm">Find answers and get help</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 gap-3 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-secondary text-base">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-secondary mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full px-5 py-4 flex items-start justify-between text-left"
              >
                <div className="flex items-start gap-3 flex-1">
                  <HelpCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-secondary text-sm">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                  className="flex-shrink-0"
                >
                  <ChevronRight size={20} className="text-gray-400 transform rotate-90" />
                </motion.div>
              </motion.button>
              
              {expandedFaq === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-4"
                >
                  <p className="text-sm text-gray-600 leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Common Issues */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-secondary mb-4">Common Issues</h2>
        
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h4 className="font-semibold text-secondary text-sm mb-2">
              🔋 App is slow or freezing
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Clear app cache or restart your device. Check available storage space.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h4 className="font-semibold text-secondary text-sm mb-2">
              📶 Sync not working
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Ensure stable internet connection. Check pending sync queue for errors.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h4 className="font-semibold text-secondary text-sm mb-2">
              🎤 Voice recording unclear
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Speak clearly in a quiet environment. Check microphone isn't blocked.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-5 border border-primary/20">
          <h3 className="font-bold text-secondary mb-3">Still Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Contact your local PHC supervisor or call the national helpline
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span className="font-semibold">Helpline: 1800-XXX-XXXX</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" />
              <span className="font-semibold">support@asha-ehr.gov.in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
