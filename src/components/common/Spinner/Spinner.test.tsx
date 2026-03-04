import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Spinner, { SpinnerOverlay } from './Spinner'

describe('Spinner', () => {
  it('should render with loading status role', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should have sr-only loading text', () => {
    render(<Spinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should apply default size and color', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('w-8', 'h-8') // md size
    expect(spinner).toHaveClass('border-blue-500') // primary color
  })

  it('should apply custom size', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toHaveClass('w-12', 'h-12')
  })

  it('should apply custom color', () => {
    render(<Spinner color="secondary" />)
    expect(screen.getByRole('status')).toHaveClass('border-gray-500')
  })

  it('should apply custom className', () => {
    render(<Spinner className="extra" />)
    expect(screen.getByRole('status')).toHaveClass('extra')
  })
})

describe('SpinnerOverlay', () => {
  it('should render the spinner', () => {
    render(<SpinnerOverlay />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should display message when provided', () => {
    render(<SpinnerOverlay message="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('should not display message when not provided', () => {
    const { container } = render(<SpinnerOverlay />)
    expect(container.querySelector('p')).toBeNull()
  })
})
