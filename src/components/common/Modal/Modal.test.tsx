import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal, { ModalHeader, ModalBody, ModalFooter } from './Modal'

describe('Modal', () => {
  it('should not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()}><div>Content</div></Modal>)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}><div>Content</div></Modal>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should render with title', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} title="My Modal"><div>Body</div></Modal>)
    expect(screen.getByText('My Modal')).toBeInTheDocument()
  })

  it('should have dialog role', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}><div>Content</div></Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should close on ESC key', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose}><div>Content</div></Modal>)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('should not close on ESC when closeOnEsc is false', () => {
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} closeOnEsc={false}><div>Content</div></Modal>)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('should show close button in header', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} title="Title"><div>Content</div></Modal>)
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Modal isOpen={true} onClose={onClose} title="Title"><div>Content</div></Modal>)

    await user.click(screen.getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalled()
  })

  it('should prevent body scroll when open', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}><div>Content</div></Modal>)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should restore body scroll when closed', () => {
    const { rerender } = render(<Modal isOpen={true} onClose={vi.fn()}><div>Content</div></Modal>)
    rerender(<Modal isOpen={false} onClose={vi.fn()}><div>Content</div></Modal>)
    expect(document.body.style.overflow).toBe('')
  })
})

describe('ModalBody', () => {
  it('should render children', () => {
    render(<ModalBody>Body content</ModalBody>)
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })
})

describe('ModalFooter', () => {
  it('should render children', () => {
    render(<ModalFooter>Footer content</ModalFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})
