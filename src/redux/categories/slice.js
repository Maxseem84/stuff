import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './asyncActions';

const initialState = {
  list: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.list = [];
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.list = [];
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
