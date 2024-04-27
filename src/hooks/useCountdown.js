import { differenceInSeconds, isPast } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import i18nManager from '@/locales'

export const useCountdown = (utcDate) => {
  const i18n = i18nManager.getInstance()
  const [countdown, setCountdown] = useState('')
  const storedLanguage =  useSelector(state => state.user.preferences.language)

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (3600 * 24))
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    let result = ''
    if (days > 0) {
      result += `${days}d`
    } else if (hours > 0) {
      result += `${hours}h `
      if (minutes > 0) {
        result += `${minutes}m`
      }
    } else if (minutes > 0) {
      result += `${minutes}m `
      if (seconds > 0) {
        result += `${seconds}s`
      }
    } else {
      result += `${seconds}s`
    }

    return result.trim()
  }

  useEffect(() => {
    const updateCountdown = () => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const zonedDate = toZonedTime(utcDate, userTimezone)
      const totalSeconds = Math.abs(differenceInSeconds(new Date(), zonedDate))
      const past = isPast(zonedDate)

      if (storedLanguage === 'en-US') {
        setCountdown(`${past ? '' : i18n.t('inCountDown')} ${formatTime(totalSeconds)} ${past ? i18n.t('agoCountDown') : ''}`)
      } else {
        setCountdown(`${past ? '' : i18n.t('inCountDown')}${past ? i18n.t('agoCountDown') : ''} ${formatTime(totalSeconds)}`)
      }
    }

    updateCountdown()

    let interval
    if (countdown.includes('h') || countdown.includes('m') || countdown.includes('s')) {
      interval = setInterval(updateCountdown, 1000) // Update every second
    } else {
      interval = setInterval(updateCountdown, 60 * 1000) // Update every minute
    }

    return () => clearInterval(interval)
  }, [countdown, formatTime, utcDate, i18n.t, storedLanguage])

  return countdown
}
