import {headerData} from "@/widgets/header/headerData.ts";
import {Link} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";
import {useAuthStore} from "@/app/providers/auth/authStore.ts";
import {api} from "@/shared/api/axios.ts";

const Header = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return (
    <header
      className='max-w-[var(--max-width-container-big)] mx-auto px-[15px] flex justify-between h-[64px] items-center'
    >
      <div className='flex items-center'>
        <h2 className='text-2xl font-bold color-font'>
          unRowdy
        </h2>

        <nav>
          <ul className='ml-8 flex gap-x-6 '>
            {headerData.map((link, index) => (
              <Link
                className='color-font-light duration-100 hover:text-[color:var(--color-font)]'
                key={index}
                to={link.href}
              >{link.label}</Link>
            ))}
          </ul>
        </nav>
        <button className='button-blue' onClick={() => api.delete("/users")}>deleteAllUsers</button>
      </div>

      {isAuthenticated
        ? <Link to={ROUTES.PROFILE}>
          <div
            style={{fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0 , 'opsz' 48"}}
          >
            <span
              className="material-symbols-outlined " style={{fontSize: '50px'}}
            >account_circle</span>
          </div>
        </Link>
        : <Link
          to={ROUTES.AUTH} className='button-blue rounded-md py-2 duration-200'
        >Войти</Link>}
    </header>
  );
};

export default Header;