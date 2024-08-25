import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Pastikan elemen dengan ID 'root' ada di index.html
const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

