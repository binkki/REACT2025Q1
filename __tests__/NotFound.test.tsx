import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../src/components/NotFound/NotFound';

describe('Not Found Page', () => {
  it('Renders Not Found page', async () => {
    render(<NotFound />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
});
