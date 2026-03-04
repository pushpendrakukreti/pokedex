import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Form, { FormGroup, FormLabel, FormError, FormHelperText } from './Form'

describe('Form', () => {
  it('should render a form element', () => {
    render(<Form data-testid="form">Form Content</Form>)
    expect(screen.getByTestId('form')).toBeInTheDocument()
    expect(screen.getByTestId('form').tagName).toBe('FORM')
  })

  it('should render children', () => {
    render(<Form>Form Content</Form>)
    expect(screen.getByText('Form Content')).toBeInTheDocument()
  })

  it('should handle submit event', async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault())
    render(<Form onSubmit={handleSubmit}>Content</Form>)

    const form = screen.getByText('Content').closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true }))
    expect(handleSubmit).toHaveBeenCalled()
  })
})

describe('FormGroup', () => {
  it('should render children', () => {
    render(<FormGroup>Group Content</FormGroup>)
    expect(screen.getByText('Group Content')).toBeInTheDocument()
  })
})

describe('FormLabel', () => {
  it('should render label text', () => {
    render(<FormLabel>Label Text</FormLabel>)
    expect(screen.getByText('Label Text')).toBeInTheDocument()
  })

  it('should show required indicator', () => {
    render(<FormLabel required>Required Label</FormLabel>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should have htmlFor attribute', () => {
    render(<FormLabel htmlFor="input-id">Label</FormLabel>)
    expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id')
  })
})

describe('FormError', () => {
  it('should render error message', () => {
    render(<FormError>Error message</FormError>)
    expect(screen.getByRole('alert')).toHaveTextContent('Error message')
  })

  it('should return null when no children', () => {
    const { container } = render(<FormError>{null}</FormError>)
    expect(container.innerHTML).toBe('')
  })
})

describe('FormHelperText', () => {
  it('should render helper text', () => {
    render(<FormHelperText>Help text</FormHelperText>)
    expect(screen.getByText('Help text')).toBeInTheDocument()
  })
})
