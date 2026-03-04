import { useState, useCallback, useMemo } from 'react'

interface PaginationOptions {
  totalItems: number
  itemsPerPage?: number
  initialPage?: number
}

interface PaginationResult {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPrevPage: boolean
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  setItemsPerPage: (count: number) => void
}

/**
 * Hook for handling pagination logic.
 */
export function usePagination({
  totalItems,
  itemsPerPage: initialItemsPerPage = 20,
  initialPage = 1,
}: PaginationOptions): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage)

  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage])

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage])

  const endIndex = useMemo(
    () => Math.min(startIndex + itemsPerPage, totalItems),
    [startIndex, itemsPerPage, totalItems]
  )

  const hasNextPage = useMemo(() => currentPage < totalPages, [currentPage, totalPages])

  const hasPrevPage = useMemo(() => currentPage > 1, [currentPage])

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages))
      setCurrentPage(validPage)
    },
    [totalPages]
  )

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [hasNextPage])

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1)
    }
  }, [hasPrevPage])

  const setItemsPerPage = useCallback((count: number) => {
    setItemsPerPageState(count)
    setCurrentPage(1) // Reset to first page when changing items per page
  }, [])

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
  }
}
