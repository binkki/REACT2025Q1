import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { testPageNumber, testResponse } from './testData';
import { setupStore } from '../src/store/store';
import { setData } from '../src/store/slices/appSlice';
import { Pagination } from '../src/components/Pagination';
import { Provider } from 'react-redux';

describe('Pagination Component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    const store = setupStore();

    store.dispatch(
      setData({
        currentPageCards: testResponse,
      })
    );

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    });

    const pageButton = screen.getAllByTestId(
      `pagination-page-${testPageNumber}`
    );

    expect(pageButton.length).toBe(1);

    expect(store.getState().app.params.page).toBe(1);

    await userEvent.click(pageButton[0]);

    expect(store.getState().app.params.page.toString()).toBe(testPageNumber);
  });
});
