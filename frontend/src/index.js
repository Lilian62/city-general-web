import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';
import { HelmetProvider } from 'react-helmet-async'; // <-- import HelmetProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* <-- wrap your app with HelmetProvider */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);