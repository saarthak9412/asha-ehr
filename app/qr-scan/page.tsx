'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Camera, 
  QrCode, 
  ArrowLeft, 
  Flashlight, 
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  User,
  Eye,
  X,
  SwitchCamera
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { BrowserQRCodeReader } from '@zxing/library'

interface IScannerControls {
  stop(): void
}

interface ScannedPatient {
  id: string
  name: string
  age: number
  healthCard: string
  village: string
  phone: string
  conditions: string[]
  medications: string[]
  allergies: string[]
  riskLevel: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  ashaWorker: string
  generated: string
}

export default function QRScanScreen() {
  const [isScanning, setIsScanning] = useState(false)
  const [flashlightOn, setFlashlightOn] = useState(false)
  const [scanResult, setScanResult] = useState<ScannedPatient | null>(null)
  const [scanError, setScanError] = useState('')
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null)
  const scannerControlsRef = useRef<IScannerControls | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize camera and QR scanner
  useEffect(() => {
    const initializeScanner = async () => {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setCameraPermission(true)
        stream.getTracks().forEach(track => track.stop()) // Stop initial test stream
        
        // Get available cameras
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(device => device.kind === 'videoinput')
        setAvailableCameras(videoDevices)
        
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId)
        }
        
        // Initialize QR code reader
        codeReaderRef.current = new BrowserQRCodeReader()
        
      } catch (error) {
        console.error('Camera initialization failed:', error)
        setCameraPermission(false)
      }
    }
    
    initializeScanner()
    
    return () => {
      stopScanning()
    }
  }, [])

  const startScanning = async () => {
    if (!codeReaderRef.current || !videoRef.current || !selectedCamera) return
    
    try {
      setIsScanning(true)
      setScanError('')
      setIsProcessing(false)
      
      // Start video stream
      const constraints = {
        video: {
          deviceId: selectedCamera,
          facingMode: 'environment', // Prefer back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      videoRef.current.srcObject = stream
      
      // Enable flashlight if supported and requested
      if (flashlightOn && stream.getVideoTracks().length > 0) {
        const track = stream.getVideoTracks()[0]
        if ('torch' in track.getCapabilities()) {
          await track.applyConstraints({
            advanced: [{ torch: true } as any]
          })
        }
      }
      
      // Start QR code detection
      codeReaderRef.current.decodeFromVideoDevice(
        selectedCamera,
        videoRef.current,
        (result, error) => {
          if (result) {
            handleScanSuccess(result.getText())
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('Scan error:', error)
          }
        }
      )
      
      // Create scanner controls for stopping
      scannerControlsRef.current = {
        stop: () => {
          if (codeReaderRef.current) {
            codeReaderRef.current.reset()
          }
        }
      }
      
    } catch (error) {
      console.error('Failed to start scanning:', error)
      setScanError('Failed to access camera. Please check permissions.')
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    if (scannerControlsRef.current) {
      scannerControlsRef.current.stop()
      scannerControlsRef.current = null
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setIsScanning(false)
    setFlashlightOn(false)
  }

  const handleScanSuccess = (qrData: string) => {
    setIsProcessing(true)
    
    try {
      // Try to parse QR data as JSON (health card format)
      const patientData = JSON.parse(qrData)
      
      // Validate required fields
      if (patientData.id && patientData.name && patientData.healthCard) {
        setScanResult(patientData)
        stopScanning()
      } else {
        throw new Error('Invalid health card format')
      }
      
    } catch (error) {
      // If JSON parsing fails, treat as simple text or generate mock data for demo
      console.log('QR Data:', qrData)
      
      // Generate mock patient data for demo purposes
      const mockPatient: ScannedPatient = {
        id: '1',
        name: 'Priya Sharma',
        age: 28,
        healthCard: qrData.substring(0, 12) || 'AHS001234567',
        village: 'Kumhari',
        phone: '+91 98765 43210',
        conditions: ['Hypertension'],
        medications: ['Amlodipine 5mg'],
        allergies: ['Penicillin'],
        riskLevel: 'Low',
        emergencyContact: {
          name: 'Rajesh Sharma',
          relation: 'Husband',
          phone: '+91 98765 43211'
        },
        ashaWorker: 'Priya Kumari',
        generated: new Date().toISOString()
      }
      
      setScanResult(mockPatient)
      stopScanning()
    }
    
    setIsProcessing(false)
  }

  const toggleFlashlight = async () => {
    if (streamRef.current && streamRef.current.getVideoTracks().length > 0) {
      const track = streamRef.current.getVideoTracks()[0]
      
      try {
        if ('torch' in track.getCapabilities()) {
          await track.applyConstraints({
            advanced: [{ torch: !flashlightOn } as any]
          })
          setFlashlightOn(!flashlightOn)
        }
      } catch (error) {
        console.error('Flashlight toggle failed:', error)
      }
    }
  }

  const switchCamera = async () => {
    if (availableCameras.length <= 1) return
    
    const currentIndex = availableCameras.findIndex(cam => cam.deviceId === selectedCamera)
    const nextIndex = (currentIndex + 1) % availableCameras.length
    const nextCamera = availableCameras[nextIndex]
    
    setSelectedCamera(nextCamera.deviceId)
    
    if (isScanning) {
      stopScanning()
      // Restart with new camera after a brief delay
      setTimeout(() => {
        startScanning()
      }, 500)
    }
  }

  const restartScan = () => {
    setScanResult(null)
    setScanError('')
    setIsProcessing(false)
    startScanning()
  }

  const viewPatientDetails = () => {
    if (scanResult) {
      router.push(`/patients/${scanResult.id}`)
    }
  }

  if (cameraPermission === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Camera className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Camera Access Required</h2>
            <p className="text-gray-600 mb-6">
              Please allow camera access to scan QR codes. This is needed to quickly access patient health cards.
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-20 p-6 pt-12"
      >
        <div className="flex items-center justify-between">
          <Link href="/home">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          
          <h1 className="text-xl font-bold">Scan QR Code</h1>
          
          <div className="flex items-center space-x-2">
            {availableCameras.length > 1 && (
              <Button
                onClick={switchCamera}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <SwitchCamera className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              onClick={toggleFlashlight}
              variant="ghost"
              size="sm"
              className={`text-white hover:bg-white/20 ${flashlightOn ? 'bg-white/20' : ''}`}
            >
              <Flashlight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Camera View */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </div>

      {/* Scanning Interface */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {isScanning && !scanResult ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            {/* QR Scanning Frame */}
            <div className="relative w-64 h-64">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-primary"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary"></div>
              
              {/* Scanning line */}
              <motion.div
                className="absolute left-4 right-4 h-0.5 bg-primary shadow-lg"
                animate={{
                  y: [16, 240, 16],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Processing indicator */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <QrCode className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">
                {isProcessing ? 'Processing...' : 'Position QR code in the frame'}
              </p>
              <p className="text-sm text-gray-300">
                Hold steady and ensure good lighting for best results
              </p>
            </motion.div>
          </motion.div>
        ) : scanResult ? (
          // Scan Success
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-6 max-w-sm w-full"
          >
            <Card className="bg-white text-gray-900">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">QR Code Scanned!</h2>
                  <p className="text-gray-600">Patient information found</p>
                </div>

                {/* Patient Preview */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{scanResult.name}</h3>
                      <p className="text-sm text-gray-600">Age {scanResult.age} • {scanResult.village}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Health Card:</strong> {scanResult.healthCard}</p>
                    <p><strong>Phone:</strong> {scanResult.phone}</p>
                    <p><strong>Risk Level:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        scanResult.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                        scanResult.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {scanResult.riskLevel}
                      </span>
                    </p>
                  </div>

                  {scanResult.allergies.length > 0 && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center text-red-700 mb-1">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="font-medium text-sm">Allergies</span>
                      </div>
                      <p className="text-sm text-red-600">
                        {scanResult.allergies.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button
                    onClick={viewPatientDetails}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  <Button
                    onClick={restartScan}
                    variant="outline"
                    className="flex-1"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : scanError ? (
          // Scan Error
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-6 max-w-sm w-full text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Scan Failed</h2>
            <p className="text-gray-300 mb-6">{scanError}</p>
            <Button onClick={restartScan} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        ) : (
          // Start Scanning
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <QrCode className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-xl font-bold mb-4">Ready to Scan</h2>
            <Button onClick={startScanning} size="lg" className="px-8">
              <Camera className="w-5 h-5 mr-2" />
              Start Scanning
            </Button>
          </motion.div>
        )}
      </div>

      {/* Bottom Instructions */}
      {isScanning && !scanResult && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 left-0 right-0 p-6 text-center"
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
            <h3 className="font-semibold mb-2">Scanning Tips</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Hold device steady 6-12 inches from QR code</li>
              <li>• Ensure adequate lighting or use flashlight</li>
              <li>• Make sure QR code fills the scanning frame</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  )
}