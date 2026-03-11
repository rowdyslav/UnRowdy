import { useNotificationStore } from '@/app/providers/notification/NotificationStore.ts'

const colors = {
  success: 'text-green-600 border-green-200',
  error: 'text-red-600 border-red-200',
}

export const Notification = () => {
  const notifications = useNotificationStore(state => state.notifications)

  if (notifications.length === 0) return null

  return (
    <div className='fixed top-4 left-1/2 z-20 flex -translate-x-1/2 flex-col gap-2 pointer-events-none'>
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`text-center card-element border px-6 py-3 text-blue-500 transition-all duration-300 ease-out ${notification.isExiting ? 'animate-notification-out' : 'animate-notification-in'} ${colors[notification.type]}`}
        >
          {notification.content}
        </div>
      ))}
    </div>
  )
}
