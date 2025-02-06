import { useState, useEffect } from 'react';
import { EMPTY_SEARCH, SEARCH_KEY } from '../utils/constants';

export function useLocalStorage() {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem(SEARCH_KEY) ?? ''
  );

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, searchValue);
  }, [searchValue]);

  const getSearchValue = (): string =>
    localStorage.getItem(SEARCH_KEY) ?? EMPTY_SEARCH;

  return { setSearchValue, getSearchValue };
}
