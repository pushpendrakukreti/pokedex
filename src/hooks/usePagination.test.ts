import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePagination } from './usePagination'

describe('usePagination', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100 }))

    expect(result.current.currentPage).toBe(1)
    expect(result.current.itemsPerPage).toBe(20)
    expect(result.current.totalPages).toBe(5)
    expect(result.current.startIndex).toBe(0)
    expect(result.current.endIndex).toBe(20)
    expect(result.current.hasNextPage).toBe(true)
    expect(result.current.hasPrevPage).toBe(false)
  })

  it('should accept custom initial values', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 50, itemsPerPage: 10, initialPage: 3 })
    )

    expect(result.current.currentPage).toBe(3)
    expect(result.current.totalPages).toBe(5)
    expect(result.current.startIndex).toBe(20)
    expect(result.current.endIndex).toBe(30)
  })

  it('should navigate to next page', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 60, itemsPerPage: 20 }))

    act(() => {
      result.current.nextPage()
    })
    expect(result.current.currentPage).toBe(2)
    expect(result.current.hasNextPage).toBe(true)
    expect(result.current.hasPrevPage).toBe(true)
  })

  it('should navigate to previous page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 60, itemsPerPage: 20, initialPage: 2 })
    )

    act(() => {
      result.current.prevPage()
    })
    expect(result.current.currentPage).toBe(1)
    expect(result.current.hasPrevPage).toBe(false)
  })

  it('should not go past last page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 40, itemsPerPage: 20, initialPage: 2 })
    )

    act(() => {
      result.current.nextPage()
    })
    expect(result.current.currentPage).toBe(2) // should stay on page 2
    expect(result.current.hasNextPage).toBe(false)
  })

  it('should not go before first page', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100 }))

    act(() => {
      result.current.prevPage()
    })
    expect(result.current.currentPage).toBe(1)
  })

  it('should go to specific page', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, itemsPerPage: 20 }))

    act(() => {
      result.current.goToPage(3)
    })
    expect(result.current.currentPage).toBe(3)
  })

  it('should clamp goToPage to valid range', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 100, itemsPerPage: 20 }))

    act(() => {
      result.current.goToPage(10)
    })
    expect(result.current.currentPage).toBe(5) // clamped to max

    act(() => {
      result.current.goToPage(0)
    })
    expect(result.current.currentPage).toBe(1) // clamped to min
  })

  it('should reset to page 1 when changing items per page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 100, itemsPerPage: 20, initialPage: 3 })
    )

    act(() => {
      result.current.setItemsPerPage(10)
    })
    expect(result.current.currentPage).toBe(1)
    expect(result.current.itemsPerPage).toBe(10)
    expect(result.current.totalPages).toBe(10)
  })

  it('should calculate correct endIndex for last page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 55, itemsPerPage: 20, initialPage: 3 })
    )

    expect(result.current.endIndex).toBe(55) // min(60, 55) = 55
  })
})
