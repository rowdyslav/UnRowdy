import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider.tsx'
import { Notification } from '@/shared/components/Notification.tsx'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog.tsx'
import { router } from '@/app/router/AppRouter.tsx'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <>
      <Notification />
      <ConfirmDialog />

      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </>
  )
}

export default App
