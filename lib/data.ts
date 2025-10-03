import { useState, useEffect } from 'react'
import { getDynamicDates, getDynamicDate } from './dates'

const dynamicDates = getDynamicDates()

export interface Patient {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female'
  phone: string
  address: string
  bloodGroup: string
  conditions: string[]
  medications: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  lastVisit: string
  nextVisit?: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  vitals: {
    bp: string
    pulse: string
    temperature: string
    weight: string
    height: string
    bmi?: string
    lastUpdated: string
  }
  notes: string
  immunizations?: {
    vaccine: string
    date: string
    nextDue?: string
    status: 'completed' | 'due' | 'overdue'
  }[]
  pregnancyInfo?: {
    isPregnant: boolean
    edd?: string
    trimester?: number
    complications?: string[]
  }
  childInfo?: {
    motherName?: string
    birthWeight?: string
    developmentMilestones?: {
      milestone: string
      expectedAge: string
      achieved: boolean
      achievedDate?: string
    }[]
  }
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  phone: string
  location: string
  availability: string
  experience: string
  qualification: string
}

export interface Reminder {
  id: string
  patientId?: string
  title: string
  description: string
  type: 'vaccination' | 'checkup' | 'medication' | 'followup' | 'screening' | 'consultation'
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  status: 'pending' | 'completed' | 'overdue'
  assignedBy?: string
}

// Sample data with translation keys instead of hardcoded text
const defaultPatients: Patient[] = [
  {
    id: 'pat-001',
    name: 'patient.name.ram_sharma',
    age: 45,
    gender: 'Male',
    phone: '+91 98765-43210',
    address: 'address.nayagaon_sirsa',
    bloodGroup: 'B+',
    conditions: ['condition.diabetes_type2', 'condition.hypertension'],
    medications: ['medication.metformin_500mg', 'medication.amlodipine_5mg'],
    riskLevel: 'High',
    lastVisit: dynamicDates.fiveDaysAgo,
    nextVisit: dynamicDates.inThreeWeeks,
    emergencyContact: {
      name: 'emergency.sunita_sharma',
      phone: '+91 98765-43211',
      relation: 'Wife'
    },
    vitals: {
      bp: '150/95 mmHg',
      pulse: '85 bpm',
      temperature: '98.6°F',
      weight: '72 kg',
      height: '5\'8"',
      bmi: '24.2',
      lastUpdated: dynamicDates.fiveDaysAgo
    },
    notes: 'notes.regular_monitoring'
  },
  {
    id: 'pat-002',
    name: 'patient.name.sunita_devi',
    age: 28,
    gender: 'Female',
    phone: '+91 98765-43220',
    address: 'address.kaithal_haryana',
    bloodGroup: 'O+',
    conditions: ['condition.pregnancy'],
    medications: ['medication.iron_tablets', 'medication.folic_acid', 'medication.calcium_supplements'],
    riskLevel: 'Medium',
    lastVisit: dynamicDates.threeDaysAgo,
    nextVisit: dynamicDates.inTwoWeeks,
    emergencyContact: {
      name: 'emergency.vinod_kumar',
      phone: '+91 98765-43221',
      relation: 'Husband'
    },
    vitals: {
      bp: '120/80 mmHg',
      pulse: '75 bpm',
      temperature: '98.6°F',
      weight: '58 kg',
      height: '5\'4"',
      bmi: '21.5',
      lastUpdated: dynamicDates.threeDaysAgo
    },
    pregnancyInfo: {
      isPregnant: true,
      edd: dynamicDates.inAMonth,
      trimester: 2,
      complications: []
    },
    notes: 'notes.first_pregnancy'
  },
  {
    id: 'pat-003',
    name: 'patient.name.gita_devi',
    age: 30,
    gender: 'Female',
    phone: '+91 98765-43230',
    address: 'address.rohtak_haryana',
    bloodGroup: 'A+',
    conditions: ['condition.pregnancy'],
    medications: ['medication.iron_tablets', 'medication.folic_acid'],
    riskLevel: 'High',
    lastVisit: dynamicDates.tenDaysAgo,
    nextVisit: dynamicDates.tomorrow,
    emergencyContact: {
      name: 'emergency.rajesh_devi',
      phone: '+91 98765-43231',
      relation: 'Mother-in-law'
    },
    vitals: {
      bp: '140/90 mmHg',
      pulse: '88 bpm',
      temperature: '99.1°F',
      weight: '65 kg',
      height: '5\'5"',
      bmi: '23.8',
      lastUpdated: dynamicDates.tenDaysAgo
    },
    pregnancyInfo: {
      isPregnant: true,
      edd: dynamicDates.inThreeWeeks,
      trimester: 3,
      complications: ['Gestational Hypertension']
    },
    notes: 'notes.high_bp'
  }
]

const defaultDoctors: Doctor[] = [
  {
    id: 'doc-001',
    name: 'doctor.raj_kumar',
    specialty: 'specialty.general_medicine',
    phone: '+91 98765-54321',
    location: 'PHC Sirsa',
    availability: 'Mon-Fri: 9 AM - 5 PM',
    experience: '15 years',
    qualification: 'MBBS, MD'
  },
  {
    id: 'doc-002',
    name: 'doctor.priya_agrawal',
    specialty: 'specialty.gynecology',
    phone: '+91 98765-54322',
    location: 'District Hospital Kaithal',
    availability: 'Mon-Sat: 10 AM - 6 PM',
    experience: '12 years',
    qualification: 'MBBS, MS (Gynecology)'
  }
]

const defaultReminders: Reminder[] = [
  {
    id: 'rem-001',
    title: 'reminder.title.bcg_vaccination',
    description: 'reminder.desc.bcg_vaccination',
    dueDate: dynamicDates.today,
    priority: 'high',
    status: 'pending',
    type: 'vaccination',
    patientId: 'pat-001',
    assignedBy: 'doctor.raj_kumar'
  },
  {
    id: 'rem-002', 
    title: 'reminder.title.diabetes_checkup',
    description: 'reminder.desc.diabetes_checkup',
    dueDate: dynamicDates.tomorrow,
    priority: 'medium',
    status: 'pending',
    type: 'checkup',
    patientId: 'pat-002',
    assignedBy: 'doctor.priya_agrawal'
  },
  {
    id: 'rem-003',
    title: 'reminder.title.prenatal_checkup',
    description: 'reminder.desc.prenatal_checkup',
    dueDate: dynamicDates.dayAfterTomorrow,
    priority: 'high',
    status: 'pending',
    type: 'checkup',
    patientId: 'pat-003',
    assignedBy: 'doctor.priya_agrawal'
  }
]

// Custom hooks for data management
export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('patients')
    if (stored) {
      setPatients(JSON.parse(stored))
    } else {
      setPatients(defaultPatients)
      localStorage.setItem('patients', JSON.stringify(defaultPatients))
    }
  }, [])

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient = {
      ...patient,
      id: `pat-${Date.now()}`
    }
    const updatedPatients = [...patients, newPatient]
    setPatients(updatedPatients)
    localStorage.setItem('patients', JSON.stringify(updatedPatients))
    return newPatient
  }

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    const updatedPatients = patients.map(p => p.id === id ? { ...p, ...updates } : p)
    setPatients(updatedPatients)
    localStorage.setItem('patients', JSON.stringify(updatedPatients))
  }

  const getPatient = (id: string) => {
    return patients.find(p => p.id === id)
  }

  return {
    patients,
    addPatient,
    updatePatient,
    getPatient
  }
}

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('doctors')
    if (stored) {
      setDoctors(JSON.parse(stored))
    } else {
      setDoctors(defaultDoctors)
      localStorage.setItem('doctors', JSON.stringify(defaultDoctors))
    }
  }, [])

  return { doctors }
}

export const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('reminders')
    if (stored) {
      setReminders(JSON.parse(stored))
    } else {
      setReminders(defaultReminders)
      localStorage.setItem('reminders', JSON.stringify(defaultReminders))
    }
  }, [])

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: `rem-${Date.now()}`
    }
    const updatedReminders = [...reminders, newReminder]
    setReminders(updatedReminders)
    localStorage.setItem('reminders', JSON.stringify(updatedReminders))
    return newReminder
  }

  const updateReminderStatus = (id: string, status: Reminder['status']) => {
    const updatedReminders = reminders.map(r => 
      r.id === id ? { ...r, status } : r
    )
    setReminders(updatedReminders)
    localStorage.setItem('reminders', JSON.stringify(updatedReminders))
  }

  return {
    reminders,
    addReminder,
    updateReminderStatus
  }
}