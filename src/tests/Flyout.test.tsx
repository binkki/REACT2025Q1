import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router';
import App from '../App';
import NotFound from '../pages/NotFound/NotFound';

describe('Flyout Component', () => {
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

  it('Should render flyout component if character was bookmarked', async () => {
    renderWithRouter();

    const bookmarks = await waitFor(
      () => {
        return screen.findAllByTestId('bookmark');
      },
      {
        timeout: 50000,
      }
    );

    await act(async () => {
      await userEvent.click(bookmarks[0]);
    });

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(bookmarks[0]);
    });
  });

  it('Should remove flyout if nothing was bookmarked', async () => {
    renderWithRouter();
    const bookmarks = await waitFor(
      () => {
        return screen.findAllByTestId('bookmark');
      },
      {
        timeout: 50000,
      }
    );
    await act(async () => {
      await userEvent.click(bookmarks[0]);
    });

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(bookmarks[0]);
    });

    expect(flyout).not.toBeInTheDocument();
  });

  it('Should remove flyout if unselect all button was clicked', async () => {
    renderWithRouter();
    const bookmarks = await waitFor(
      () => {
        return screen.findAllByTestId('bookmark');
      },
      {
        timeout: 50000,
      }
    );
    await act(async () => {
      await userEvent.click(bookmarks[0]);
    });

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();

    const unselectButton = screen.getByTestId('flyout-unselect');

    await act(async () => {
      await userEvent.click(unselectButton);
    });

    expect(flyout).not.toBeInTheDocument();
  });
});
