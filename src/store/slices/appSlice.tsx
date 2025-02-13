import { createSlice } from '@reduxjs/toolkit';
import { AppSlice, CardInfo } from '../../types';

const initialState: AppSlice = {
  bookmarks: [],
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
  },
});

export const { addBookmark, removeBookmark, removeAllBookmarks } =
  appSlice.actions;

export default appSlice.reducer;
