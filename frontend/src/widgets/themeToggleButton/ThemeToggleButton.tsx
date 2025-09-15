import {useThemeStore} from "@/app/providers/theme/themeStore.ts";

const ThemeToggleButton = () => {
  const toggleTheme  = useThemeStore(state => state.toggleTheme);

  return (
    <button onClick={toggleTheme} className='button-form'>
      Сменить тему
    </button>
  );
};

export default ThemeToggleButton;