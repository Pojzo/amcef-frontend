import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18 and later
import App from './App'; // Replace with your app component

const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}