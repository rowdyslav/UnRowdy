import {useThemeStore} from "@/app/providers/theme/themeStore.ts";

const ThemeToggleButton = () => {
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className='p-4 rounded-md bg-blue-500 duration-300 text-white font-medium cursor-pointer hover:scale-101'
    >
      Сменить тему
    </button>
  );
};

export default ThemeToggleButton;