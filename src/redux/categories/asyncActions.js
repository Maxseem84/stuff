import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './../../utils/constants';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkApi) => {
    try {
      const res = await axios(`${BASE_URL}/categories`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  },
);
