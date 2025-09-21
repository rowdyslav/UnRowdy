import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router/AppRouter.tsx";
import {ThemeSync} from "@/app/providers/theme/ThemeSync.tsx";
import {ReactQueryProvider} from "@/app/providers/ReactQueryProvider.tsx";

function App() {
  return <>
    <ReactQueryProvider>
      <ThemeSync/>
      <RouterProvider router={router}/>
    </ReactQueryProvider>
  </>
}

export default App
