import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from './components/ErrorBoundary'
import { MainLayout } from './components/Layout'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { PokemonProvider } from './contexts/PokemonContext'
import { Spinner } from './components/common/Spinner'
import { ROUTE_PATHS } from './routes/RouteConfig'
import './App.css'

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/Home/Home'))
const PokemonListPage = lazy(() => import('./pages/PokemonListPage/PokemonListPage'))
const PokemonDetailPage = lazy(() => import('./pages/PokemonDetailPage/PokemonDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound'))

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NotificationProvider>
            <PokemonProvider>
              <BrowserRouter>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
                      <Route path={ROUTE_PATHS.POKEMON_LIST} element={<PokemonListPage />} />
                      <Route path={ROUTE_PATHS.POKEMON_DETAIL} element={<PokemonDetailPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </MainLayout>
              </BrowserRouter>
            </PokemonProvider>
          </NotificationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
