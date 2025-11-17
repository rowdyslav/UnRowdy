import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {init, miniApp} from '@telegram-apps/sdk';

const initializeTelegramSDK = async () => {
  try {
    await init();
    await miniApp.ready()

    console.log('Mini App готово');
  } catch (error) {
    console.error('Ошибка инициализации Telegram SDK:', error);
  }
};

const runApp = async () => {
  await initializeTelegramSDK();
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Корневой элемент #root не найден');

  createRoot(rootElement).render(<App/>);
};

runApp();
