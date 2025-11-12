import { useEffect, useState } from "react";
import {User} from '@telegram-apps/sdk'

export const useTelegramUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!window.Telegram?.WebApp) return;

      await window.Telegram.WebApp.ready();

      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      setUser(tgUser ?? null);
      setIsReady(true);
    };

    init();
  }, []);

  return { user, isReady };
};
