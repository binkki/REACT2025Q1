import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import App from '../App';
import { testItems } from './testData';
import { API_EPISODE } from '../utils/constants';
import NotFound from '../pages/NotFound/NotFound';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/themeContext';

describe('Details Page', () => {
  const renderWithRouter = () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/1/1']}>
            <Routes>
              <Route index element={<Navigate to="/1" />} />
              <Route path=":pageId" element={<App />}>
                <Route path=":detailsId" element={<DetailsPage />} />
              </Route>
              <Route path="error404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/error404" />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('Check that a loading indicator is displayed while fetching data', async () => {
    vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(testItems[0]),
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });

    expect(screen.getAllByText(`Name: ${testItems[0].name}`).length).toBe(1);
    expect(screen.getAllByText(`Gender: ${testItems[0].gender}`).length).toBe(
      1
    );
    expect(screen.getAllByText(`Species: ${testItems[0].species}`).length).toBe(
      1
    );
    expect(screen.getAllByText(`Status: ${testItems[0].status}`).length).toBe(
      1
    );
    if (testItems[0].type)
      expect(screen.getAllByText(`Type: ${testItems[0].type}`).length).toBe(1);
    expect(
      screen.getAllByText(`Origin: ${testItems[0].origin.name}`).length
    ).toBe(1);
    expect(
      screen.getAllByText(`Last known location: ${testItems[0].location.name}`)
        .length
    ).toBe(1);
    expect(
      screen.getAllByText(
        `First seen in ${testItems[0].episode[0].replace(API_EPISODE, '')} episode`
      ).length
    ).toBe(1);
    expect(screen.getByTestId('details-image')).toHaveAttribute(
      'src',
      testItems[0].image
    );
  });

  it('Ensure that clicking the close button hides the component.', async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });

    const closeButton = screen.getAllByTestId('details-close')[0];

    await userEvent.click(closeButton);

    expect(screen.queryAllByTestId('details').length).toBe(0);
  });
});
