import { OpenAPI } from 'generated';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// TODO: Update with env
OpenAPI.BASE = 'http://localhost:8080';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
