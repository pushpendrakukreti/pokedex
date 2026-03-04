import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('should render children text', () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('should apply default primary variant', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('should apply different variants', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100')

    rerender(<Badge variant="error">Error</Badge>)
    expect(screen.getByText('Error')).toHaveClass('bg-red-100')

    rerender(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100')
  })

  it('should apply different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>)
    expect(screen.getByText('Small')).toHaveClass('text-xs')

    rerender(<Badge size="lg">Large</Badge>)
    expect(screen.getByText('Large')).toHaveClass('text-sm')
  })

  it('should apply rounded-full by default', () => {
    render(<Badge>Rounded</Badge>)
    expect(screen.getByText('Rounded')).toHaveClass('rounded-full')
  })

  it('should apply rounded when rounded is false', () => {
    render(<Badge rounded={false}>Square</Badge>)
    const badge = screen.getByText('Square')
    expect(badge).toHaveClass('rounded')
    expect(badge).not.toHaveClass('rounded-full')
  })

  it('should apply custom className', () => {
    render(<Badge className="custom">Custom</Badge>)
    expect(screen.getByText('Custom')).toHaveClass('custom')
  })
})
