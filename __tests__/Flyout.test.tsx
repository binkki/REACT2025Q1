import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from '../src/store/store';
import { testItems } from './testData';
import { addBookmark } from '../src/store/slices/appSlice';
import { Flyout } from '../src/components/Flyout';

describe('Flyout Component', () => {
  it('Should render flyout component if character was bookmarked', async () => {
    const store = setupStore();
    store.dispatch(addBookmark(testItems[0]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });

  it('Should remove flyout if nothing was bookmarked', async () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryAllByTestId('flyout').length).toBe(0);
  });

  it('Should remove flyout if unselect all button was clicked', async () => {
    const store = setupStore();
    store.dispatch(addBookmark(testItems[0]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();

    const unselectButton = screen.getByTestId('flyout-unselect');
    await userEvent.click(unselectButton);

    expect(flyout).not.toBeInTheDocument();
  });

  it('Should generate csv file with number of selected items if download button was clicked', async () => {
    URL.createObjectURL = vi.fn(() => 'https:/pdf.com');
    const spyClick = vi.fn();
    HTMLAnchorElement.prototype.click = vi.fn(() => spyClick());

    const store = setupStore();
    store.dispatch(addBookmark(testItems[0]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();

    const downloadButton = screen.getByTestId('flyout-download');
    const flyoutLink = screen.getByTestId('flyout-link');

    await userEvent.click(downloadButton);
    expect(flyoutLink).toHaveAttribute('download', '1_character.csv');
    expect(spyClick).toHaveBeenCalledTimes(1);

    vi.resetAllMocks();
  });
});
