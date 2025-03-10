import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { getNumberFromString } from '../src/utils/utils';

describe('Utils', () => {
  it('getNumberFromString should return number, or undefined if string cannot be parsed into number or result number less than 1', async () => {
    expect(getNumberFromString('1')).toBe(1);
    expect(getNumberFromString('1000')).toBe(1000);
    expect(getNumberFromString('-5')).toBe(undefined);
    expect(getNumberFromString('not_a_number')).toBe(undefined);
  });
});
