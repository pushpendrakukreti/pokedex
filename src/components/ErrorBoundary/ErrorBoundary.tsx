import type { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: unknown, info: { componentStack?: string | null }) => void
}

/**
 * Default error fallback UI component.
 * Displays a user-friendly error message with retry and reload options.
 */
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage =
    error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>

        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try again or contact support if
          the problem persists.
        </p>

        {errorMessage && (
          <details className="mb-6 text-left bg-gray-100 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              Error details
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto">{errorMessage}</pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * ErrorBoundary wrapper using react-error-boundary (functional approach).
 * Catches and handles React component errors gracefully.
 */
function ErrorBoundary({ children, fallback, onError }: ErrorBoundaryProps) {
  const handleError = (error: unknown, info: { componentStack?: string | null }) => {
    console.error('ErrorBoundary caught an error:', error, info)
    onError?.(error, info)
  }

  if (fallback) {
    return (
      <ReactErrorBoundary fallback={fallback} onError={handleError}>
        {children}
      </ReactErrorBoundary>
    )
  }

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  )
}

export { ErrorFallback }
export default ErrorBoundary
