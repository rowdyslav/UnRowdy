import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router/AppRouter.tsx'
import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider.tsx'
import { Notification } from '@/shared/components/Notification.tsx'

function App() {
  return (
    <>
      <Notification />

      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </>
  )
}

export default App
