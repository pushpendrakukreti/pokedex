import { memo, useCallback } from 'react'
import { POKEMON_TYPES } from '../../../constants/pokemon'

interface PokemonFilterProps {
  selectedTypes: string[]
  onTypeChange: (types: string[]) => void
}

/**
 * PokemonFilter component - allows filtering Pokemon by type.
 * Memoized to prevent unnecessary re-renders.
 */
function PokemonFilterComponent({ selectedTypes, onTypeChange }: PokemonFilterProps) {
  const handleTypeToggle = useCallback(
    (type: string) => {
      if (selectedTypes.includes(type)) {
        onTypeChange(selectedTypes.filter((t) => t !== type))
      } else {
        onTypeChange([...selectedTypes, type])
      }
    },
    [selectedTypes, onTypeChange]
  )

  const handleClearAll = useCallback(() => {
    onTypeChange([])
  }, [onTypeChange])

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Filter by Type</h3>
        {selectedTypes.length > 0 && (
          <button onClick={handleClearAll} className="text-sm text-blue-500 hover:text-blue-700">
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {POKEMON_TYPES.map((type) => (
          <button
            key={type.name}
            onClick={() => handleTypeToggle(type.name)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors ${
              selectedTypes.includes(type.name)
                ? `${type.color} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={selectedTypes.includes(type.name)}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export const PokemonFilter = memo(PokemonFilterComponent)

export default PokemonFilter
