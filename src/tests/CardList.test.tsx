import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { testItems } from './testData';
import { ERROR_MESSAGE } from '../utils/constants';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import App from '../App';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import NotFound from '../pages/NotFound/NotFound';
import { store } from '../store/store';
import { ThemeProvider } from '../context/themeContext';

describe('Card List Component', () => {
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

  it('Verify that the component renders the specified number of cards', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('card-list')).toBeInTheDocument();
    });

    const cardList = screen.queryAllByTestId('card-item');
    const errorMessage = screen.queryAllByText(ERROR_MESSAGE);

    expect(cardList.length).toBe(testItems.length);
    expect(errorMessage.length).toBe(0);
  });
});
