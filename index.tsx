import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('DOM готов, инициализация React...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Критическая ошибка: элемент #root не найден в DOM.');
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React успешно запущен и отрисован.');
  } catch (err) {
    console.error('Сбой при запуске React:', err);
    rootElement.innerHTML = `
      <div style="color: #ef4444; padding: 20px; text-align: center;">
        <h3 style="margin-bottom: 8px;">Ошибка React</h3>
        <p style="font-size: 12px; opacity: 0.8;">${err instanceof Error ? err.message : String(err)}</p>
      </div>
    `;
  }
}