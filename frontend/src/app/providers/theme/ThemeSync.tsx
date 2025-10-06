import { useEffect } from 'react'
import { setThemeDom, useThemeStore } from './themeStore' // Компонент для синхронизации темы при загрузке приложения

// Компонент для синхронизации темы при загрузке приложения
export const ThemeSync = () => {
  const theme = useThemeStore(state => state.theme)

  useEffect(() => {
    setThemeDom(theme)
  }, [theme])

  return null
}
