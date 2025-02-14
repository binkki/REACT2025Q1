import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import App from '../App';
import { testItems } from './testData';
import NotFound from '../pages/NotFound/NotFound';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Card Component', () => {
  const renderWithRouter = () => {
    render(
      <Provider store={store}>
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
      </Provider>
    );
  };

  it('Ensure that the card component renders the relevant card data', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('card-list')).toBeInTheDocument();
    });

    for (let i = 0; i < testItems.length; i += 1) {
      expect(
        screen.getByTestId(`item-image-${testItems[i].id}`)
      ).toHaveAttribute('src', testItems[i].image);
      expect(screen.getByTestId(`item-name-${testItems[i].id}`).innerHTML).toBe(
        testItems[i].name
      );
    }
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('card-list')).toBeInTheDocument();
    });

    const cardList = screen.queryAllByTestId('card-item');

    await userEvent.click(cardList[0].children[0]);

    expect(screen.getAllByTestId('details').length).toBe(1);
  });
});
