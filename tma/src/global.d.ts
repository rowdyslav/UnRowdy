interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  ready: () => Promise<void>;
  initDataUnsafe?: {
    user?: TelegramWebAppUser;
  };
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}