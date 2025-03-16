import { createSlice } from '@reduxjs/toolkit';
import { contriesList } from '../../utils/constants';
import { AppSliceType } from '../../types';

const initialState: AppSliceType = {
  countries: contriesList,
  uncontrolledResults: [],
  controlledResults: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUncontrolledResult(state, action) {
      state.uncontrolledResults.push(action.payload);
    },
    addControlledResult(state, action) {
      state.controlledResults.push(action.payload);
    },
  },
});

export const { addUncontrolledResult, addControlledResult } = appSlice.actions;
export default appSlice.reducer;
