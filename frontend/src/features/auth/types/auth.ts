export type UserType = {
  id: string;
  username: string;
  email: string;
}

export interface AuthStateType {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: UserType) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void
}

