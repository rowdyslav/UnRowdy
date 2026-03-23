import {useEffect} from "react";

interface UseTelegramBackButtonParams {
  currentPage: number;
  onBack: () => void;
}

export const useTelegramBackButton = ({currentPage, onBack}: UseTelegramBackButtonParams) => {
  useEffect(() => {
    const backButton = window.Telegram?.WebApp.BackButton;

    if (!backButton) {
      return;
    }

    backButton.offClick(onBack);

    if (currentPage > 0) {
      backButton.show();
      backButton.onClick(onBack);

      return () => {
        backButton.offClick(onBack);
      };
    }

    backButton.hide();

    return () => {
      backButton.offClick(onBack);
    };
  }, [currentPage, onBack]);
};
