import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import NotFound from './pages/NotFound/NotFound.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/1" />} />
        <Route path=":pageId?" element={<App />} />
        <Route path="error404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/error404" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
