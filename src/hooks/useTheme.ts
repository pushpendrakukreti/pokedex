import { useContext, useCallback } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Theme } from '../types/enums'

/**
 * Hook to access theme context and toggle theme.
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  const { theme, setTheme, resolvedTheme } = context

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? Theme.DARK : Theme.LIGHT)
  }, [resolvedTheme, setTheme])

  const setLightTheme = useCallback(() => {
    setTheme(Theme.LIGHT)
  }, [setTheme])

  const setDarkTheme = useCallback(() => {
    setTheme(Theme.DARK)
  }, [setTheme])

  const setSystemTheme = useCallback(() => {
    setTheme(Theme.SYSTEM)
  }, [setTheme])

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  }
}
