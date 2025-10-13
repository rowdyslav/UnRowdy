import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router/AppRouter.tsx'
import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider.tsx'
import { NotificationProvider } from '@/app/providers/Notification/NotificationContext.tsx'

function App() {
  return (
    <NotificationProvider>
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </NotificationProvider>
  )
}

export default App
