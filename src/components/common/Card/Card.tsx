import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  hoverable?: boolean
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

/**
 * Card component for displaying content in a contained box.
 */
export function Card({
  children,
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    'bg-white',
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    hoverable ? 'transition-shadow duration-300 hover:shadow-xl cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

/**
 * CardHeader component for the top section of a Card.
 */
export function CardHeader({ children, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

/**
 * CardBody component for the main content of a Card.
 */
export function CardBody({ children, className = '', ...props }: CardBodyProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

/**
 * CardFooter component for the bottom section of a Card.
 */
export function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
