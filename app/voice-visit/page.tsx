'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Save, 
  User, 
  Clock, 
  Volume2,
  VolumeX,
  ArrowLeft,
  Edit3,
  CheckCircle,
  AlertTriangle,
  FileAudio,
  Trash2,
  Download,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Recording {
  id: string
  patientName: string
  duration: number
  timestamp: string
  transcription: string
  visitType: string
  audioBlob?: Blob
  audioUrl?: string
}

export default function VoiceVisitScreen() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('Priya Sharma')
  const [visitType, setVisitType] = useState('routine')
  const [audioLevel, setAudioLevel] = useState(0)
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [playingRecording, setPlayingRecording] = useState<string | null>(null)
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null)
  const [realTimeWords, setRealTimeWords] = useState<string[]>([])
  
  const router = useRouter()
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const animationFrameRef = useRef<number | null>(null)

  // Initialize audio permissions and setup
  useEffect(() => {
    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        })
        
        setAudioPermission(true)
        audioStreamRef.current = stream
        
        // Setup audio context for real-time analysis
        audioContextRef.current = new AudioContext()
        analyserRef.current = audioContextRef.current.createAnalyser()
        const source = audioContextRef.current.createMediaStreamSource(stream)
        source.connect(analyserRef.current)
        
        analyserRef.current.fftSize = 256
        
        // Setup MediaRecorder
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        })
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data)
          }
        }
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
          const audioUrl = URL.createObjectURL(audioBlob)
          
          const newRecording: Recording = {
            id: Date.now().toString(),
            patientName: selectedPatient,
            duration: recordingTime,
            timestamp: new Date().toISOString(),
            transcription: transcript || 'Voice recording completed - transcription in progress...',
            visitType,
            audioBlob,
            audioUrl
          }
          
          setRecordings(prev => [newRecording, ...prev])
          chunksRef.current = []
          
          // Simulate transcription completion
          setTimeout(() => {
            setRecordings(prev => prev.map(rec => 
              rec.id === newRecording.id 
                ? { ...rec, transcription: generateTranscription(visitType, selectedPatient) }
                : rec
            ))
          }, 3000)
        }
        
      } catch (error) {
        console.error('Audio setup failed:', error)
        setAudioPermission(false)
      }
    }
    
    setupAudio()
    
    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Real-time audio level monitoring
  useEffect(() => {
    const updateAudioLevel = () => {
      if (analyserRef.current && isRecording && !isPaused) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)
        
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length
        setAudioLevel(average)
        
        // Simulate real-time transcription words appearing
        if (Math.random() < 0.1) { // 10% chance each frame
          const words = generateRealtimeWords(visitType)
          const randomWord = words[Math.floor(Math.random() * words.length)]
          setRealTimeWords(prev => [...prev.slice(-10), randomWord]) // Keep last 10 words
        }
      }
      
      if (isRecording && !isPaused) {
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
      }
    }
    
    if (isRecording && !isPaused) {
      updateAudioLevel()
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRecording, isPaused, visitType])

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  const generateRealtimeWords = (type: string) => {
    const commonWords = ['patient', 'feels', 'better', 'medication', 'today', 'blood pressure', 'temperature', 'normal']
    const routineWords = ['checkup', 'routine', 'follow-up', 'stable', 'continuing', 'treatment']
    const emergencyWords = ['urgent', 'pain', 'fever', 'immediate', 'hospital', 'serious']
    const pregnancyWords = ['pregnancy', 'baby', 'delivery', 'antenatal', 'checkup', 'health']
    
    switch (type) {
      case 'emergency':
        return [...commonWords, ...emergencyWords]
      case 'pregnancy':
        return [...commonWords, ...pregnancyWords]
      default:
        return [...commonWords, ...routineWords]
    }
  }

  const generateTranscription = (type: string, patient: string) => {
    const templates = {
      routine: `Visited ${patient} for routine health checkup. Patient reports feeling well with no major complaints. Blood pressure: 120/80 mmHg, Temperature: 98.6°F. Currently taking prescribed medications regularly. No side effects reported. Next visit scheduled in 2 weeks. Patient advised to continue current treatment and maintain healthy diet.`,
      emergency: `Emergency visit to ${patient}. Patient complained of severe headache and dizziness since morning. Blood pressure elevated at 160/100 mmHg. Immediate referral to PHC recommended. Patient's family informed about the situation. Emergency medication administered as per protocol. Follow-up required within 24 hours.`,
      pregnancy: `Antenatal visit for ${patient} at 7 months pregnancy. Baby movement normal, no complications reported. Blood pressure: 115/75 mmHg, weight gained appropriately. Iron tablets being taken regularly. Advised about delivery preparations and danger signs. Next visit scheduled in 2 weeks. All parameters within normal range.`
    }
    
    return templates[type as keyof typeof templates] || templates.routine
  }

  const startRecording = async () => {
    if (!mediaRecorderRef.current || !audioPermission) return
    
    try {
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      
      chunksRef.current = []
      setRecordingTime(0)
      setRealTimeWords([])
      setTranscript('')
      
      mediaRecorderRef.current.start(1000) // Collect data every second
      setIsRecording(true)
      setIsPaused(false)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      setAudioLevel(0)
      
      // Generate final transcript
      setTranscript(generateTranscription(visitType, selectedPatient))
    }
  }

  const togglePause = () => {
    if (isRecording) {
      if (isPaused) {
        if (mediaRecorderRef.current?.state === 'paused') {
          mediaRecorderRef.current.resume()
        }
      } else {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.pause()
        }
      }
      setIsPaused(!isPaused)
    }
  }

  const playRecording = (recording: Recording) => {
    if (!recording.audioUrl) return
    
    if (playingRecording === recording.id) {
      setPlayingRecording(null)
      return
    }
    
    const audio = new Audio(recording.audioUrl)
    audio.play()
    setPlayingRecording(recording.id)
    
    audio.onended = () => {
      setPlayingRecording(null)
    }
  }

  const deleteRecording = (recordingId: string) => {
    setRecordings(prev => {
      const recording = prev.find(r => r.id === recordingId)
      if (recording?.audioUrl) {
        URL.revokeObjectURL(recording.audioUrl)
      }
      return prev.filter(r => r.id !== recordingId)
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Generate dynamic waveform bars
  const waveformBars = Array.from({ length: 20 }, (_, i) => {
    const baseHeight = 4
    const dynamicHeight = isRecording && !isPaused 
      ? Math.max(baseHeight, (audioLevel / 100) * 40 + Math.sin(Date.now() / 100 + i) * 10)
      : baseHeight
    return Math.max(2, dynamicHeight)
  })

  if (audioPermission === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Microphone Access Required</h2>
            <p className="text-gray-600 mb-6">
              Please allow microphone access to record voice visits. This is essential for documenting patient consultations.
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b p-4 pt-12"
      >
        <div className="flex items-center justify-between">
          <Link href="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          
          <h1 className="text-xl font-bold text-gray-900">Voice Visit</h1>
          
          <div className="w-16" />
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Patient & Visit Type Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Patient
                  </label>
                  <select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl"
                    disabled={isRecording}
                  >
                    <option value="Priya Sharma">Priya Sharma - Kumhari</option>
                    <option value="Amit Kumar">Amit Kumar - Durg</option>
                    <option value="Sunita Devi">Sunita Devi - Bhilai</option>
                    <option value="Rajesh Patel">Rajesh Patel - Raipur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visit Type
                  </label>
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl"
                    disabled={isRecording}
                  >
                    <option value="routine">Routine Checkup</option>
                    <option value="emergency">Emergency Visit</option>
                    <option value="pregnancy">Pregnancy Care</option>
                    <option value="follow-up">Follow-up Visit</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recording Interface */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`transition-all duration-300 ${
            isRecording ? 'bg-red-50 border-red-200 shadow-lg' : 'bg-white'
          }`}>
            <CardContent className="p-6">
              {/* Status */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ 
                    scale: isRecording && !isPaused ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: isRecording && !isPaused ? Infinity : 0 
                  }}
                  className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isRecording 
                      ? isPaused 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isRecording ? (
                    isPaused ? <Pause className="w-8 h-8" /> : <Mic className="w-8 h-8" />
                  ) : (
                    <MicOff className="w-8 h-8" />
                  )}
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {formatTime(recordingTime)}
                </h2>
                
                <p className="text-gray-600">
                  {isRecording 
                    ? isPaused 
                      ? 'Recording Paused'
                      : 'Recording...'
                    : 'Ready to Record'
                  }
                </p>
              </div>

              {/* Waveform Visualization */}
              <div className="flex items-center justify-center space-x-1 mb-6 h-16">
                {waveformBars.map((height, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 rounded-full ${
                      isRecording && !isPaused 
                        ? 'bg-red-500' 
                        : 'bg-gray-300'
                    }`}
                    animate={{ 
                      height: `${height}px`,
                      opacity: isRecording && !isPaused ? [0.4, 1, 0.4] : 0.3
                    }}
                    transition={{ 
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: isRecording && !isPaused ? Infinity : 0,
                      delay: index * 0.05
                    }}
                  />
                ))}
              </div>

              {/* Real-time transcription preview */}
              {isRecording && realTimeWords.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <h4 className="font-medium text-blue-900 mb-2">Live Transcription</h4>
                  <div className="flex flex-wrap gap-1">
                    {realTimeWords.map((word, index) => (
                      <motion.span
                        key={`${word}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white px-8"
                    disabled={audioPermission !== true}
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={togglePause}
                      size="lg"
                      variant="outline"
                      className="px-6"
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Pause className="w-5 h-5 mr-2" />
                          Pause
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      variant="outline"
                      className="px-6 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Previous Recordings */}
        {recordings.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">Recent Recordings</h3>
            
            {recordings.map((recording, index) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileAudio className="w-6 h-6 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 truncate">
                            {recording.patientName}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(recording.timestamp)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTime(recording.duration)}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            {recording.visitType}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                          {recording.transcription}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => playRecording(recording)}
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            {playingRecording === recording.id ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Play
                              </>
                            )}
                          </Button>
                          
                          <Button
                            onClick={() => deleteRecording(recording.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">Voice Recording Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Speak clearly and at normal volume</li>
                <li>• Record in a quiet environment when possible</li>
                <li>• Mention patient name, date, and visit purpose</li>
                <li>• Include key health observations and recommendations</li>
                <li>• Recordings are automatically transcribed and saved</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}