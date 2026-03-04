import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from '../../routes/RouteConfig'

interface SidebarItem {
  label: string
  path: string
  icon?: React.ReactNode
}

interface SidebarProps {
  items?: SidebarItem[]
  isOpen?: boolean
  onClose?: () => void
}

const defaultItems: SidebarItem[] = [
  {
    label: 'Home',
    path: ROUTE_PATHS.HOME,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: 'Pokemon List',
    path: ROUTE_PATHS.POKEMON_LIST,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
]

/**
 * Sidebar component for navigation.
 */
export function Sidebar({ items = defaultItems, isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  if (!isOpen) return null

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        {!collapsed && <span className="font-semibold text-gray-800">Navigation</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={onClose}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
