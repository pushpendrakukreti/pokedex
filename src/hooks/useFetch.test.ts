import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  const mockData = { id: 1, name: 'test' }

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch data immediately by default', async () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const { result } = renderHook(() => useFetch(fetchFn))

    expect(result.current.status).toBe('loading')

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
    expect(result.current.isExecuted).toBe(true)
  })

  it('should not fetch immediately when immediate is false', () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const { result } = renderHook(() => useFetch(fetchFn, { immediate: false }))

    expect(result.current.status).toBe('idle')
    expect(result.current.data).toBeNull()
    expect(fetchFn).not.toHaveBeenCalled()
  })

  it('should handle fetch errors', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.data).toBeNull()
  })

  it('should execute fetch manually', async () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const { result } = renderHook(() => useFetch(fetchFn, { immediate: false }))

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.status).toBe('success')
  })

  it('should reset state', async () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.data).toBeNull()
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBeNull()
    expect(result.current.isExecuted).toBe(false)
  })

  it('should use initialData', () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const initialData = { id: 0, name: 'initial' }
    const { result } = renderHook(() => useFetch(fetchFn, { immediate: false, initialData }))

    expect(result.current.data).toEqual(initialData)
  })

  it('should call onSuccess callback', async () => {
    const fetchFn = vi.fn().mockResolvedValue(mockData)
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useFetch(fetchFn, { onSuccess }))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(onSuccess).toHaveBeenCalledWith(mockData)
  })

  it('should call onError callback', async () => {
    const error = new Error('Failed')
    const fetchFn = vi.fn().mockRejectedValue(error)
    const onError = vi.fn()
    const { result } = renderHook(() => useFetch(fetchFn, { onError }))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(onError).toHaveBeenCalledWith(error)
  })
})
