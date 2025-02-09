import { expect, afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import { handlers } from './server-handlers';

expect.extend(matchers);

const server = setupServer(...handlers);

beforeEach(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
