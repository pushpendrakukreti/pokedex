import { useContext, useCallback } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import { NotificationType } from '../types/enums'

/**
 * Hook to access notification context and show notifications.
 */
export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }

  const { showNotification, hideNotification, clearAll, notifications } = context

  const success = useCallback(
    (message: string, title?: string) => {
      return showNotification(message, NotificationType.SUCCESS, { title })
    },
    [showNotification]
  )

  const error = useCallback(
    (message: string, title?: string) => {
      return showNotification(message, NotificationType.ERROR, { title })
    },
    [showNotification]
  )

  const warning = useCallback(
    (message: string, title?: string) => {
      return showNotification(message, NotificationType.WARNING, { title })
    },
    [showNotification]
  )

  const info = useCallback(
    (message: string, title?: string) => {
      return showNotification(message, NotificationType.INFO, { title })
    },
    [showNotification]
  )

  return {
    notifications,
    showNotification,
    hideNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  }
}
