import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router/AppRouter.tsx";
import {ThemeSync} from "@/app/providers/theme/ThemeSync.tsx";

function App() {
  return <>
    <ThemeSync/>
    <RouterProvider router={router}/>
  </>
}

export default App
