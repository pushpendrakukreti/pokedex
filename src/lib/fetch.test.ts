import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FetchError, fetchWithTimeout, get, post } from './fetch'

describe('Fetch utilities', () => {
  const mockResponse = (data: unknown, ok = true, status = 200) => {
    return {
      ok,
      status,
      statusText: ok ? 'OK' : 'Error',
      json: () => Promise.resolve(data),
    } as Response
  }

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('FetchError', () => {
    it('should create a FetchError with correct properties', () => {
      const error = new FetchError('Not Found', 404, 'Not Found')
      expect(error).toBeInstanceOf(Error)
      expect(error.name).toBe('FetchError')
      expect(error.message).toBe('Not Found')
      expect(error.status).toBe(404)
      expect(error.statusText).toBe('Not Found')
    })
  })

  describe('fetchWithTimeout', () => {
    it('should fetch and return parsed JSON data', async () => {
      const mockData = { id: 1, name: 'bulbasaur' }
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(mockData))

      const result = await fetchWithTimeout<typeof mockData>('https://api.example.com/data')
      expect(result).toEqual(mockData)
    })

    it('should throw FetchError on non-ok response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(null, false, 404))

      await expect(fetchWithTimeout('https://api.example.com/data')).rejects.toThrow(FetchError)
    })

    it('should throw timeout error when aborted', async () => {
      // Simulate an abort error from fetch
      const abortError = new Error('The operation was aborted')
      abortError.name = 'AbortError'
      vi.mocked(fetch).mockRejectedValueOnce(abortError)

      await expect(fetchWithTimeout('https://api.example.com/data')).rejects.toThrow(
        'The request timed out'
      )
    })

    it('should use AbortController signal', async () => {
      const mockData = { id: 1 }
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(mockData))

      await fetchWithTimeout('https://api.example.com/data')
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      )
    })
  })

  describe('get', () => {
    it('should make a GET request', async () => {
      const mockData = { results: [] }
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(mockData))

      const result = await get<typeof mockData>('https://api.example.com/list')
      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/list',
        expect.objectContaining({
          method: 'GET',
        })
      )
    })
  })

  describe('post', () => {
    it('should make a POST request with JSON body', async () => {
      const postData = { name: 'test' }
      const mockData = { success: true }
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse(mockData))

      const result = await post<typeof mockData>('https://api.example.com/create', postData)
      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/create',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should make a POST request without body', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse({ ok: true }))

      await post('https://api.example.com/action')
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/action',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
        })
      )
    })
  })
})
