export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  PROFILE: '/profile',
  ADD_SERVICE: '/add',
  SERVICE: '/service',
  CATEGORIES: '/categories',
}

export type RoutePath =
  | '/'
  | '/auth'
  | '/profile'
  | '/profile/:username'
  | '/add'
  | '/service'
  | '/categories'
