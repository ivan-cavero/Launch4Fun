import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export const getLocalDateTimeFormat = () => {
  try {
    const sampleDate = new Date(2000, 11, 2, 13, 45) // "2000-12-02 13:45:00"
    const formatted = new Intl.DateTimeFormat().format(sampleDate)

    if (/2.+12.+2000/.test(formatted)) return 'dd/MM/yyyy HH:mm'
    if (/12.+2.+2000/.test(formatted)) return 'MM/dd/yyyy HH:mm'
    if (/2000.+12.+2/.test(formatted)) return 'yyyy/MM/dd HH:mm'
  } catch (error) {
    console.error('Error detecting date format:', error)
  }

  return 'MM/dd/yyyy HH:mm' // Default format
}

export const formatDateToLocal = (dateString, formatDate) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localDate = toZonedTime(new Date(dateString), timeZone)
  const formatPreference = formatDate || getLocalDateTimeFormat()
  return format(localDate, formatPreference)
}
