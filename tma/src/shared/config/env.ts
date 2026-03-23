const DEFAULT_API_URL = "http://127.0.0.1:8000";

export const env = {
  apiUrl: import.meta.env.VITE_API_URL?.trim() || DEFAULT_API_URL,
} as const;
