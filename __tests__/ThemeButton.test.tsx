import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AppTheme } from '../src/types';
import { ThemeButton } from '../src/components/ThemeButton';
import { ThemeProvider } from '../src/context/themeContext';

describe('Theme Button', () => {
  it('Should change page theme on button click', async () => {
    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>
    );

    const themeButton = await waitFor(() => {
      return screen.findByTestId('theme-checkbox');
    });

    const themeDiv = document.body.children[0].children[0];

    expect(themeDiv?.getAttribute('data-theme')).toBe(AppTheme.light);

    await userEvent.click(themeButton);
    expect(themeDiv?.getAttribute('data-theme')).toBe(AppTheme.dark);

    await userEvent.click(themeButton);
    expect(themeDiv?.getAttribute('data-theme')).toBe(AppTheme.light);
  });
});
