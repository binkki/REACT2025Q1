import { createSlice } from '@reduxjs/toolkit';
import { AppSlice, CardInfo } from '../../types';
import { SEARCH_KEY } from '../../utils/constants';

const initialState: AppSlice = {
  bookmarks: [],
  params: {
    page: 1,
    searchTerm: localStorage.getItem(SEARCH_KEY) ?? '',
    details: '1',
  },
  error: {
    pageError: undefined,
    detailsError: undefined,
  },
  data: {
    currentPageCards: undefined,
    currentDetails: undefined,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (x: CardInfo) => x.id !== action.payload
      );
    },
    removeAllBookmarks: (state) => {
      state.bookmarks = [];
    },
    setParams: (state, action) => {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setError: (state, action) => {
      state.error = {
        ...state.error,
        ...action.payload,
      };
    },
    setData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  removeAllBookmarks,
  setParams,
  setError,
  setData,
} = appSlice.actions;

export default appSlice.reducer;
