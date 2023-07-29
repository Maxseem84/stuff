import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';

export const createUser = createAsyncThunk('user/createUser', async (payload, thunkApi) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (payload, thunkApi) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, payload);
    const login = await axios(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${res.data.access_token}`,
      },
    });
    return login.data;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (payload, thunkApi) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});
