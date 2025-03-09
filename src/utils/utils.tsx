import { CardInfo } from '../types';
import { CSV_HEADER } from './constants';

export const getNumberFromString = (
  value: string | string[] | undefined
): number | undefined => {
  const parsedValue = Number(value);
  return !isNaN(parsedValue) && !isFloatNumber(parsedValue) && parsedValue > 0
    ? parsedValue
    : undefined;
};

const isFloatNumber = (value: number): boolean => value % 1 !== 0;

export const generateCSVfromArray = (data: CardInfo[]): string =>
  CSV_HEADER +
  data
    .map(
      (x: CardInfo) =>
        `${x.name}, ${x.status}, ${x.species}, ${x.gender}, ${x.origin.name}, ${x.url}\n`
    )
    .reduce((result, current) => result + current, '');
