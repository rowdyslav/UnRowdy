import Footer from '@/widgets/footer/Footer.tsx'
import Header from '@/widgets/header/Header.tsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <main className='px-[20px] color-main-grey py-8'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
