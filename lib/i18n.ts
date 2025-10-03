export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml' | 'od' | 'pa'

export interface LanguageInfo {
  code: SupportedLanguage
  name: string
  nativeName: string
  flag: string
}

export const supportedLanguages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'od', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
]

export const translations = {
  // Navigation & Common
  en: {
    // App Title
    appName: 'ASHA EHR',
    welcome: 'Welcome',
    
    // Navigation
    home: 'Home',
    patients: 'Patients',
    reminders: 'Reminders',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    
    // Home Screen
    dashboardTitle: 'Healthcare Dashboard',
    totalPatients: 'Total Patients',
    upcomingReminders: 'Upcoming Reminders',
    criticalPatients: 'Critical Patients',
    recentActivity: 'Recent Activity',
    todayTasks: 'Today\'s Tasks',
    pendingSync: 'Pending Sync',
    quickActions: 'Quick Actions',
    offlineSyncMessage: 'Working offline - Data will sync when connected',
    ashaWorkerTagline: 'Priya Kumari, ASHA Worker',
    addPatientAction: 'Add Patient',
    createRecordHint: 'Create new record',
    voiceVisit: 'Voice Visit',
    startRecording: 'Start recording',
    scanQr: 'Scan QR',
    patientHealthCard: 'Patient health card',
    meshSync: 'Mesh Sync',
    connectNearby: 'Connect nearby',
    todaysVisits: 'Today\'s Visits',
    noVisitsToday: 'No visits scheduled for today',
    listView: 'List',
    calendarView: 'Calendar',
    noRemindersTitle: 'No Reminders',
    noRemindersGeneral: 'You have no reminders set up yet',
    noRemindersForStatus: 'No {{status}} reminders found',
    noRemindersForDate: 'No reminders for this date',
    
    // Patient Management
    patientList: 'Patient List',
    newPatient: 'New Patient',
    patientDetails: 'Patient Details',
    patientInfo: 'Patient Information',
    personalInfo: 'Personal Information',
    medicalInfo: 'Medical Information',
    contactInfo: 'Contact Information',
    emergencyContact: 'Emergency Contact',
    vitals: 'Vitals',
    conditions: 'Conditions',
    medications: 'Medications',
    immunizations: 'Immunizations',
    pregnancyInfo: 'Pregnancy Information',
    childInfo: 'Child Information',
    searchPatients: 'Search patients by name, condition, or location',
    allRisks: 'All Risks',
    more: 'more',
    
    // Patient Form Fields
    fullName: 'Full Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    phoneNumber: 'Phone Number',
    address: 'Address',
    bloodGroup: 'Blood Group',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    lastVisit: 'Last Visit',
    nextVisit: 'Next Visit',
    notes: 'Notes',
    
    // Emergency Contact
    emergencyContactName: 'Emergency Contact Name',
    emergencyContactPhone: 'Emergency Contact Phone',
    relation: 'Relation',
    
    // Vitals
    bloodPressure: 'Blood Pressure',
    pulse: 'Pulse',
    temperature: 'Temperature',
    weight: 'Weight',
    height: 'Height',
    bmi: 'BMI',
    lastUpdated: 'Last Updated',
    
    // Reminders
    reminderList: 'Reminder List',
    newReminder: 'New Reminder',
    reminderDetails: 'Reminder Details',
    dueDate: 'Due Date',
    priority: 'Priority',
    status: 'Status',
    completed: 'Completed',
    pending: 'Pending',
    overdue: 'Overdue',
    title: 'Title',
    description: 'Description',
    patient: 'Patient',
    type: 'Type',
    
    // Reminder Types
    vaccination: 'Vaccination',
    checkup: 'Check-up',
    medication: 'Medication',
    followup: 'Follow-up',
    screening: 'Screening',
    consultation: 'Consultation',
    appointment: 'Appointment',
    meeting: 'Meeting',
    
    // Calendar
    today: 'Today',
    calendar: 'Calendar',
    monthView: 'Month View',
    weekView: 'Week View',
    dayView: 'Day View',
    
    // Settings
    language: 'Language',
    selectLanguage: 'Select Language',
    changeLanguage: 'Change Language',
    appearance: 'Appearance',
    notifications: 'Notifications',
    privacy: 'Privacy',
    security: 'Security',
    about: 'About',
    version: 'Version',
    
    // Onboarding
    getStarted: 'Get Started',
    chooseLanguage: 'Choose Your Language',
    setupProfile: 'Setup Your Profile',
    welcomeMessage: 'Welcome to ASHA EHR - Your comprehensive healthcare management system',
    
    // Messages
    patientSaved: 'Patient saved successfully',
    patientUpdated: 'Patient updated successfully',
    patientDeleted: 'Patient deleted successfully',
    reminderSaved: 'Reminder saved successfully',
    reminderCompleted: 'Reminder marked as completed',
    noPatients: 'No patients found',
    noReminders: 'No reminders found',
    searchReminders: 'Search reminders...',
    
    // Filters
    all: 'All',
    children: 'Children',
    pregnant: 'Pregnant',
    elderly: 'Elderly',
    critical: 'Critical',
    
    // Time
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night',
    am: 'AM',
    pm: 'PM',
    
    // Health Conditions
    diabetes: 'Diabetes',
    hypertension: 'Hypertension',
    asthma: 'Asthma',
    heartDisease: 'Heart Disease',
    pregnancy: 'Pregnancy',
    malnutrition: 'Malnutrition',
    tuberculosis: 'Tuberculosis',
    anemia: 'Anemia',
    
    // Immunizations
    bcg: 'BCG',
    hepatitisB: 'Hepatitis B',
    polio: 'Polio',
    dpt: 'DPT',
    measles: 'Measles',
    mmr: 'MMR',
    tetanus: 'Tetanus',
    
    // Child Development
    birthWeight: 'Birth Weight',
    motherName: 'Mother\'s Name',
    developmentMilestones: 'Development Milestones',
    weightGain: 'Weight Gain',
    sitting: 'Sitting',
    walking: 'Walking',
    talking: 'Talking',
    
    // Pregnancy
    isPregnant: 'Is Pregnant',
    edd: 'Expected Delivery Date',
    trimester: 'Trimester',
    complications: 'Complications',
    firstTrimester: 'First Trimester',
    secondTrimester: 'Second Trimester',
    thirdTrimester: 'Third Trimester',
    
    // Additional UI
    step: 'Step',
    of: 'of',
    skip: 'Skip',
    continue: 'Continue',
    selected: 'Selected',
    tasks: 'Tasks',
    noTasksToday: 'No tasks for today',
    greatWork: 'Great work! You\'re all caught up',
    viewAll: 'View All'
  },
  
  hi: {
    // App Title
    appName: 'आशा ईएचआर',
    welcome: 'स्वागत है',
    
    // Navigation
    home: 'होम',
    patients: 'मरीज़',
    reminders: 'अनुस्मारक',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    
    // Common Actions
    save: 'सेव करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    add: 'जोड़ें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    sort: 'सॉर्ट',
    submit: 'जमा करें',
    back: 'वापस',
    next: 'अगला',
    previous: 'पिछला',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    warning: 'चेतावनी',
    info: 'जानकारी',
    confirm: 'पुष्टि करें',
    yes: 'हाँ',
    no: 'नहीं',
    
    // Home Screen
    dashboardTitle: 'स्वास्थ्य डैशबोर्ड',
    totalPatients: 'कुल मरीज़',
    upcomingReminders: 'आगामी अनुस्मारक',
    criticalPatients: 'गंभीर मरीज़',
    recentActivity: 'हाल की गतिविधि',
    todayTasks: 'आज के कार्य',
    pendingSync: 'लंबित सिंक',
    quickActions: 'त्वरित कार्य',
    offlineSyncMessage: 'ऑफ़लाइन कार्य कर रहे हैं - कनेक्ट होने पर डेटा सिंक होगा',
    ashaWorkerTagline: 'प्रिया कुमारी, आशा कार्यकर्ता',
    addPatientAction: 'मरीज़ जोड़ें',
    createRecordHint: 'नया रिकॉर्ड बनाएँ',
    voiceVisit: 'वॉयस विज़िट',
    startRecording: 'रिकॉर्डिंग शुरू करें',
    scanQr: 'QR स्कैन करें',
    patientHealthCard: 'मरीज़ स्वास्थ्य कार्ड',
    meshSync: 'मेष सिंक',
    connectNearby: 'नज़दीकी उपकरण जोड़ें',
    todaysVisits: 'आज के दौरे',
    noVisitsToday: 'आज कोई दौरा निर्धारित नहीं है',
    listView: 'सूची',
    calendarView: 'कैलेंडर',
    noRemindersTitle: 'कोई अनुस्मारक नहीं',
    noRemindersGeneral: 'आपने अभी तक कोई अनुस्मारक सेट नहीं किया है',
    noRemindersForStatus: '{{status}} अनुस्मारक नहीं मिले',
    noRemindersForDate: 'इस तारीख के लिए कोई अनुस्मारक नहीं',
    
    // Patient Management
    patientList: 'मरीज़ों की सूची',
    newPatient: 'नया मरीज़',
    patientDetails: 'मरीज़ का विवरण',
    patientInfo: 'मरीज़ की जानकारी',
    personalInfo: 'व्यक्तिगत जानकारी',
    medicalInfo: 'चिकित्सा जानकारी',
    contactInfo: 'संपर्क जानकारी',
    emergencyContact: 'आपातकालीन संपर्क',
    vitals: 'महत्वपूर्ण संकेत',
    conditions: 'स्थितियां',
    medications: 'दवाएं',
    immunizations: 'टीकाकरण',
    pregnancyInfo: 'गर्भावस्था की जानकारी',
    childInfo: 'बच्चे की जानकारी',
    
    // Patient Form Fields
    fullName: 'पूरा नाम',
    age: 'उम्र',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    phoneNumber: 'फोन नंबर',
    address: 'पता',
    bloodGroup: 'रक्त समूह',
    riskLevel: 'जोखिम स्तर',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    lastVisit: 'अंतिम मुलाकात',
    nextVisit: 'अगली मुलाकात',
    notes: 'नोट्स',
    
    // Emergency Contact
    emergencyContactName: 'आपातकालीन संपर्क का नाम',
    emergencyContactPhone: 'आपातकालीन संपर्क फोन',
    relation: 'रिश्ता',
    
    // Vitals
    bloodPressure: 'रक्तचाप',
    pulse: 'नाड़ी',
    temperature: 'तापमान',
    weight: 'वजन',
    height: 'ऊंचाई',
    bmi: 'बीएमआई',
    lastUpdated: 'अंतिम अपडेट',
    
    // Reminders
    reminderList: 'अनुस्मारक सूची',
    newReminder: 'नया अनुस्मारक',
    reminderDetails: 'अनुस्मारक विवरण',
    dueDate: 'देय तिथि',
    priority: 'प्राथमिकता',
    status: 'स्थिति',
    completed: 'पूर्ण',
    pending: 'लंबित',
    overdue: 'अतिदेय',
    title: 'शीर्षक',
    description: 'विवरण',
    patient: 'मरीज़',
    type: 'प्रकार',
    
    // Reminder Types
    vaccination: 'टीकाकरण',
    checkup: 'जांच',
    medication: 'दवा',
    followup: 'फॉलो-अप',
    screening: 'स्क्रीनिंग',
    consultation: 'सलाह',
    appointment: 'नियुक्ति',
    meeting: 'बैठक',
    
    // Calendar
    today: 'आज',
    calendar: 'कैलेंडर',
    monthView: 'महीने का दृश्य',
    weekView: 'सप्ताह का दृश्य',
    dayView: 'दिन का दृश्य',
    
    // Settings
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    changeLanguage: 'भाषा बदलें',
    appearance: 'दिखावट',
    notifications: 'सूचनाएं',
    privacy: 'गोपनीयता',
    security: 'सुरक्षा',
    about: 'बारे में',
    version: 'संस्करण',
    
    // Onboarding
    getStarted: 'शुरू करें',
    chooseLanguage: 'अपनी भाषा चुनें',
    setupProfile: 'अपनी प्रोफ़ाइल सेट करें',
    welcomeMessage: 'आशा ईएचआर में आपका स्वागत है - आपकी व्यापक स्वास्थ्य प्रबंधन प्रणाली',
    
    // Messages
    patientSaved: 'मरीज़ सफलतापूर्वक सेव हुआ',
    patientUpdated: 'मरीज़ सफलतापूर्वक अपडेट हुआ',
    patientDeleted: 'मरीज़ सफलतापूर्वक हटाया गया',
    reminderSaved: 'अनुस्मारक सफलतापूर्वक सेव हुआ',
    reminderCompleted: 'अनुस्मारक पूर्ण के रूप में चिह्नित',
    noPatients: 'कोई मरीज़ नहीं मिला',
    noReminders: 'कोई अनुस्मारक नहीं मिला',
    searchPatients: 'मरीज़ खोजें...',
    searchReminders: 'अनुस्मारक खोजें...',
    
    // Filters
    all: 'सभी',
    children: 'बच्चे',
    pregnant: 'गर्भवती',
    elderly: 'बुजुर्ग',
    critical: 'गंभीर',
    
    // Time
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात',
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    
    // Health Conditions
    diabetes: 'मधुमेह',
    hypertension: 'उच्च रक्तचाप',
    asthma: 'दमा',
    heartDisease: 'हृदय रोग',
    pregnancy: 'गर्भावस्था',
    malnutrition: 'कुपोषण',
    tuberculosis: 'तपेदिक',
    anemia: 'एनीमिया',
    
    // Immunizations
    bcg: 'बीसीजी',
    hepatitisB: 'हेपेटाइटिस बी',
    polio: 'पोलियो',
    dpt: 'डीपीटी',
    measles: 'खसरा',
    mmr: 'एमएमआर',
    tetanus: 'टेटनस',
    
    // Child Development
    birthWeight: 'जन्म का वजन',
    motherName: 'माता का नाम',
    developmentMilestones: 'विकास मील के पत्थर',
    weightGain: 'वजन बढ़ना',
    sitting: 'बैठना',
    walking: 'चलना',
    talking: 'बात करना',
    
    // Pregnancy
    isPregnant: 'गर्भवती है',
    edd: 'प्रसव की अपेक्षित तिथि',
    trimester: 'तिमाही',
    complications: 'जटिलताएं',
    firstTrimester: 'पहली तिमाही',
    secondTrimester: 'दूसरी तिमाही',
    thirdTrimester: 'तीसरी तिमाही',
    
    // Additional UI
    step: 'चरण',
    of: 'का',
    skip: 'छोड़ें',
    continue: 'जारी रखें',
    selected: 'चयनित',
    tasks: 'कार्य',
    noTasksToday: 'आज कोई कार्य नहीं',
    greatWork: 'बहुत बढ़िया! आप पूरी तरह अपडेट हैं',
    viewAll: 'सभी देखें',
    more: 'और'
  },
  
  te: {
    // App Title
    appName: 'ఆశా ఈహెచ్ఆర్',
    welcome: 'స్వాగతం',
    
    // Navigation
    home: 'హోమ్',
    patients: 'రోగులు',
    reminders: 'రిమైండర్లు',
    profile: 'ప్రొఫైల్',
    settings: 'సెట్టింగ్స్',
    logout: 'లాగ్అవుట్',
    
    // Common Actions
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
    edit: 'ఎడిట్ చేయండి',
    delete: 'తొలగించండి',
    add: 'జోడించండి',
    search: 'వెతకండి',
    filter: 'ఫిల్టర్',
    sort: 'క్రమబద్ధీకరించు',
    submit: 'సబ్మిట్ చేయండి',
    back: 'వెనుకకు',
    next: 'తదుపరి',
    previous: 'మునుపటి',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయం',
    warning: 'హెచ్చరిక',
    info: 'సమాచారం',
    confirm: 'నిర్ధారించండి',
    yes: 'అవును',
    no: 'లేదు',
    
    // Home Screen
    dashboardTitle: 'ఆరోగ్య డాష్‌బోర్డ్',
    totalPatients: 'మొత్తం రోగులు',
    upcomingReminders: 'రాబోయే రిమైండర్లు',
    criticalPatients: 'క్రిటికల్ రోగులు',
    recentActivity: 'ఇటీవలి కార్యకలాపం',
    todayTasks: 'నేటి పనులు',
    pendingSync: 'పెండింగ్ సింక్',
    quickActions: 'త్వరిత చర్యలు',
    offlineSyncMessage: 'ఆఫ్‌లైన్‌లో పని చేస్తున్నారు - కనెక్ట్ అయిన తర్వాత డేటా సింక్ అవుతుంది',
    ashaWorkerTagline: 'ప్రియా కుమారి, ఆశా కార్మికురాలు',
    addPatientAction: 'రోగిని జోడించండి',
    createRecordHint: 'కొత్త రికార్డు సృష్టించండి',
    voiceVisit: 'వాయిస్ విజిట్',
    startRecording: 'రికార్డింగ్ ప్రారంభించండి',
    scanQr: 'QR స్కాన్ చేయండి',
    patientHealthCard: 'రోగి హెల్త్ కార్డ్',
    meshSync: 'మెష్ సింక్',
    connectNearby: 'సమీప పరికరాలను కనెక్ట్ చేయండి',
    todaysVisits: 'ఈరోజు సందర్శనలు',
    noVisitsToday: 'ఈరోజు ఎటువంటి సందర్శనలు షెడ్యూల్ చేయబడలేదు',
    listView: 'జాబితా',
    calendarView: 'క్యాలెండర్',
    noRemindersTitle: 'గుర్తింపులు లేవు',
    noRemindersGeneral: 'మీరు ఇంకా గుర్తింపులను సెట్ చేయలేదు',
    noRemindersForStatus: '{{status}} గుర్తింపులు కనబడలేదు',
    noRemindersForDate: 'ఈ తేదీకి గుర్తింపులు లేవు',
    appointment: 'అపాయింట్మెంట్',
    meeting: 'సమావేశం',
    
    // Patient Management
    patientList: 'రోగుల జాబితా',
    newPatient: 'కొత్త రోగి',
    patientDetails: 'రోగి వివరాలు',
    patientInfo: 'రోగి సమాచారం',
    personalInfo: 'వ్యక్తిగత సమాచారం',
    medicalInfo: 'వైద్య సమాచారం',
    contactInfo: 'సంప్రదింపు సమాచారం',
    emergencyContact: 'అత్యవసర సంప్రదింపు',
    vitals: 'వైటల్స్',
    conditions: 'పరిస్థితులు',
    medications: 'మందులు',
    immunizations: 'రోగనిరోధక టీకలు',
    pregnancyInfo: 'గర్భధారణ సమాచారం',
    childInfo: 'పిల్లల సమాచారం',
    
    // Patient Form Fields
    fullName: 'పూర్తి పేరు',
    age: 'వయస్సు',
    gender: 'లింగం',
    male: 'మగ',
    female: 'ఆడ',
    phoneNumber: 'ఫోన్ నంబర్',
    address: 'చిరునామా',
    bloodGroup: 'రక్త వర్గం',
    riskLevel: 'ప్రమాద స్థాయి',
    low: 'తక్కువ',
    medium: 'మధ్యమ',
    high: 'అధిక',
    lastVisit: 'చివరి సందర్శన',
    nextVisit: 'తదుపరి సందర్శన',
    notes: 'గమనికలు'
  },
  
  // Add more languages as needed (ta, bn, mr, gu, kn, ml, od, pa)
  ta: {
    appName: 'ஆஷா ஈஹெச்ஆர்',
    welcome: 'வரவேற்கிறோம்',
    home: 'முகப்பு',
    patients: 'நோயாளிகள்',
    reminders: 'நினைவூட்டல்கள்',
    profile: 'சுயவிவரம்',
    settings: 'அமைப்புகள்',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    meshSync: 'மேஷ் ஒத்திசைவு',
    connectNearby: 'அருகிலுள்ள சாதனங்களை இணைக்கவும்',
    language: 'மொழி'
  }
} as const

export type TranslationKey = keyof typeof translations.en

export const useTranslation = () => {
  const getCurrentLanguage = (): SupportedLanguage => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as SupportedLanguage) || 'en'
    }
    return 'en'
  }

  const setLanguage = (language: SupportedLanguage) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
      window.location.reload() // Simple reload to apply language changes
    }
  }

  const hasTranslationsForLanguage = (
    language: string
  ): language is keyof typeof translations =>
    Object.prototype.hasOwnProperty.call(translations, language)

  const t = (key: TranslationKey, replacements: Record<string, string> = {}): string => {
    const language = getCurrentLanguage()
    const fallback = translations.en[key] || key

    const localizedMap = hasTranslationsForLanguage(language)
      ? (translations[language] as Record<string, string>)
      : undefined

    let translation = localizedMap?.[key] ?? fallback

    Object.entries(replacements).forEach(([placeholder, value]) => {
      translation = translation
        .replace(new RegExp(`{{${placeholder}}}`, 'g'), value)
        .replace(new RegExp(`{${placeholder}}`, 'g'), value)
    })

    return translation
  }

  return {
    t,
    currentLanguage: getCurrentLanguage(),
    setLanguage,
    supportedLanguages
  }
}