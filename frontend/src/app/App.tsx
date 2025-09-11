import {RouterProvider} from "react-router-dom";
import {router} from "@/app/router/AppRouter.tsx";

function App() {
  return <>
    <RouterProvider router={router}/>
  </>
}

export default App
