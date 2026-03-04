// Route configuration and path constants

export const ROUTE_PATHS = {
  HOME: '/',
  POKEMON_LIST: '/pokemon',
  POKEMON_DETAIL: '/pokemon/:nameOrId',
  NOT_FOUND: '*',
  ERROR: '/error',
} as const

export interface RouteConfigItem {
  path: string
  title: string
  isPrivate: boolean
  exact?: boolean
}

export const routeConfig: Record<string, RouteConfigItem> = {
  home: {
    path: ROUTE_PATHS.HOME,
    title: 'Home',
    isPrivate: false,
  },
  pokemonList: {
    path: ROUTE_PATHS.POKEMON_LIST,
    title: 'Pokemon List',
    isPrivate: false,
  },
  pokemonDetail: {
    path: ROUTE_PATHS.POKEMON_DETAIL,
    title: 'Pokemon Detail',
    isPrivate: false,
  },
  notFound: {
    path: ROUTE_PATHS.NOT_FOUND,
    title: 'Not Found',
    isPrivate: false,
  },
  error: {
    path: ROUTE_PATHS.ERROR,
    title: 'Error',
    isPrivate: false,
  },
}
