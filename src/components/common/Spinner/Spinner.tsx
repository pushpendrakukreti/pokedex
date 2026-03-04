import type { Size } from '../../../types/common'

interface SpinnerProps {
  size?: Size
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

const sizeClasses: Record<Size, string> = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

const colorClasses = {
  primary: 'border-blue-500',
  secondary: 'border-gray-500',
  white: 'border-white',
}

/**
 * Spinner component for loading states.
 */
export function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
  const classes = [
    'animate-spin rounded-full border-2 border-t-transparent',
    sizeClasses[size],
    colorClasses[color],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface SpinnerOverlayProps extends SpinnerProps {
  message?: string
}

/**
 * SpinnerOverlay component for full-screen loading states.
 */
export function SpinnerOverlay({ message, ...spinnerProps }: SpinnerOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <Spinner size="lg" {...spinnerProps} />
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  )
}

export default Spinner
