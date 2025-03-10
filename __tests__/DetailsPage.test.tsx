import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { setupStore } from '../src/store/store';
import { Provider } from 'react-redux';
import DetailsPage from '../src/components/DetailsPage/DetailsPage';
import { testItems } from './testData';
import { API_EPISODE } from '../src/utils/constants';
import { setData, setParams } from '../src/store/slices/appSlice';
import userEvent from '@testing-library/user-event';

describe('Details Page', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const store = setupStore();

    store.dispatch(
      setData({
        currentDetails: testItems[0],
      })
    );

    render(
      <Provider store={store}>
        <DetailsPage />
      </Provider>
    );

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
    const store = setupStore();

    store.dispatch(
      setData({
        currentDetails: testItems[0],
      })
    );
    store.dispatch(
      setParams({
        details: testItems[0].id,
      })
    );

    render(
      <Provider store={store}>
        <DetailsPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('details-close');

    expect(store.getState().app.params.details).toBe(testItems[0].id);

    await userEvent.click(closeButton);

    expect(store.getState().app.params.details).toBe(undefined);
  });
});
