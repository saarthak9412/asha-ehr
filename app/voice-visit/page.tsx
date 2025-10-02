'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Mic, MicOff, Save, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

function VoiceVisitContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId');
  
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    // Mock transcript generation
    setTimeout(() => {
      setTranscript('Patient visited today for regular checkup. Blood pressure normal at 120/80. Temperature 98.6°F. Patient reports feeling well. No new symptoms or concerns.');
    }, 3000);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const handleSave = () => {
    // Mock save
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-500 text-white px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h1 className="text-xl font-bold">Voice Visit Mode</h1>
          <div className="w-10"></div>
        </div>

        {patientId && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-sm text-white/80">Recording visit for</p>
            <p className="font-semibold">Patient #{patientId}</p>
          </div>
        )}
      </div>

      {/* Recording Interface */}
      <div className="px-6 py-8">
        {/* Microphone Visualization */}
        <div className="text-center mb-8">
          <motion.div
            animate={{
              scale: isRecording && !isPaused ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isRecording && !isPaused ? Infinity : 0,
            }}
            className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl ${
              isRecording ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isRecording ? (
              <MicOff size={64} className="text-white" />
            ) : (
              <Mic size={64} className="text-white" />
            )}
          </motion.div>

          {/* Waveform Animation */}
          {isRecording && !isPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-1 mt-6"
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [8, Math.random() * 40 + 10, 8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                  className="w-1 bg-green-500 rounded-full"
                  style={{ height: 8 }}
                />
              ))}
            </motion.div>
          )}

          {/* Duration */}
          <div className="mt-6 text-4xl font-bold text-secondary">
            {formatDuration(duration)}
          </div>
          
          {isRecording ? (
            <p className="text-green-600 font-semibold mt-2">
              {isPaused ? '⏸ Paused' : '🔴 Recording...'}
            </p>
          ) : (
            <p className="text-gray-600 mt-2">Tap mic to start recording</p>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          {!isRecording ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleStartRecording}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl"
            >
              <Mic size={32} className="text-white" />
            </motion.button>
          ) : (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleTogglePause}
                className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                {isPaused ? (
                  <Play size={24} className="text-white" />
                ) : (
                  <Pause size={24} className="text-white" />
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleStopRecording}
                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-xl"
              >
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </motion.button>
            </>
          )}
        </div>

        {/* Live Transcript */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-lg mb-4"
          >
            <h3 className="font-bold text-secondary mb-3 flex items-center gap-2">
              <span>📝</span>
              Live Transcript
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {transcript}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Transcribing in Hindi & English...</span>
            </div>
          </motion.div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <h4 className="font-semibold text-secondary text-sm mb-2">💡 Recording Tips</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Speak clearly and at a normal pace</li>
            <li>• Mention symptoms, vital signs, and observations</li>
            <li>• You can pause and resume anytime</li>
            <li>• Recording is saved offline and synced later</li>
          </ul>
        </div>

        {/* Save Button */}
        {transcript && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 mt-6"
          >
            <Save size={20} />
            Save Visit Record
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default function VoiceVisitPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <VoiceVisitContent />
    </Suspense>
  );
}
