import { ApiResponse, CardInfo } from '../../src/types';
import { API, EMPTY_SEARCH } from '../../src/utils/constants';

export const getCards = async (
  page: string | undefined,
  searchTerm: string | undefined
): Promise<ApiResponse> => {
  const url = `${API}?page=${page ?? 1}&name=${searchTerm ?? EMPTY_SEARCH}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return await response.json();
};

export const getDetails = async (detailsId: string): Promise<CardInfo> => {
  const url = `${API}/${detailsId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return await response.json();
};
