import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import App from '../App';
import { testSearchTerm } from './testData';
import { EMPTY_SEARCH, SEARCH_KEY } from '../utils/constants';
import NotFound from '../pages/NotFound/NotFound';

describe('Search Component', () => {
  const renderWithRouter = () => {
    render(
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
    );
  };

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    localStorage.setItem(SEARCH_KEY, EMPTY_SEARCH);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: testSearchTerm } });

    const searchButton = screen.getByTestId('search-submit');
    await userEvent.click(searchButton);

    const newLsValue = localStorage.getItem(SEARCH_KEY);
    expect(newLsValue).toBe(testSearchTerm);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    localStorage.setItem(SEARCH_KEY, testSearchTerm);
    const searchInput = screen.getByTestId('search-input');

    expect(screen.getByDisplayValue(testSearchTerm) === searchInput).toBe(true);
  });
});
