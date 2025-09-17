import {Outlet} from "react-router-dom";
import Header from "@/widgets/header/Header.tsx";
import Footer from "@/widgets/footer/Footer.tsx";
// import sideBar from "@/app/layouts/main/ui/sideBar/sideBar.tsx";

const Layout = () => {
  return (
    // <div className="flex min-h-screen content-stretch">
    //   <sideBar/>
    //   <main className='w-full flex-1 color-background-main dark:bg-blue-900'>
    //     <Outlet/>
    //   </main>
    // </div>
    <>
      <Header/>
      <main className='px-[20px] color-main-grey'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default Layout