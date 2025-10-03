"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  User,
  AlertTriangle,
  PhoneCall,
  Video,
  Mic,
  Send,
  Paperclip,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import messagesData from "@/data/messages.json";

const messageTypeConfig = {
  urgent: {
    color: "text-red-600",
    bg: "bg-red-100",
    border: "border-red-200",
    icon: AlertTriangle,
  },
  reminder: {
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    icon: Clock,
  },
  admin: {
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-200",
    icon: User,
  },
  emergency: {
    color: "text-red-600",
    bg: "bg-red-100",
    border: "border-red-200",
    icon: PhoneCall,
  },
  training: {
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-200",
    icon: Video,
  },
};

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const filteredMessages = messagesData.filter((message) => {
    const matchesSearch =
      searchQuery === "" ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !message.read) ||
      (selectedFilter === "urgent" && message.type === "urgent") ||
      message.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = messagesData.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 pt-12 pb-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600">
                {unreadCount} unread messages
              </p>
            )}
          </div>
          <Button size="sm" variant="outline">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { value: "all", label: "All" },
            { value: "unread", label: "Unread" },
            { value: "urgent", label: "Urgent" },
            { value: "emergency", label: "Emergency" },
            { value: "training", label: "Training" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === option.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Messages List */}
      <div className="p-6">
        {filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Messages
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "No messages match your search criteria"
                : "You have no messages at the moment"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((message, index) => {
              const typeConfig =
                messageTypeConfig[
                  message.type as keyof typeof messageTypeConfig
                ];
              const TypeIcon = typeConfig.icon;

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`hover:shadow-lg transition-all cursor-pointer ${
                      !message.read ? "ring-2 ring-primary/20" : ""
                    } ${typeConfig.border}`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Message Type Icon */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeConfig.bg}`}
                        >
                          <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h3
                                className={`font-semibold text-gray-900 ${
                                  !message.read
                                    ? "text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {message.sender}
                              </h3>
                              {!message.read && (
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-1">
                            {message.role}
                          </p>

                          <p
                            className={`text-sm leading-relaxed ${
                              !message.read
                                ? "text-gray-900 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {message.message.length > 120
                              ? `${message.message.substring(0, 120)}...`
                              : message.message}
                          </p>

                          {/* Attachments */}
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="mt-2 flex items-center space-x-2">
                                <Paperclip className="w-3 h-3 text-gray-400" />
                                {message.attachments.map(
                                  (attachment, attachIndex) => (
                                    <span
                                      key={attachIndex}
                                      className="text-xs text-primary"
                                    >
                                      {attachment.type === "voice" ? (
                                        <span className="flex items-center">
                                          <Mic className="w-3 h-3 mr-1" />
                                          Voice ({attachment.duration})
                                        </span>
                                      ) : attachment.type === "video" ? (
                                        <span className="flex items-center">
                                          <Video className="w-3 h-3 mr-1" />
                                          Video ({attachment.duration})
                                        </span>
                                      ) : (
                                        attachment.type
                                      )}
                                    </span>
                                  )
                                )}
                              </div>
                            )}

                          {/* Priority Badge */}
                          {(message.type === "urgent" ||
                            message.type === "emergency") && (
                            <div className="mt-2">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${typeConfig.bg} ${typeConfig.color}`}
                              >
                                {message.type === "emergency"
                                  ? "EMERGENCY"
                                  : "URGENT"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <Button size="lg" className="w-14 h-14 rounded-full shadow-lg">
          <Send className="w-6 h-6" />
        </Button>
      </motion.div>

      <BottomNavigation />
    </div>
  );
}
