import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('Приложение запускается...');

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React успешно отрендерен');
  } catch (error) {
    console.error('Ошибка при рендеринге React:', error);
    rootElement.innerHTML = `<div style="color: white; padding: 20px;">Ошибка запуска: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}</div>`;
  }
} else {
  console.error('Элемент #root не найден');
}