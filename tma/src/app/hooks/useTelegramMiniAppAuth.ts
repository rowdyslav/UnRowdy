import {useEffect} from "react";
import {authApi} from "@/shared/api/auth/authApi.ts";

export const useTelegramMiniAppAuth = () => {
  const telegramUser = window.Telegram?.WebApp.initDataUnsafe?.user;
  const telegramUserId = telegramUser?.id;
  const telegramUsername = telegramUser?.username ?? null;

  useEffect(() => {
    if (!telegramUserId) {
      return;
    }

    void authApi.auth(telegramUserId, telegramUsername);
  }, [telegramUserId, telegramUsername]);
};
