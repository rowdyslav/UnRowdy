const OpenChatButton = ({ username, message }: { username: string; message?: string }) => {

  const handleClick = () => {
    const encodedMessage =`Добрый день, я бы хотел узнать об услуге ${message}`
    const url = `https://t.me/${username}${encodedMessage ? `?text=${encodedMessage}` : ""}`;

    if (window.Telegram?.WebApp) window.Telegram.WebApp.openTelegramLink(url);
    else window.open(url, "_blank");
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
