import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router/AppRouter.tsx";
import {ReactQueryProvider} from "@/app/providers/ReactQueryProvider.tsx";

function App() {
  return <>
    <ReactQueryProvider>
      {/*<ThemeSync/>*/}
      <RouterProvider router={router}/>
    </ReactQueryProvider>
  </>
}

export default App
