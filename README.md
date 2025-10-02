# ASHA EHR Companion App

A mobile-first, offline-capable Electronic Health Record companion application designed for ASHA (Accredited Social Health Activist) workers in India.

## 🌟 Features

### Onboarding & Security
- **Security Lock Screen** - PIN-based authentication
- **Welcome Onboarding** - Feature highlights with animations
- **Privacy & Security** - Data protection information
- **Personalization** - Language selection and preferences

### Core Functionality
- **Dashboard** - Quick stats, high-risk patients, and reminders
- **Patient Management** - List, search, filter, and view patient details
- **Voice Visit Recording** - Record patient visits using voice input with live transcription
- **QR Health Cards** - Generate and scan QR codes for patient identification
- **Reminders** - Calendar view with task management
- **Messages** - Communication with supervisors and health centers

### Advanced Features
- **Offline-First** - Works completely offline with local data storage
- **Sync Management** - Pending sync queue, auto-sync, and manual sync
- **Mesh Sync** - Peer-to-peer data sharing via Bluetooth/WiFi Direct
- **Sync History** - Audit logs and sync statistics
- **Alerts** - High-risk patient notifications
- **Conflict Resolution** - Smart conflict resolution UI
- **Training** - In-app training modules with progress tracking
- **Troubleshooting** - Comprehensive help and FAQ section

### State Screens
- **Empty State** - User-friendly empty list screens
- **Offline State** - Clear offline indicators and guidance
- **Error State** - Graceful error handling with recovery options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view the app.

## 📱 Mobile-First Design

The app is optimized for mobile devices with screen widths between **360px - 430px**.

To test on desktop:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device or set custom dimensions

## 🎨 Design System

### Colors
- **Primary (Peach)**: `#F79B72`
- **Secondary (Deep Blue)**: `#2A4759`
- **Neutral Gray**: `#DDDDDD`
- **Light Gray**: `#EEEEEE`

### Typography
- **Headings**: 28-32px (H1), 20-24px (H2)
- **Body**: 16-18px
- **Small**: 12-14px

### Icons
- All icons from `lucide-react`
- Consistent 20-24px sizes
- Accessibility-first design

## 🗂️ Project Structure

```
/app                          # Next.js app directory
  /home                      # Dashboard
  /patients                  # Patient management
    /[id]                    # Patient detail
      /qr                    # QR health card
    /new                     # Add new patient
  /voice-visit              # Voice recording
  /qr-scanner               # QR code scanner
  /reminders                # Calendar & reminders
  /messages                 # Communications
  /alerts                   # Risk notifications
  /sync                     # Sync management
    /pending                # Pending sync queue
    /mesh                   # Mesh sync
    /history                # Sync logs
  /conflicts                # Conflict resolution
  /training                 # Training modules
  /profile                  # Settings & profile
  /states                   # State screens
    /empty                  # Empty states
    /offline                # Offline states
    /error                  # Error states
  /troubleshooting          # Help & support
  /security                 # PIN lock
  /onboarding               # Onboarding flow
    /welcome
    /privacy
    /personalize

/components                  # Reusable components
  BottomNav.tsx             # Navigation bar
  OfflineBanner.tsx         # Offline indicator

/data                        # Mock data
  patients.json             # Sample patient data
  reminders.json            # Sample reminders
  messages.json             # Sample messages

/ui-images                   # Reference UI designs
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **QR Codes**: react-qr-code
- **State Management**: React hooks (useState, useContext)

## 📊 Mock Data

The app includes realistic mock data with:
- 6 sample patients with Indian names and locations
- Multiple reminders and tasks
- Message threads with supervisors
- Sync queue items
- Training modules

All data uses Indian context:
- Names: Priya Sharma, Rajesh Kumar, Lakshmi Devi, etc.
- Locations: Bangalore, Mumbai, Hyderabad, Chennai
- Health conditions relevant to Indian healthcare

## 🔒 Security & Privacy

- PIN-based authentication
- End-to-end encryption (UI only - mock)
- Local data storage
- ABDM compliance ready (UI placeholder)
- Privacy by design

## 🌐 Offline Capabilities

- Complete offline functionality
- Local data persistence
- Automatic sync when online
- Mesh sync for peer-to-peer sharing
- Clear offline indicators

## 📝 Development Notes

### Key Features
- **Voice Input**: Mock implementation with animation placeholders
- **QR Codes**: Fully functional QR generation and display
- **Animations**: Framer Motion throughout for smooth UX
- **Responsive**: Mobile-first, optimized for 360-430px width
- **Navigation**: Persistent bottom nav on all main screens

### Limitations (Prototype)
- No real backend integration
- No actual voice recording (mock UI only)
- No real authentication system
- Mock data only
- No actual sync functionality

## 🎯 Future Enhancements

- Backend API integration
- Real voice recording and transcription
- Actual authentication and authorization
- Real-time sync with ABDM
- Multi-language support (Hindi, Tamil, Telugu, etc.)
- Actual Bluetooth mesh networking
- Push notifications
- Biometric authentication

## 📄 License

This is a prototype application for demonstration purposes.

## 👥 Credits

Developed for ASHA workers in India under the Ministry of Health & Family Welfare guidelines.

---

**Note**: This is a prototype/mockup application. All patient data is fictional and for demonstration purposes only.
