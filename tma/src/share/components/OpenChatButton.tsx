const OpenChatButton = ({username}: {username: string}) => {

  const handleClick = ({username}: {username: string}) => {
    if (window.Telegram?.WebApp) window.Telegram.WebApp.openTelegramLink(`https://t.me/${username}`);
    else window.open(`https://t.me/${username}`, "_blank");
  }

  return (
    <button
      onClick={() => handleClick({username})}
      className="bg-green-500 text-white py-2 px-4 rounded-lg"
    >
      Открыть чат с продавцом
    </button>
  )
}

export default OpenChatButton
