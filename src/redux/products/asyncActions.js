import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkApi) => {
  try {
    const res = await axios(`${BASE_URL}/products`);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});
