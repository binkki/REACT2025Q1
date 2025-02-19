import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import App from '../App';
import NotFound from '../pages/NotFound/NotFound';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { THEME_KEY } from '../utils/constants';
import { AppTheme } from '../types';
import { ThemeProvider } from '../context/themeContext';

describe('Theme Button', () => {
  const renderWithRouter = () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/1']}>
            <Routes>
              <Route index element={<Navigate to="/1" />} />
              <Route path=":pageId" element={<App />}>
                <Route path=":detailsId" element={<DetailsPage />} />
              </Route>
              <Route path="error404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/error404" />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('Should change page theme on button click', async () => {
    renderWithRouter();

    const themeButton = await waitFor(() => {
      return screen.findByTestId('theme-checkbox');
    });

    await userEvent.click(themeButton);
    expect(localStorage.getItem(THEME_KEY)).toBe(AppTheme.dark);

    await userEvent.click(themeButton);
    expect(localStorage.getItem(THEME_KEY)).toBe(AppTheme.light);
  });
});
