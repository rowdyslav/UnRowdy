interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}

interface TelegramWebApp {
  ready: () => Promise<void>
  openTelegramLink: (string) => void
  initDataUnsafe?: {
    user?: TelegramWebAppUser
  }
  BackButton: {
    show(): void
    hide(): void
    onClick(callback: () => void): void;
    offClick(callback?: () => void): void
  }
}

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}