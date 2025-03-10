import { http, HttpResponse } from 'msw';
import { API } from '../src/utils/constants';
import { testItems, testResponse } from './testData';

const handlers = [
  http.get(`${API}`, () => {
    return HttpResponse.json(testResponse);
  }),
  http.get(`${API}*`, () => {
    return HttpResponse.json(testItems[0]);
  }),
];

export { handlers };
