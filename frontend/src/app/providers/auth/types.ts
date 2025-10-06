export type AuthStateType = {
  token: string | null
  isAuthenticated: boolean

  login: (token: string) => void
  logout: () => void
}
