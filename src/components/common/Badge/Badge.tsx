import type { Variant, Size } from '../../../types/common'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  rounded?: boolean
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-cyan-100 text-cyan-800',
}

const sizeClasses: Record<Size, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
  xl: 'px-4 py-1 text-base',
}

/**
 * Badge component for labels and status indicators.
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  rounded = true,
  className = '',
}: BadgeProps) {
  const classes = [
    'inline-flex items-center font-medium',
    variantClasses[variant],
    sizeClasses[size],
    rounded ? 'rounded-full' : 'rounded',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}

export default Badge
