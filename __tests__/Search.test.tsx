import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { testSearchTerm } from './testData';
import { Provider } from 'react-redux';
import { setupStore } from '../src/store/store';
import { Search } from '../src/components/Search';
import { EMPTY_SEARCH } from '../src/utils/constants';

describe('Search Component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    expect(store.getState().app.params.searchTerm).toBe(EMPTY_SEARCH);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: testSearchTerm } });

    const searchButton = screen.getByTestId('search-submit');
    await userEvent.click(searchButton);

    expect(store.getState().app.params.searchTerm).toBe(testSearchTerm);
  });
});
