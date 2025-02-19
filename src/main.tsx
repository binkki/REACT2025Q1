import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import NotFound from './pages/NotFound/NotFound.tsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.tsx';
import { store } from './store/store.tsx';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/themeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/1" />} />
            <Route path=":pageId" element={<App />}>
              <Route path=":detailsId" element={<DetailsPage />} />
            </Route>
            <Route path="error404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/error404" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  </Provider>
);
