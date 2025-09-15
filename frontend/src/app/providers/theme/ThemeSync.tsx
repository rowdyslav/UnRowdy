import {useEffect} from 'react';
import {useThemeStore} from './themeStore';
import {setThemeDom} from './themeStore';

// Компонент для синхронизации темы при загрузке приложения
export const ThemeSync = () => {
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    setThemeDom(theme);
  }, [theme]);

  return null;
};