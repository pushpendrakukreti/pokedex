import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PokemonSearch from './PokemonSearch'

describe('PokemonSearch', () => {
  it('should render search input', () => {
    render(<PokemonSearch value="" onChange={vi.fn()} />)
    expect(screen.getByLabelText('Search Pokemon')).toBeInTheDocument()
  })

  it('should display the current value', () => {
    render(<PokemonSearch value="pikachu" onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument()
  })

  it('should use custom placeholder', () => {
    render(<PokemonSearch value="" onChange={vi.fn()} placeholder="Find a Pokemon" />)
    expect(screen.getByPlaceholderText('Find a Pokemon')).toBeInTheDocument()
  })

  it('should call onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PokemonSearch value="" onChange={onChange} />)

    await user.type(screen.getByLabelText('Search Pokemon'), 'b')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('should show clear button when value is non-empty', () => {
    render(<PokemonSearch value="pikachu" onChange={vi.fn()} />)
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('should not show clear button when value is empty', () => {
    render(<PokemonSearch value="" onChange={vi.fn()} />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('should call onChange with empty string when clear is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PokemonSearch value="pikachu" onChange={onChange} />)

    await user.click(screen.getByLabelText('Clear search'))
    expect(onChange).toHaveBeenCalledWith('')
  })
})
