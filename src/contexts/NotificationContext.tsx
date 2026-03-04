import { createContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { NotificationType } from '../types/enums'
import type { Notification } from '../lib/notification'

interface NotificationContextValue {
  notifications: Notification[]
  showNotification: (
    message: string,
    type?: NotificationType,
    options?: Partial<Omit<Notification, 'id' | 'message' | 'type'>>
  ) => string
  hideNotification: (id: string) => void
  clearAll: () => void
}

export const NotificationContext = createContext<NotificationContextValue | null>(null)

interface NotificationProviderProps {
  children: ReactNode
  maxNotifications?: number
  defaultDuration?: number
}

/**
 * Generate a unique notification ID.
 */
function generateId(): string {
  return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * NotificationProvider component that manages notifications globally.
 */
export function NotificationProvider({
  children,
  maxNotifications = 5,
  defaultDuration = 5000,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const showNotification = useCallback(
    (
      message: string,
      type: NotificationType = NotificationType.INFO,
      options: Partial<Omit<Notification, 'id' | 'message' | 'type'>> = {}
    ): string => {
      const id = generateId()
      const notification: Notification = {
        id,
        message,
        type,
        duration: defaultDuration,
        ...options,
      }

      setNotifications((prev) => {
        // Remove oldest notifications if we exceed max
        const newNotifications = [notification, ...prev]
        if (newNotifications.length > maxNotifications) {
          return newNotifications.slice(0, maxNotifications)
        }
        return newNotifications
      })

      return id
    },
    [maxNotifications, defaultDuration]
  )

  // Auto-remove notifications after their duration
  useEffect(() => {
    const timers = notifications.map((notification) => {
      if (notification.duration && notification.duration > 0) {
        return setTimeout(() => {
          hideNotification(notification.id)
        }, notification.duration)
      }
      return null
    })

    return () => {
      timers.forEach((timer) => {
        if (timer) clearTimeout(timer)
      })
    }
  }, [notifications, hideNotification])

  const value: NotificationContextValue = {
    notifications,
    showNotification,
    hideNotification,
    clearAll,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
