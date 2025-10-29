import {useState} from "react";

const ShareButton = () => {
  const [title, setTitle] = useState<string>('Скопировать ссылку')

  const handleShare = async () => {

    await navigator.clipboard.writeText(window.location.href)
    setTitle('Ссылка скопирована!')
    setTimeout(() => setTitle('Скопировать ссылку'), 3000)
  }

  return (
    <button className='button' onClick={handleShare}>
      {title}
    </button>
  )
}

export default ShareButton;