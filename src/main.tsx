import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

const partyId = rootElement.getAttribute('data-party');

createRoot(rootElement).render(
  <StrictMode>
    <App partyId={partyId === 'main' ? null : partyId} />
  </StrictMode>
);