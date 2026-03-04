import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useForm } from './useForm'

describe('useForm', () => {
  const defaultValues = {
    name: '',
    email: '',
  }

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    expect(result.current.values).toEqual(defaultValues)
    expect(result.current.errors).toEqual({})
    expect(result.current.touched).toEqual({})
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should update value on handleChange', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John', type: 'text' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.values.name).toBe('John')
  })

  it('should set touched on handleBlur', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    act(() => {
      result.current.handleBlur({
        target: { name: 'name' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.touched.name).toBe(true)
  })

  it('should validate on blur', () => {
    const validate = vi.fn().mockReturnValue({ name: 'Name is required' })
    const { result } = renderHook(() => useForm({ initialValues: defaultValues, validate }))

    act(() => {
      result.current.handleBlur({
        target: { name: 'name' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.errors.name).toBe('Name is required')
  })

  it('should call onSubmit when validation passes', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm({ initialValues: { name: 'John', email: '' }, onSubmit })
    )

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(onSubmit).toHaveBeenCalledWith({ name: 'John', email: '' })
  })

  it('should not call onSubmit when validation fails', async () => {
    const onSubmit = vi.fn()
    const validate = () => ({ name: 'Required' })
    const { result } = renderHook(() =>
      useForm({ initialValues: defaultValues, validate, onSubmit })
    )

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(onSubmit).not.toHaveBeenCalled()
    expect(result.current.errors.name).toBe('Required')
  })

  it('should set and clear individual errors', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    act(() => {
      result.current.setError('email', 'Invalid email')
    })
    expect(result.current.errors.email).toBe('Invalid email')

    act(() => {
      result.current.clearError('email')
    })
    expect(result.current.errors.email).toBeUndefined()
  })

  it('should set value programmatically', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    act(() => {
      result.current.setValue('name', 'Jane')
    })
    expect(result.current.values.name).toBe('Jane')
  })

  it('should set multiple values', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    act(() => {
      result.current.setValues({ name: 'Jane', email: 'jane@test.com' })
    })
    expect(result.current.values).toEqual({ name: 'Jane', email: 'jane@test.com' })
  })

  it('should reset form to initial values', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    act(() => {
      result.current.setValue('name', 'John')
      result.current.setError('email', 'Invalid')
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.values).toEqual(defaultValues)
    expect(result.current.errors).toEqual({})
    expect(result.current.touched).toEqual({})
  })

  it('should return field props via getFieldProps', () => {
    const { result } = renderHook(() => useForm({ initialValues: defaultValues }))

    const fieldProps = result.current.getFieldProps('name')
    expect(fieldProps.name).toBe('name')
    expect(fieldProps.value).toBe('')
    expect(fieldProps.onChange).toBeInstanceOf(Function)
    expect(fieldProps.onBlur).toBeInstanceOf(Function)
  })

  it('should compute isValid based on validation', () => {
    const validate = (values: typeof defaultValues) => {
      const errors: Partial<Record<keyof typeof defaultValues, string>> = {}
      if (!values.name) errors.name = 'Required'
      return errors
    }

    const { result } = renderHook(() => useForm({ initialValues: defaultValues, validate }))

    expect(result.current.isValid).toBe(false)

    act(() => {
      result.current.setValue('name', 'John')
    })

    expect(result.current.isValid).toBe(true)
  })
})
