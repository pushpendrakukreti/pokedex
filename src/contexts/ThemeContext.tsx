/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import { Theme } from '../types/enums'
import { getStorageItem, setStorageItem } from '../lib/storage'
import { STORAGE_KEYS } from '../constants/app'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

/**
 * Gets the system preference for dark mode.
 */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

/**
 * ThemeProvider component that provides theme context to the app.
 */
export function ThemeProvider({ children, defaultTheme = Theme.SYSTEM }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStorageItem<Theme>(STORAGE_KEYS.THEME)
    return stored || defaultTheme
  })

  // Track system theme separately for when theme is set to 'system'
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Compute resolved theme based on theme setting and system preference
  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    if (theme === Theme.SYSTEM) {
      return systemTheme
    }
    return theme as 'light' | 'dark'
  }, [theme, systemTheme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    setStorageItem(STORAGE_KEYS.THEME, newTheme)
  }, [])

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
