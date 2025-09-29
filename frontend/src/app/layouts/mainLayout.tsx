import {Outlet} from "react-router-dom";
import Header from "@/widgets/header/Header.tsx";
import Footer from "@/widgets/footer/Footer.tsx";

const Layout = () => {
  return (
    <>
      <Header/>
      <main className='px-[20px] color-main-grey py-8'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default Layout