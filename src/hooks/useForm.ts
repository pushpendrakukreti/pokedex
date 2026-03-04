import { useState, useCallback, useMemo, type ChangeEvent, type FormEvent } from 'react'

interface FormOptions<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit?: (values: T) => void | Promise<void>
}

interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

interface UseFormReturn<T> extends FormState<T> {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  setValue: (field: keyof T, value: T[keyof T]) => void
  setValues: (values: Partial<T>) => void
  setError: (field: keyof T, error: string) => void
  clearError: (field: keyof T) => void
  reset: () => void
  getFieldProps: (field: keyof T) => {
    name: string
    value: T[keyof T]
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  }
}

/**
 * Hook for form state management with validation.
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: FormOptions<T>): UseFormReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = useMemo(() => {
    if (!validate) return true
    const validationErrors = validate(values)
    return Object.keys(validationErrors).length === 0
  }, [values, validate])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

      setValuesState((prev) => ({
        ...prev,
        [name]: newValue,
      }))

      // Clear error when user starts typing
      if (errors[name as keyof T]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name as keyof T]
          return newErrors
        })
      }
    },
    [errors]
  )

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }))

      // Validate on blur
      if (validate) {
        const validationErrors = validate(values)
        if (validationErrors[name as keyof T]) {
          setErrors((prev) => ({
            ...prev,
            [name]: validationErrors[name as keyof T],
          }))
        }
      }
    },
    [values, validate]
  )

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Validate all fields
      if (validate) {
        const validationErrors = validate(values)
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          return
        }
      }

      if (onSubmit) {
        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [values, validate, onSubmit]
  )

  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValuesState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({
      ...prev,
      ...newValues,
    }))
  }, [])

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }, [])

  const clearError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const reset = useCallback(() => {
    setValuesState(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const getFieldProps = useCallback(
    (field: keyof T) => ({
      name: field as string,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, handleChange, handleBlur]
  )

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setValues,
    setError,
    clearError,
    reset,
    getFieldProps,
  }
}
