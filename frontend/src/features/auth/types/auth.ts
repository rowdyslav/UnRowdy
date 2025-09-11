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

  login: (token: string, user: UserType) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void
}

