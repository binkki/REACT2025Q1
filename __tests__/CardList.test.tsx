import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { testItems, testResponse } from './testData';
import { Provider } from 'react-redux';
import { setupStore } from '../src/store/store';
import { CardList } from '../src/components/CardList';
import { setData } from '../src/store/slices/appSlice';
import { ERROR_MESSAGE } from '../src/utils/constants';

describe('Card List Component', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.queryAllByTestId('card-item').length).toBe(0);
    expect(screen.queryAllByText(ERROR_MESSAGE).length).toBe(1);

    cleanup();

    store.dispatch(
      setData({
        currentPageCards: testResponse,
      })
    );

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.queryAllByTestId('card-item').length).toBe(testItems.length);
    expect(screen.queryAllByText(ERROR_MESSAGE).length).toBe(0);
  });
});
