import type { FormHTMLAttributes, ReactNode } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

interface FormGroupProps {
  children: ReactNode
  className?: string
}

interface FormLabelProps {
  children: ReactNode
  htmlFor?: string
  required?: boolean
  className?: string
}

interface FormErrorProps {
  children: ReactNode
  className?: string
}

interface FormHelperTextProps {
  children: ReactNode
  className?: string
}

/**
 * Form component with proper accessibility attributes.
 */
export function Form({ children, className = '', ...props }: FormProps) {
  return (
    <form className={`space-y-4 ${className}`} {...props}>
      {children}
    </form>
  )
}

/**
 * FormGroup component for grouping form fields.
 */
export function FormGroup({ children, className = '' }: FormGroupProps) {
  return <div className={`space-y-1 ${className}`}>{children}</div>
}

/**
 * FormLabel component for form field labels.
 */
export function FormLabel({ children, htmlFor, required, className = '' }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

/**
 * FormError component for displaying form validation errors.
 */
export function FormError({ children, className = '' }: FormErrorProps) {
  if (!children) return null

  return (
    <p className={`text-sm text-red-600 ${className}`} role="alert">
      {children}
    </p>
  )
}

/**
 * FormHelperText component for displaying helper text below form fields.
 */
export function FormHelperText({ children, className = '' }: FormHelperTextProps) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}

export default Form
