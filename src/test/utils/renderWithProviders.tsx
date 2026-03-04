/* eslint-disable react-refresh/only-export-components */
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactElement, ReactNode } from 'react'

interface ProvidersOptions {
  route?: string
  useMemoryRouter?: boolean
  queryClient?: QueryClient
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  })
}

function AllProviders({
  children,
  options = {},
}: {
  children: ReactNode
  options?: ProvidersOptions
}) {
  const { route = '/', useMemoryRouter = false, queryClient = createTestQueryClient() } = options
  const Router = useMemoryRouter ? MemoryRouter : BrowserRouter
  const routerProps = useMemoryRouter ? { initialEntries: [route] } : {}

  return (
    <QueryClientProvider client={queryClient}>
      <Router {...routerProps}>{children}</Router>
    </QueryClientProvider>
  )
}

function renderWithProviders(
  ui: ReactElement,
  options: ProvidersOptions & Omit<RenderOptions, 'wrapper'> = {}
) {
  const { route, useMemoryRouter, queryClient, ...renderOptions } = options
  const providerOptions = { route, useMemoryRouter, queryClient }

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => <AllProviders options={providerOptions}>{children}</AllProviders>,
      ...renderOptions,
    }),
  }
}

export { renderWithProviders, createTestQueryClient }
export default renderWithProviders
