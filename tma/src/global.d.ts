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
  };
}

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}