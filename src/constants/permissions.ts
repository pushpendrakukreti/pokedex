// Authentication permissions and roles

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const PERMISSIONS = {
  // Pokemon permissions
  VIEW_POKEMON: 'view:pokemon',
  EDIT_POKEMON: 'edit:pokemon',
  DELETE_POKEMON: 'delete:pokemon',

  // User permissions
  VIEW_USERS: 'view:users',
  EDIT_USERS: 'edit:users',
  DELETE_USERS: 'delete:users',

  // Favorites permissions
  ADD_FAVORITES: 'add:favorites',
  REMOVE_FAVORITES: 'remove:favorites',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.USER]: [
    PERMISSIONS.VIEW_POKEMON,
    PERMISSIONS.ADD_FAVORITES,
    PERMISSIONS.REMOVE_FAVORITES,
  ],
  [ROLES.GUEST]: [PERMISSIONS.VIEW_POKEMON],
}
