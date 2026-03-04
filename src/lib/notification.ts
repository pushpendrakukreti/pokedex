import { NotificationType } from '../types/enums'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  title?: string
  duration?: number
}

type NotificationCallback = (notification: Notification) => void

let notificationCallback: NotificationCallback | null = null

/**
 * Set the notification handler (should be called by NotificationProvider).
 */
export function setNotificationHandler(callback: NotificationCallback): void {
  notificationCallback = callback
}

/**
 * Generate a unique notification ID.
 */
function generateId(): string {
  return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Show a notification.
 */
export function showNotification(
  message: string,
  type: NotificationType = NotificationType.INFO,
  options: Partial<Omit<Notification, 'id' | 'message' | 'type'>> = {}
): string {
  const notification: Notification = {
    id: generateId(),
    message,
    type,
    duration: 5000,
    ...options,
  }

  if (notificationCallback) {
    notificationCallback(notification)
  } else {
    // Fallback to console if no handler is registered
    console.log(`[${type.toUpperCase()}] ${notification.title || ''} ${message}`)
  }

  return notification.id
}

/**
 * Show a success notification.
 */
export function showSuccess(message: string, title?: string): string {
  return showNotification(message, NotificationType.SUCCESS, { title })
}

/**
 * Show an error notification.
 */
export function showError(message: string, title?: string): string {
  return showNotification(message, NotificationType.ERROR, { title })
}

/**
 * Show a warning notification.
 */
export function showWarning(message: string, title?: string): string {
  return showNotification(message, NotificationType.WARNING, { title })
}

/**
 * Show an info notification.
 */
export function showInfo(message: string, title?: string): string {
  return showNotification(message, NotificationType.INFO, { title })
}

export default {
  show: showNotification,
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  setHandler: setNotificationHandler,
}
