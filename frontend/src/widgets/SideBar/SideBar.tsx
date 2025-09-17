import logo from '../../shared/assets/images/unRowdy-logo.png'
import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";
import {useUIStore} from "@/app/providers/UI/UIStore.ts";

const SideBar = () => {
  const isOpenSideBar = useUIStore(state => state.isOpenSideBar)
  const toggleSideBar = useUIStore(state => state.toggleSideBar)

  return (
    <aside
      className={`border-primary border-r duration-300 flex flex-col ${isOpenSideBar ? 'w-48' : 'w-[100px]'}`}
    >
      <div
        className='border-b border-primary p-2 flex justify-start h-14 relative'
      >
        <img
          src={logo} alt='' width={50} height={50}
          className={`object-contain duration-300 ${!isOpenSideBar ? 'opacity-100' : 'opacity-0'}`}
        />
        <h1
          className={`text-3xl font-bold absolute -translate-x-[80] ${isOpenSideBar ? 'animation-fade-in' : 'opacity-0'}
        `}
        >UnRowdy
        </h1>
        <span
          className='material-symbols-outlined absolute right-1 top-3 cursor-pointer'
          style={{
            fontSize: '30px',
          }}
          onClick={toggleSideBar}
        >
          {isOpenSideBar ? 'left_panel_close' : 'left_panel_open'}</span>
      </div>

      {/* основная часть*/}
      <div className='p-2 flex-col flex justify-end flex-1 overflow-hidden'>
        <LogoutButton
          label={isOpenSideBar ? '' : <span
            className="material-symbols-outlined text-[24px]"
            style={{fontSize: '30px'}}
          >logout</span>}
        />
      </div>
    </aside>
  );
};

export default SideBar;