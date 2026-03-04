import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import type { Variant, Size } from '../../../types/common'

type LinkVariant = Variant | 'default'

interface BaseLinkProps {
  variant?: LinkVariant
  size?: Size
  underline?: 'none' | 'hover' | 'always'
  external?: boolean
}

type InternalLinkProps = BaseLinkProps & RouterLinkProps
type ExternalLinkProps = BaseLinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type CustomLinkProps = InternalLinkProps | ExternalLinkProps

const variantClasses: Record<LinkVariant, string> = {
  default: 'text-blue-500 hover:text-blue-700',
  primary: 'text-blue-500 hover:text-blue-700',
  secondary: 'text-gray-600 hover:text-gray-800',
  success: 'text-green-500 hover:text-green-700',
  warning: 'text-yellow-600 hover:text-yellow-800',
  error: 'text-red-500 hover:text-red-700',
  info: 'text-cyan-500 hover:text-cyan-700',
}

const sizeClasses: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const underlineClasses = {
  none: 'no-underline',
  hover: 'no-underline hover:underline',
  always: 'underline',
}

/**
 * Check if the link is external
 */
function isExternalLink(props: CustomLinkProps): props is ExternalLinkProps {
  return 'href' in props && typeof props.href === 'string'
}

/**
 * Link component that handles both internal and external links.
 */
export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>((props, ref) => {
  const {
    variant = 'default',
    size = 'md',
    underline = 'hover',
    external = false,
    className = '',
    children,
    ...rest
  } = props

  const classes = [
    'transition-colors inline-flex items-center',
    variantClasses[variant],
    sizeClasses[size],
    underlineClasses[underline],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (isExternalLink(props) || external) {
    const { href, ...anchorProps } = rest as ExternalLinkProps
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      >
        {children}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    )
  }

  const routerProps = rest as RouterLinkProps
  return (
    <RouterLink ref={ref} className={classes} {...routerProps}>
      {children}
    </RouterLink>
  )
})

CustomLink.displayName = 'CustomLink'

// Named export for convenience
export { CustomLink as Link }

export default CustomLink
