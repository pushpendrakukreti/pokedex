import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTE_PATHS } from './RouteConfig'

// Lazy load pages for code splitting
const Home = lazy(() => import('../pages/Home/Home'))
const PokemonListPage = lazy(() => import('../pages/PokemonListPage/PokemonListPage'))
const PokemonDetailPage = lazy(() => import('../pages/PokemonDetailPage/PokemonDetailPage'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

/**
 * AppRoutes component that defines all application routes with lazy loading.
 */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<Home />} />
        <Route path={ROUTE_PATHS.POKEMON_LIST} element={<PokemonListPage />} />
        <Route path={ROUTE_PATHS.POKEMON_DETAIL} element={<PokemonDetailPage />} />
        <Route path={ROUTE_PATHS.ERROR} element={<ErrorPage />} />
        <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
