const OpenChatButton = ({tg_username, message}: { tg_username: string; message?: string }) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(
      `Добрый день, я хотел бы узнать об услуге ${message ?? ""}`.trim(),
    );
    const url = `https://t.me/${tg_username}${encodedMessage ? `?text=${encodedMessage}` : ""}`;

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(url);
      return;
    }

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white py-4 px-5 rounded-lg"
    >
      Открыть чат с продавцом
    </button>
  );
};

export default OpenChatButton;
