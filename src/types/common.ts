// Common reusable types

export interface BaseEntity {
  id: string | number
  createdAt?: string
  updatedAt?: string
}

export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: Status
  error: string | null
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormFieldProps {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type ButtonVariant = Variant | 'ghost' | 'outline' | 'link'

export interface ChildrenProps {
  children: React.ReactNode
}

export interface ClassNameProps {
  className?: string
}

export interface BaseComponentProps extends ClassNameProps {
  id?: string
  'data-testid'?: string
}
