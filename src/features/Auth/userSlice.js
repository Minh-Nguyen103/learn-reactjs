import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageKeys from 'constants/storage-keys';
import userApi from '../../api/userApi';

export const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { reducer } = userSlice;

export default reducer; //default export
