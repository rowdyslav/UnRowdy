import {useState} from "react";
import logo from './assets/UnRowdy-logo.png'
import LogoutButton
  from "@/features/auth/components/LogoutButton/LogoutButton.tsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <aside className={`border-primary border-r duration-300 flex flex-col ${isOpen ? 'w-48' : 'w-[100px]'}`}>
      <div className='border-b border-primary p-2 flex justify-start h-14 relative'>
        <img src={logo} alt='' width={50} height={50} className={`object-contain duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0'}`}/>
        <h1 className={`text-3xl font-bold absolute ${isOpen ? 'animation-fade-in' : 'animation-fade-out'}
        `}>UnRowdy</h1>
        <span
          className='material-symbols-outlined absolute right-1 top-3 cursor-pointer' style={{
          fontSize: '30px',
        }}
          onClick={() => {setIsOpen(!isOpen)}}
        >
          {isOpen ? 'left_panel_close' : 'left_panel_open'}</span>
      </div>

      {/* основная часть*/}
      <div className='p-2 flex-col flex justify-end flex-1 overflow-hidden'>
        <LogoutButton label={isOpen ? '' : <span className="material-symbols-outlined">logout</span>}/>
      </div>
    </aside>
  );
};

export default Sidebar;