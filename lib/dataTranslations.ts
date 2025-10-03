// Data translation system for dynamic content
import { SupportedLanguage, useTranslation } from './i18n'

// Data translation keys and content
export const dataTranslations = {
  en: {
    // Patient Names (keeping realistic Indian names)
    'patient.name.ram_sharma': 'Ram Sharma',
    'patient.name.sunita_devi': 'Sunita Devi', 
    'patient.name.gita_devi': 'Geeta Devi',
    'patient.name.rahul_kumar': 'Rahul Kumar',
    'patient.name.ankita_singh': 'Ankita Singh',
    'patient.name.kamala_devi': 'Kamala Devi',
    'patient.name.meera_joshi': 'Meera Joshi',
    'patient.name.arjun_patel': 'Arjun Patel',
    'patient.name.priya_kumari': 'Priya Kumari',
    'patient.name.dev_singh': 'Dev Singh',
    
    // Addresses
    'address.nayagaon_sirsa': 'Village - Nayagaon, Post - Sirsa, District - Haryana - 125055',
    'address.kaithal_haryana': 'Village - Balwara, Post - Kaithal, District - Haryana - 136027',
    'address.rohtak_haryana': 'Village - Garhi, Post - Rohtak, District - Haryana - 124001',
    'address.sonipat_haryana': 'Village - Kundli, Post - Sonipat, District - Haryana - 131028',
    'address.panipat_haryana': 'Village - Samalkha, Post - Panipat, District - Haryana - 132101',
    'address.kurukshetra_haryana': 'Village - Pehowa, Post - Kurukshetra, District - Haryana - 136128',
    'address.ambala_haryana': 'Village - Jagadhri, Post - Ambala, District - Haryana - 133001',
    'address.karnal_haryana': 'Village - Assandh, Post - Karnal, District - Haryana - 132039',
    
    // Emergency Contacts
    'emergency.sunita_sharma': 'Sunita Sharma',
    'emergency.vinod_kumar': 'Vinod Kumar',
    'emergency.rajesh_devi': 'Rajesh Devi',
    'emergency.mukesh_singh': 'Mukesh Singh',
    'emergency.savita_kumari': 'Savita Kumari',
    'emergency.ravi_patel': 'Ravi Patel',
    'emergency.sudha_joshi': 'Sudha Joshi',
    'emergency.deepak_patel': 'Deepak Patel',
    'emergency.sita_devi': 'Sita Devi',
    'emergency.mahesh_singh': 'Mahesh Singh',
    
    // Conditions
    'condition.diabetes_type2': 'Type 2 Diabetes',
    'condition.hypertension': 'Hypertension',
    'condition.pregnancy': 'Pregnancy', 
    'condition.malnutrition': 'Malnutrition',
    'condition.tuberculosis': 'Tuberculosis',
    'condition.anemia': 'Anemia',
    'condition.asthma': 'Asthma',
    'condition.hypothyroidism': 'Hypothyroidism',
    
    // Medications
    'medication.metformin_500mg': 'Metformin 500mg',
    'medication.amlodipine_5mg': 'Amlodipine 5mg',
    'medication.iron_tablets': 'Iron Tablets',
    'medication.folic_acid': 'Folic Acid',
    'medication.calcium_supplements': 'Calcium Supplements',
    'medication.anti_tb_drugs': 'Anti-TB Drugs',
    'medication.salbutamol_inhaler': 'Salbutamol Inhaler',
    'medication.thyroxine_50mcg': 'Thyroxine 50mcg',
    'medication.paracetamol': 'Paracetamol',
    'medication.vitamin_d': 'Vitamin D',
    
    // Reminder Titles
    'reminder.title.bcg_vaccination': 'BCG Vaccination for {patientName}',
    'reminder.title.diabetes_checkup': 'Diabetes Check for {patientName}',
    'reminder.title.prenatal_checkup': 'Prenatal Checkup for {patientName}',
    'reminder.title.polio_drops': 'Polio Drops for {patientName}',
    'reminder.title.tb_medication': 'TB Medication for {patientName}',
    'reminder.title.blood_pressure_check': 'Blood Pressure Check for {patientName}',
    'reminder.title.antenatal_care': 'Antenatal Care for {patientName}',
    'reminder.title.tetanus_vaccination': 'Tetanus Vaccination for {patientName}',
    
    // Reminder Descriptions
    'reminder.desc.bcg_vaccination': 'BCG vaccination for newborn baby',
    'reminder.desc.diabetes_checkup': 'Monthly blood sugar monitoring',
    'reminder.desc.prenatal_checkup': 'Regular checkup for second trimester',
    'reminder.desc.polio_drops': 'Second dose of polio drops',
    'reminder.desc.tb_medication': 'Monthly supply of TB medications',
    'reminder.desc.blood_pressure_check': 'High BP monitoring',
    'reminder.desc.antenatal_care': 'Third trimester checkup',
    'reminder.desc.tetanus_vaccination': 'Tetanus booster for school',
    
    // Doctor Names
    'doctor.raj_kumar': 'Dr. Raj Kumar',
    'doctor.priya_agrawal': 'Dr. Priya Agrawal',
    'doctor.suresh_gupta': 'Dr. Suresh Gupta',
    'doctor.kavita_sharma': 'Dr. Kavita Sharma',
    'doctor.amit_singh': 'Dr. Amit Singh',
    'doctor.neha_patel': 'Dr. Neha Patel',
    'doctor.ravi_joshi': 'Dr. Ravi Joshi',
    'doctor.sunita_verma': 'Dr. Sunita Verma',
    
    // Specialties
    'specialty.general_medicine': 'General Medicine',
    'specialty.gynecology': 'Gynecology & Obstetrics',
    'specialty.pediatrics': 'Pediatrics',
    'specialty.cardiology': 'Cardiology',
    'specialty.orthopedics': 'Orthopedics',
    'specialty.ent': 'ENT',
    'specialty.dermatology': 'Dermatology',
    'specialty.endocrinology': 'Endocrinology',
    
    // Notes
    'notes.regular_monitoring': 'Requires regular monitoring. Follow up every month.',
    'notes.first_pregnancy': 'First pregnancy, needs extra care and monitoring.',
    'notes.delayed_milestones': 'Some developmental milestones delayed, needs attention.',
    'notes.medication_compliance': 'Good medication compliance. Continue current treatment.',
    'notes.tb_treatment': 'On TB treatment, ensure medicine compliance.',
    'notes.high_bp': 'Blood pressure needs regular monitoring.',
    'notes.normal_pregnancy': 'Normal pregnancy progression, regular checkups needed.',
    'notes.school_health': 'Regular school health checkup required.'
  },
  
  hi: {
    // Patient Names (same as they are proper names)
    'patient.name.ram_sharma': 'राम शर्मा',
    'patient.name.sunita_devi': 'सुनीता देवी',
    'patient.name.gita_devi': 'गीता देवी',
    'patient.name.rahul_kumar': 'राहुल कुमार',
    'patient.name.ankita_singh': 'अंकिता सिंह',
    'patient.name.kamala_devi': 'कमला देवी',
    'patient.name.meera_joshi': 'मीरा जोशी',
    'patient.name.arjun_patel': 'अर्जुन पटेल',
    'patient.name.priya_kumari': 'प्रिया कुमारी',
    'patient.name.dev_singh': 'देव सिंह',
    
    // Addresses
    'address.nayagaon_sirsa': 'गांव - नयागांव, पोस्ट - सिरसा, जिला - हरियाणा - 125055',
    'address.kaithal_haryana': 'गांव - बलवाड़ा, पोस्ट - कैथल, जिला - हरियाणा - 136027',
    'address.rohtak_haryana': 'गांव - गढ़ी, पोस्ट - रोहतक, जिला - हरियाणा - 124001',
    'address.sonipat_haryana': 'गांव - कुंडली, पोस्ट - सोनीपत, जिला - हरियाणा - 131028',
    'address.panipat_haryana': 'गांव - समालखा, पोस्ट - पानीपत, जिला - हरियाणा - 132101',
    'address.kurukshetra_haryana': 'गांव - पेहोवा, पोस्ट - कुरुक्षेत्र, जिला - हरियाणा - 136128',
    'address.ambala_haryana': 'गांव - जगाधरी, पोस्ट - अंबाला, जिला - हरियाणा - 133001',
    'address.karnal_haryana': 'गांव - आसन्ध, पोस्ट - करनाल, जिला - हरियाणा - 132039',
    
    // Emergency Contacts
    'emergency.sunita_sharma': 'सुनीता शर्मा',
    'emergency.vinod_kumar': 'विनोद कुमार',
    'emergency.rajesh_devi': 'राजेश देवी',
    'emergency.mukesh_singh': 'मुकेश सिंह',
    'emergency.savita_kumari': 'सविता कुमारी',
    'emergency.ravi_patel': 'रवि पटेल',
    'emergency.sudha_joshi': 'सुधा जोशी',
    'emergency.deepak_patel': 'दीपक पटेल',
    'emergency.sita_devi': 'सीता देवी',
    'emergency.mahesh_singh': 'महेश सिंह',
    
    // Conditions
    'condition.diabetes_type2': 'मधुमेह टाइप 2',
    'condition.hypertension': 'उच्च रक्तचाप',
    'condition.pregnancy': 'गर्भावस्था',
    'condition.malnutrition': 'कुपोषण',
    'condition.tuberculosis': 'तपेदिक',
    'condition.anemia': 'एनीमिया',
    'condition.asthma': 'दमा',
    'condition.hypothyroidism': 'हाइपोथायरायडिज्म',
    
    // Medications  
    'medication.metformin_500mg': 'मेटफॉर्मिन 500mg',
    'medication.amlodipine_5mg': 'एम्लोडिपाइन 5mg',
    'medication.iron_tablets': 'आयरन की गोलियां',
    'medication.folic_acid': 'फोलिक एसिड',
    'medication.calcium_supplements': 'कैल्शियम की गोलियां',
    'medication.anti_tb_drugs': 'TB की दवाएं',
    'medication.salbutamol_inhaler': 'साल्ब्यूटामॉल इन्हेलर',
    'medication.thyroxine_50mcg': 'थायरोक्सिन 50mcg',
    'medication.paracetamol': 'पैरासिटामॉल',
    'medication.vitamin_d': 'विटामिन डी',
    
    // Reminder Titles
    'reminder.title.bcg_vaccination': '{patientName} का BCG टीकाकरण',
    'reminder.title.diabetes_checkup': '{patientName} की मधुमेह जांच',
    'reminder.title.prenatal_checkup': '{patientName} की प्रसव पूर्व जांच',
    'reminder.title.polio_drops': '{patientName} की पोलियो ड्रॉप्स',
    'reminder.title.tb_medication': '{patientName} की TB दवा',
    'reminder.title.blood_pressure_check': '{patientName} का blood pressure चेकअप',
    'reminder.title.antenatal_care': '{patientName} की जन्म पूर्व देखभाल',
    'reminder.title.tetanus_vaccination': '{patientName} का टेटनस का टीका',
    
    // Reminder Descriptions
    'reminder.desc.bcg_vaccination': 'नवजात शिशु के लिए BCG का टीका',
    'reminder.desc.diabetes_checkup': 'मासिक रक्त शर्करा जांच',
    'reminder.desc.prenatal_checkup': 'दूसरी तिमाही की नियमित जांच',
    'reminder.desc.polio_drops': 'पोलियो की दूसरी खुराक',
    'reminder.desc.tb_medication': 'मासिक TB दवाओं की सप्लाई',
    'reminder.desc.blood_pressure_check': 'हाई BP की मॉनिटरिंग',
    'reminder.desc.antenatal_care': 'तीसरी तिमाही की जांच',
    'reminder.desc.tetanus_vaccination': 'स्कूल के लिए टेटनस बूस्टर',
    
    // Doctor Names
    'doctor.raj_kumar': 'डॉ. राज कुमार',
    'doctor.priya_agrawal': 'डॉ. प्रिया अग्रवाल',
    'doctor.suresh_gupta': 'डॉ. सुरेश गुप्ता',
    'doctor.kavita_sharma': 'डॉ. कविता शर्मा',
    'doctor.amit_singh': 'डॉ. अमित सिंह',
    'doctor.neha_patel': 'डॉ. नेहा पटेल',
    'doctor.ravi_joshi': 'डॉ. रवि जोशी',
    'doctor.sunita_verma': 'डॉ. सुनीता वर्मा',
    
    // Specialties
    'specialty.general_medicine': 'सामान्य चिकित्सा',
    'specialty.gynecology': 'स्त्री रोग और प्रसूति',
    'specialty.pediatrics': 'बाल चिकित्सा',
    'specialty.cardiology': 'हृदय रोग',
    'specialty.orthopedics': 'हड्डी रोग',
    'specialty.ent': 'कान, नाक, गला',
    'specialty.dermatology': 'त्वचा रोग',
    'specialty.endocrinology': 'अंतःस्राव विज्ञान',
    
    // Notes
    'notes.regular_monitoring': 'नियमित निगरानी की आवश्यकता है। हर महीने फॉलो अप करें।',
    'notes.first_pregnancy': 'पहली गर्भावस्था, अतिरिक्त देखभाल और निगरानी की जरूरत।',
    'notes.delayed_milestones': 'कुछ विकास मील के पत्थर में देरी, ध्यान देने की जरूरत।',
    'notes.medication_compliance': 'दवाओं का अच्छा पालन। वर्तमान उपचार जारी रखें।',
    'notes.tb_treatment': 'TB के इलाज में है, दवा का पालन सुनिश्चित करें।',
    'notes.high_bp': 'रक्तचाप की नियमित निगरानी की जरूरत।',
    'notes.normal_pregnancy': 'गर्भावस्था सामान्य रूप से बढ़ रही है, नियमित जांच की जरूरत।',
    'notes.school_health': 'नियमित स्कूल स्वास्थ्य जांच की आवश्यकता।'
  },
  
  te: {
    // Patient Names
    'patient.name.ram_sharma': 'రామ్ శర్మ',
    'patient.name.sunita_devi': 'సునీతా దేవి',
    'patient.name.gita_devi': 'గీతా దేవి',
    'patient.name.rahul_kumar': 'రాహుల్ కుమార్',
    'patient.name.ankita_singh': 'అంకిత సింగ్',
    'patient.name.kamala_devi': 'కమలా దేవి',
    'patient.name.meera_joshi': 'మీరా జోషి',
    'patient.name.arjun_patel': 'అర్జున్ పటేల్',
    'patient.name.priya_kumari': 'ప్రియా కుమారి',
    'patient.name.dev_singh': 'దేవ్ సింగ్',
    
    // Conditions
    'condition.diabetes_type2': 'టైప్ 2 మధుమేహం',
    'condition.hypertension': 'అధిక రక్తపోటు',
    'condition.pregnancy': 'గర్భధారణ',
    'condition.malnutrition': 'పోషకాహార లోపం',
    'condition.tuberculosis': 'క్షయవ్యాధి',
    'condition.anemia': 'రక్తహీనత',
    'condition.asthma': 'ఆస్తమా',
    'condition.hypothyroidism': 'హైపోథైరాయిడిజం',
    
    // Reminder Titles
    'reminder.title.bcg_vaccination': '{patientName} కు BCG వ్యాక్సినేషన్',
    'reminder.title.diabetes_checkup': '{patientName} కు మధుమేహ పరీక్ష',
    'reminder.title.prenatal_checkup': '{patientName} కు ప్రసవ పూర్వ పరీక్ష',
    'reminder.title.polio_drops': '{patientName} కు పోలియో చుక్కలు',
    'reminder.title.tb_medication': '{patientName} కు TB మందులు',
    'reminder.title.blood_pressure_check': '{patientName} కు రక్తపోటు పరీక్ష',
    'reminder.title.antenatal_care': '{patientName} కు జన్మ పూర్వ సంరక్షణ',
    'reminder.title.tetanus_vaccination': '{patientName} కు టెటనస్ వ్యాక్సినేషన్',
    
    // Add more Telugu translations as needed...
  }
} as const

export type DataTranslationKey = keyof typeof dataTranslations.en

// Hook for translating data content
export const useDataTranslation = () => {
  const getCurrentLanguage = (): SupportedLanguage => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as SupportedLanguage) || 'en'
    }
    return 'en'
  }

  const td = (key: string, replacements: Record<string, string> = {}): string => {
    const language = getCurrentLanguage()
    
    let translation = ''
    
    if (language === 'hi' && dataTranslations.hi[key as keyof typeof dataTranslations.hi]) {
      translation = dataTranslations.hi[key as keyof typeof dataTranslations.hi] as string
    } else if (language === 'te' && dataTranslations.te[key as keyof typeof dataTranslations.te]) {
      translation = dataTranslations.te[key as keyof typeof dataTranslations.te] as string
    } else {
      translation = dataTranslations.en[key as keyof typeof dataTranslations.en] as string || key
    }
    
    // Replace placeholders like {patientName}
    Object.entries(replacements).forEach(([placeholder, value]) => {
      translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), value)
    })
    
    return translation
  }

  return { td }
}