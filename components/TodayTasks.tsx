'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useReminders, usePatients } from '@/lib/data'
import { useTranslation } from '@/lib/i18n'
import { useTranslatedData } from '@/lib/dataHelpers'
import { getDynamicDate } from '@/lib/dates'
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertTriangle,
  Stethoscope,
  Syringe,
  Heart,
  Pill
} from 'lucide-react'
import Link from 'next/link'

export default function TodayTasks() {
  const { t } = useTranslation()
  const { reminders } = useReminders()
  const { patients } = usePatients()
  const { translateReminder, translatePatient } = useTranslatedData()
  const today = getDynamicDate(0)
  
  // Get today's reminders
  const todayReminders = reminders.filter((reminder: any) => 
    reminder.dueDate === today && reminder.status === 'pending'
  )
  
  // Get overdue reminders
  const overdueReminders = reminders.filter((reminder: any) => {
    const reminderDate = new Date(reminder.dueDate)
    const todayDate = new Date(today)
    return reminderDate < todayDate && reminder.status === 'pending'
  })

  const allTodayTasks = [...todayReminders, ...overdueReminders]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vaccination': return Syringe
      case 'checkup': return Stethoscope
      case 'medication': return Pill
      case 'followup': return Heart
      default: return Calendar
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date(today)
  }

  if (allTodayTasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{t('todayTasks')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">{t('noTasksToday')}</p>
          <p className="text-sm text-gray-500 mt-1">{t('greatWork')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{t('todayTasks')}</span>
          </div>
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
            {allTodayTasks.length} {t('tasks')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {allTodayTasks.slice(0, 5).map((reminder, index) => {
          const TypeIcon = getTypeIcon(reminder.type)
          const isTaskOverdue = isOverdue(reminder.dueDate)
          
          // Get patient for this reminder
          const patient = reminder.patientId ? patients.find(p => p.id === reminder.patientId) : null
          const translatedPatient = patient ? translatePatient(patient) : null
          
          // Translate the reminder data with patient name
          const translatedReminder = translateReminder(reminder, translatedPatient?.name)
          
          return (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-md transition-all cursor-pointer ${
                isTaskOverdue ? 'border-red-200 bg-red-50/50' : 'border-gray-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isTaskOverdue ? 'bg-red-100' : 'bg-primary/10'
                    }`}>
                      <TypeIcon className={`w-5 h-5 ${
                        isTaskOverdue ? 'text-red-600' : 'text-primary'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(reminder.priority)}`}>
                          {reminder.priority}
                        </span>
                        {isTaskOverdue && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {t('overdue')}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-1">
                        {translatedReminder.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {translatedReminder.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{reminder.dueDate}</span>
                        </div>
                        
                        {reminder.patientId && (
                          <Link 
                            href={`/patients/${reminder.patientId}`}
                            className="flex items-center space-x-1 text-xs text-primary hover:underline"
                          >
                            <User className="w-3 h-3" />
                            <span>{t('patient')}</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
        
        {allTodayTasks.length > 5 && (
          <div className="text-center pt-2">
            <Link href="/reminders">
              <Button variant="outline" size="sm">
                {t('viewAll')} ({allTodayTasks.length - 5} {t('more')})
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}