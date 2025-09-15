import {Outlet} from "react-router-dom";
import SideBar from "@/app/layouts/main/ui/SideBar/SideBar.tsx";

const Layout = () => {
  return (
      <div className="flex min-h-screen content-stretch">
        <SideBar/>
        <main className='w-full flex-1 color-background-main dark:bg-blue-900'>
          <Outlet/>
        </main>
      </div>
  );
};

export default Layout