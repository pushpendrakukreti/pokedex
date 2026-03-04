import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  const renderSidebar = (props = {}) =>
    render(
      <MemoryRouter>
        <Sidebar {...props} />
      </MemoryRouter>
    )

  it('should render default navigation items', () => {
    renderSidebar()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Pokemon List')).toBeInTheDocument()
  })

  it('should render "Navigation" heading', () => {
    renderSidebar()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('should not render when isOpen is false', () => {
    const { container } = renderSidebar({ isOpen: false })
    expect(container.querySelector('aside')).toBeNull()
  })

  it('should render when isOpen is true', () => {
    const { container } = renderSidebar({ isOpen: true })
    expect(container.querySelector('aside')).toBeInTheDocument()
  })

  it('should toggle collapsed state', async () => {
    const user = userEvent.setup()
    renderSidebar()

    const toggleButton = screen.getByLabelText('Collapse sidebar')
    await user.click(toggleButton)

    // After collapse, the "Navigation" text should be hidden and items should not show labels
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument()
  })

  it('should render custom items', () => {
    const items = [{ label: 'Custom Link', path: '/custom' }]
    renderSidebar({ items })
    expect(screen.getByText('Custom Link')).toBeInTheDocument()
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('should call onClose when a link is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderSidebar({ onClose })

    await user.click(screen.getByText('Home'))
    expect(onClose).toHaveBeenCalled()
  })
})
