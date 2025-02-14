import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import App from '../App';
import NotFound from '../pages/NotFound/NotFound';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Not Found Page', () => {
  const renderWithRouter = () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invalid_value']}>
          <Routes>
            <Route index element={<Navigate to="/1" />} />
            <Route path=":pageId" element={<App />}>
              <Route path=":detailsId" element={<DetailsPage />} />
            </Route>
            <Route path="error404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/error404" />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('App redirects to Not Found page for unvalid page number in URL', async () => {
    renderWithRouter();
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
});
