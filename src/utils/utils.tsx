import { EMPTY_SEARCH } from './constants';

export const getLsValue = (lsKey: string): string =>
  localStorage.getItem(lsKey) ?? EMPTY_SEARCH;

export const setLsValue = (lsKey: string, newValue: string) =>
  localStorage.setItem(lsKey, newValue);
