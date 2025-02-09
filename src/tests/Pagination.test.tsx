import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import App from '../App';
import { testPageNumber } from './testData';
import NotFound from '../pages/NotFound/NotFound';

describe('Pagination Component', () => {
  const routes = [
    {
      path: '/',
      element: <Navigate to="/1" />,
    },
    {
      path: ':pageId',
      element: <App />,
      children: [
        {
          path: ':detailsId',
          element: <DetailsPage />,
        },
      ],
    },
    {
      path: 'error404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <Navigate to="/error404" />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/1'],
    initialIndex: 0,
  });

  it('Make sure the component updates URL query parameter when page changes', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    });

    expect(router.state.location.pathname).toBe('/1');

    const pageButton = screen.getAllByTestId(
      `pagination-page-${testPageNumber}`
    );

    expect(pageButton.length).toBe(1);

    await userEvent.click(pageButton[0]);

    expect(router.state.location.pathname).toBe(`/${testPageNumber}`);
  });
});
