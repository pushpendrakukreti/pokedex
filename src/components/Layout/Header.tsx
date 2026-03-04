import { Link } from 'react-router-dom'
import { APP_CONFIG } from '../../constants/app'
import { ROUTE_PATHS } from '../../routes/RouteConfig'

/**
 * Header component with navigation.
 */
export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTE_PATHS.HOME} className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="white" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2" />
            </svg>
            <span className="text-xl font-bold text-gray-800">{APP_CONFIG.NAME}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to={ROUTE_PATHS.HOME}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              API Docs
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
