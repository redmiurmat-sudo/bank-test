import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return false;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Приложение успешно инициализировано');
    return true;
  } catch (error) {
    console.error('Ошибка при запуске React:', error);
    return false;
  }
};

// Запуск с проверкой готовности
if (!init()) {
  const observer = new MutationObserver(() => {
    if (init()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}