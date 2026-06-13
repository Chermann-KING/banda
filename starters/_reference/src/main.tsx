import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import '@banda/tokens/css';
import '@banda/tokens/base.css';
import { App } from './app/App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Élément #root introuvable dans index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
