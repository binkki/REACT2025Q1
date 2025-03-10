import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testItems, testResponse } from './testData';
import { setupStore } from '../src/store/store';
import { Provider } from 'react-redux';
import MainPage from '../src/components/MainPage/MainPage';
import { setData } from '../src/store/slices/appSlice';

describe('Main Page', () => {
  it('Renders correct Main Page', async () => {
    const store = setupStore();
    store.dispatch(
      setData({
        currentPageCards: testResponse,
      })
    );
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
    expect(screen.queryAllByTestId('search-input').length).toBe(1);
    expect(screen.queryAllByTestId('search-submit').length).toBe(1);
    expect(screen.queryAllByTestId('theme-checkbox').length).toBe(1);
    expect(screen.queryAllByTestId('card-list').length).toBe(1);
    expect(screen.queryAllByTestId('card-item').length).toBe(testItems.length);
    expect(screen.queryAllByTestId('pagination-container').length).toBe(1);
  });
});
