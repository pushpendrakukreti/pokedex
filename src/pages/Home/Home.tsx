import { PokemonList } from '../../components/features/PokemonList'

/**
 * Home page component - displays the Pokemon list as the main content
 */
export function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PokemonList />
    </main>
  )
}

export default Home
