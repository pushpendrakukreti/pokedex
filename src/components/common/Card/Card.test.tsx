import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card, { CardHeader, CardBody, CardFooter } from './Card'

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('should apply default classes', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white', 'p-4', 'shadow-md', 'rounded-lg')
  })

  it('should apply custom padding', () => {
    render(<Card data-testid="card" padding="lg">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('p-6')
  })

  it('should apply no padding', () => {
    render(<Card data-testid="card" padding="none">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).not.toHaveClass('p-4')
  })

  it('should apply hoverable class', () => {
    render(<Card data-testid="card" hoverable>Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('hover:shadow-xl')
  })

  it('should apply custom className', () => {
    render(<Card data-testid="card" className="my-class">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('my-class')
  })
})

describe('CardHeader', () => {
  it('should render children', () => {
    render(<CardHeader>Header</CardHeader>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('should have border-bottom styling', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    expect(screen.getByTestId('header')).toHaveClass('border-b')
  })
})

describe('CardBody', () => {
  it('should render children', () => {
    render(<CardBody>Body Content</CardBody>)
    expect(screen.getByText('Body Content')).toBeInTheDocument()
  })
})

describe('CardFooter', () => {
  it('should render children', () => {
    render(<CardFooter>Footer</CardFooter>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('should have border-top styling', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId('footer')).toHaveClass('border-t')
  })
})
