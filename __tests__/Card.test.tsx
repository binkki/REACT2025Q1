import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { testItems } from './testData';
import { Provider } from 'react-redux';
import { setupStore } from '../src/store/store';
import { Card } from '../src/components/Card';
import userEvent from '@testing-library/user-event';

describe('Card Component', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <Card cardInfo={testItems[0]} />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId(`item-image-${testItems[0].id}`)
      ).toBeInTheDocument();
    });

    expect(screen.getByTestId(`item-image-${testItems[0].id}`)).toHaveAttribute(
      'src',
      testItems[0].image
    );
    expect(screen.getByTestId(`item-name-${testItems[0].id}`).innerHTML).toBe(
      testItems[0].name
    );
    expect(screen.getByTestId(`bookmark`)).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <Card cardInfo={testItems[0]} />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId(`item-image-${testItems[0].id}`)
      ).toBeInTheDocument();
    });

    expect(store.getState().app.params.details).toBe(undefined);

    const card = screen.getAllByTestId(`item-image-${testItems[0].id}`)[0]
      .parentElement;

    expect(card).not.toBe(null);

    await userEvent.click(card!);

    expect(store.getState().app.params.details).toBe(testItems[0].id);
  });
});
