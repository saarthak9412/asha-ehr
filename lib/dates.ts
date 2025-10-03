// Dynamic date utilities for live-looking data
export const getToday = () => new Date()

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const getDynamicDate = (offsetDays: number = 0) => {
  return formatDate(addDays(getToday(), offsetDays))
}

// Generate relative dates that always look recent/upcoming
export const getDynamicDates = () => {
  const today = getToday()
  
  return {
    today: formatDate(today),
    tomorrow: formatDate(addDays(today, 1)),
    dayAfterTomorrow: formatDate(addDays(today, 2)),
    inAWeek: formatDate(addDays(today, 7)),
    inTwoWeeks: formatDate(addDays(today, 14)),
    inThreeWeeks: formatDate(addDays(today, 21)),
    inAMonth: formatDate(addDays(today, 30)),
    lastWeek: formatDate(addDays(today, -7)),
    yesterday: formatDate(addDays(today, -1)),
    threeDaysAgo: formatDate(addDays(today, -3)),
    fiveDaysAgo: formatDate(addDays(today, -5)),
    tenDaysAgo: formatDate(addDays(today, -10))
  }
}

export const formatDisplayDate = (dateString: string, locale: string = 'en') => {
  const date = new Date(dateString)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  
  return date.toLocaleDateString(locale, options)
}

export const formatDisplayDateTime = (dateString: string, locale: string = 'en') => {
  const date = new Date(dateString)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return date.toLocaleDateString(locale, options)
}