import {Outlet} from "react-router-dom";
import Sidebar from "@/widgets/Sidebar/Sidebar.tsx";

const Layout = () => {
  return (
      <div className="flex min-h-screen content-stretch">
        <Sidebar/>
        <main className='w-full flex-1 color-background-main'>
          <Outlet/>
        </main>
      </div>
  );
};

export default Layout