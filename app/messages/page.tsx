'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Mic, Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import messagesData from '@/data/messages.json';

export default function MessagesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const filteredMessages = messagesData.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.senderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Supervisor': return 'bg-purple-100 text-purple-700';
      case 'Doctor': return 'bg-blue-100 text-blue-700';
      case 'Health Center': return 'bg-green-100 text-green-700';
      case 'Training': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedMessage) {
    const message = messagesData.find(m => m.id === selectedMessage);
    if (!message) return null;

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Message Detail Header */}
        <div className="bg-white px-6 pt-8 pb-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMessage(null)}
              className="text-primary font-semibold"
            >
              ← Back
            </motion.button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-secondary">{message.senderId}</h2>
              <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(message.senderRole)}`}>
                {message.senderRole}
              </span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="font-bold text-secondary text-lg mb-2">
              {message.subject}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {formatTimestamp(message.timestamp)}
            </p>
            
            {message.hasVoiceMessage && (
              <div className="bg-primary/10 rounded-xl p-4 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Mic size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary">Voice Message</p>
                  <p className="text-xs text-gray-600">Duration: {message.voiceDuration}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Play
                </motion.button>
              </div>
            )}
            
            <p className="text-gray-700 leading-relaxed">
              {message.message}
            </p>
          </div>

          {/* Reply Section */}
          <div className="mt-4">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <textarea
                placeholder="Type your reply..."
                rows={3}
                className="w-full border border-neutral rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <div className="flex items-center justify-between mt-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-primary font-semibold text-sm"
                >
                  <Mic size={18} />
                  Voice Reply
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-sm flex items-center gap-2"
                >
                  <Send size={16} />
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <OfflineBanner isOffline={false} />
      
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary">Messages</h1>
            <p className="text-sm text-gray-600">
              {messagesData.filter(m => !m.read).length} unread
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="px-6 py-4 space-y-3">
        {filteredMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMessage(message.id)}
            className={`bg-white rounded-2xl p-4 shadow-md ${
              !message.read ? 'border-l-4 border-primary' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare size={24} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className={`text-secondary text-base ${!message.read ? 'font-bold' : 'font-semibold'}`}>
                      {message.senderId}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(message.senderRole)}`}>
                      {message.senderRole}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>

                <h4 className={`text-sm mb-1 ${!message.read ? 'font-semibold text-secondary' : 'text-gray-700'}`}>
                  {message.subject}
                </h4>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {message.preview}
                </p>

                {message.hasVoiceMessage && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                    <Mic size={14} />
                    <span>Voice message attached</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
