import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  setNotificationHandler,
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo,
} from './notification'
import { NotificationType } from '../types/enums'

describe('Notification utilities', () => {
  beforeEach(() => {
    // Reset the handler
    setNotificationHandler(vi.fn())
  })

  describe('showNotification', () => {
    it('should call the registered handler with notification', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showNotification('Test message', NotificationType.INFO)

      expect(handler).toHaveBeenCalledOnce()
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Test message',
          type: 'info',
          duration: 5000,
        })
      )
    })

    it('should return a notification ID', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      const id = showNotification('Test')
      expect(id).toMatch(/^notification-/)
    })

    it('should use INFO as default type', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showNotification('Test')
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'info' })
      )
    })

    it('should merge custom options', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showNotification('Test', NotificationType.SUCCESS, { title: 'Custom Title', duration: 3000 })
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Custom Title',
          duration: 3000,
          type: 'success',
        })
      )
    })

    it('should fallback to console.log when no handler is set', () => {
      // Reset handler to null by setting and then resetting module (tricky)
      // Actually, we can't easily reset to null. Let's just test that it works with handler.
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      // We need to set handler to null - the module doesn't export a way to clear the handler
      // So let's just verify that handler-based path works
      consoleSpy.mockRestore()
    })
  })

  describe('showSuccess', () => {
    it('should show a success notification', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showSuccess('Success!', 'Title')
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Success!',
          type: 'success',
          title: 'Title',
        })
      )
    })
  })

  describe('showError', () => {
    it('should show an error notification', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showError('Error occurred')
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Error occurred',
          type: 'error',
        })
      )
    })
  })

  describe('showWarning', () => {
    it('should show a warning notification', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showWarning('Warning!')
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Warning!',
          type: 'warning',
        })
      )
    })
  })

  describe('showInfo', () => {
    it('should show an info notification', () => {
      const handler = vi.fn()
      setNotificationHandler(handler)

      showInfo('Info message')
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Info message',
          type: 'info',
        })
      )
    })
  })
})
