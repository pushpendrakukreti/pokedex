import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PokemonFilter from './PokemonFilter'

describe('PokemonFilter', () => {
  it('should render "Filter by Type" heading', () => {
    render(<PokemonFilter selectedTypes={[]} onTypeChange={vi.fn()} />)
    expect(screen.getByText('Filter by Type')).toBeInTheDocument()
  })

  it('should render all 18 type buttons', () => {
    render(<PokemonFilter selectedTypes={[]} onTypeChange={vi.fn()} />)
    expect(screen.getByText('normal')).toBeInTheDocument()
    expect(screen.getByText('fire')).toBeInTheDocument()
    expect(screen.getByText('water')).toBeInTheDocument()
    expect(screen.getByText('grass')).toBeInTheDocument()
    expect(screen.getByText('fairy')).toBeInTheDocument()
  })

  it('should show selected types as pressed', () => {
    render(<PokemonFilter selectedTypes={['fire', 'water']} onTypeChange={vi.fn()} />)
    expect(screen.getByText('fire')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('water')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('grass')).toHaveAttribute('aria-pressed', 'false')
  })

  it('should add type when clicking unselected type', async () => {
    const user = userEvent.setup()
    const onTypeChange = vi.fn()
    render(<PokemonFilter selectedTypes={[]} onTypeChange={onTypeChange} />)

    await user.click(screen.getByText('fire'))
    expect(onTypeChange).toHaveBeenCalledWith(['fire'])
  })

  it('should remove type when clicking selected type', async () => {
    const user = userEvent.setup()
    const onTypeChange = vi.fn()
    render(<PokemonFilter selectedTypes={['fire', 'water']} onTypeChange={onTypeChange} />)

    await user.click(screen.getByText('fire'))
    expect(onTypeChange).toHaveBeenCalledWith(['water'])
  })

  it('should show Clear all button when types are selected', () => {
    render(<PokemonFilter selectedTypes={['fire']} onTypeChange={vi.fn()} />)
    expect(screen.getByText('Clear all')).toBeInTheDocument()
  })

  it('should not show Clear all button when no types are selected', () => {
    render(<PokemonFilter selectedTypes={[]} onTypeChange={vi.fn()} />)
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
  })

  it('should clear all types when Clear all is clicked', async () => {
    const user = userEvent.setup()
    const onTypeChange = vi.fn()
    render(<PokemonFilter selectedTypes={['fire', 'water']} onTypeChange={onTypeChange} />)

    await user.click(screen.getByText('Clear all'))
    expect(onTypeChange).toHaveBeenCalledWith([])
  })
})
