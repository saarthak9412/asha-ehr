'use client'

import React from 'react'
import { useDataTranslation } from '@/lib/dataTranslations'
import { Patient, Doctor, Reminder } from '@/lib/data'

// Helper functions to translate data objects
export const translatePatientData = (patient: Patient, td: (key: string, replacements?: Record<string, string>) => string): Patient => {
  return {
    ...patient,
    name: td(patient.name as string),
    address: td(patient.address as string),
    conditions: patient.conditions.map(condition => td(condition as string)),
    medications: patient.medications.map(medication => td(medication as string)),
    notes: td(patient.notes as string),
    emergencyContact: {
      ...patient.emergencyContact,
      name: td(patient.emergencyContact.name as string),
      relation: td(patient.emergencyContact.relation as string)
    }
  }
}

export const translateDoctorData = (doctor: Doctor, td: (key: string, replacements?: Record<string, string>) => string): Doctor => {
  return {
    ...doctor,
    name: td(doctor.name as string),
    specialty: td(doctor.specialty as string)
  }
}

export const translateReminderData = (reminder: Reminder, td: (key: string, replacements?: Record<string, string>) => string, patientName?: string): Reminder => {
  return {
    ...reminder,
    title: td(reminder.title as string, patientName ? { patientName } : {}),
    description: td(reminder.description as string),
    assignedBy: reminder.assignedBy ? td(reminder.assignedBy as string) : reminder.assignedBy
  }
}

// Hook that provides translated data
export const useTranslatedData = () => {
  const { td } = useDataTranslation()

  return {
    translatePatient: (patient: Patient) => translatePatientData(patient, td),
    translateDoctor: (doctor: Doctor) => translateDoctorData(doctor, td),
    translateReminder: (reminder: Reminder, patientName?: string) => translateReminderData(reminder, td, patientName),
    td
  }
}