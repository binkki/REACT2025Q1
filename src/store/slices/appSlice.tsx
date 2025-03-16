import { createSlice } from '@reduxjs/toolkit';
import { contriesList } from '../../utils/constants';
import { AppSliceType } from '../../types';

const initialState: AppSliceType = {
  countries: contriesList,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default appSlice.reducer;
