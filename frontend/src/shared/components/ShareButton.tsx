import { useNotificationStore } from '@/shared/model/notification/notificationStore.ts'

const ShareButton = () => {
  const showSuccess = useNotificationStore(state => state.showSuccess)

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
    showSuccess('Ссылка скопирована!')
  }

  return (
    <img src='/icons/share.svg' alt='share' className='cursor-pointer' onClick={handleShare} />
  )
}

export default ShareButton
