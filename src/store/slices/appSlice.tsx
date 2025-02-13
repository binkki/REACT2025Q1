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
  },
});

export const { addBookmark, removeBookmark } = appSlice.actions;

export default appSlice.reducer;
