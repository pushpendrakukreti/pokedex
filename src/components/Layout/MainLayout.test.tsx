import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MainLayout from './MainLayout'

describe('MainLayout', () => {
  const renderLayout = (props = {}) =>
    render(
      <MemoryRouter>
        <MainLayout {...props}>
          <div>Page Content</div>
        </MainLayout>
      </MemoryRouter>
    )

  it('should render children content', () => {
    renderLayout()
    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })

  it('should render header by default', () => {
    renderLayout()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render footer by default', () => {
    renderLayout()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should hide header when showHeader is false', () => {
    renderLayout({ showHeader: false })
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
  })

  it('should hide footer when showFooter is false', () => {
    renderLayout({ showFooter: false })
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })

  it('should have main element for content', () => {
    renderLayout()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Page Content')
  })
})
