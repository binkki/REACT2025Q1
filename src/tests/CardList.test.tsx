import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testItems } from './testData';
import { ERROR_MESSAGE } from '../utils/constants';

import CardList from '../components/CardList/CardList';
import { MemoryRouter } from 'react-router';

describe('Card List Component', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <MemoryRouter>
        <CardList cards={testItems} />
      </MemoryRouter>
    );

    const cardList = screen.queryAllByTestId('card-item');
    const errorMessage = screen.queryAllByText(ERROR_MESSAGE);

    expect(cardList.length).toBe(testItems.length);
    expect(errorMessage.length).toBe(0);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(<CardList cards={[]} />);

    const cardList = screen.queryAllByTestId('card-item');
    const errorMessage = screen.queryAllByText(ERROR_MESSAGE);

    expect(cardList.length).toBe(0);
    expect(errorMessage.length).toBe(1);
  });
});
