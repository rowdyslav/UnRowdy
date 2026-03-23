import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'
import { configureAppApi } from '@/app/api/configureApi.ts'

configureAppApi()

createRoot(document.getElementById('root')!).render(<App />)
