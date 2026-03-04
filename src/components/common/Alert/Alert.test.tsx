import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from './Alert'

describe('Alert', () => {
  it('should render children', () => {
    render(<Alert>Alert message</Alert>)
    expect(screen.getByText('Alert message')).toBeInTheDocument()
  })

  it('should have alert role', () => {
    render(<Alert>Message</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should render title when provided', () => {
    render(<Alert title="Warning">Some message</Alert>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('should apply variant styles', () => {
    render(<Alert variant="error">Error</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-red-50')
  })

  it('should render dismiss button when dismissible', () => {
    render(<Alert dismissible>Dismissible</Alert>)
    expect(screen.getByLabelText('Dismiss')).toBeInTheDocument()
  })

  it('should call onDismiss when dismissed', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismiss me
      </Alert>
    )

    await user.click(screen.getByLabelText('Dismiss'))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('should hide alert when dismissed', async () => {
    const user = userEvent.setup()
    render(<Alert dismissible>Dismiss me</Alert>)

    await user.click(screen.getByLabelText('Dismiss'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should auto-close after specified duration', async () => {
    vi.useFakeTimers()
    const onDismiss = vi.fn()
    render(
      <Alert autoClose={1000} onDismiss={onDismiss}>
        Auto close
      </Alert>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(onDismiss).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('should render custom icon', () => {
    render(<Alert icon={<span data-testid="custom-icon">!</span>}>Message</Alert>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Alert className="my-alert">Message</Alert>)
    expect(screen.getByRole('alert')).toHaveClass('my-alert')
  })
})
