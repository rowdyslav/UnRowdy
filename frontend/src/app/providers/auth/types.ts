import type {UserType} from "@/shared/types/userType.ts";

export type AuthStateType = {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: UserType) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void
}

