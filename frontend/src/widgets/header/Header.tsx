import { headerData } from '@/widgets/header/headerData.ts'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes.ts'
import { useAuthStore } from '@/app/providers/auth/authStore.ts'

const Header = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return (
    <header className='max-w-[var(--max-width-container-big)] mx-auto px-[15px] flex justify-between h-[64px] items-center'>
      <div className='flex items-center'>
        <Link className='text-2xl font-bold color-font' to={ROUTES.HOME}>
          UnRowdy
        </Link>

        <nav>
          <ul className='ml-8 flex gap-x-6 '>
            {headerData.map((link, index) => (
              <Link
                className='color-font-light duration-100 hover:text-[color:var(--color-font)]'
                key={index}
                to={link.href}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      {isAuthenticated ? (
        <Link to={ROUTES.PROFILE}>
          <img src='/public/icons/accCircle2.svg' alt='' height={60} width={60} />
        </Link>
      ) : (
        <Link to={ROUTES.AUTH} className='button'>
          Войти
        </Link>
      )}
    </header>
  )
}

export default Header
