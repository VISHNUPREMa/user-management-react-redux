

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Thunk for admin login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/admin', { username, password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));

        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Admin login failed');
    }
  }
);



const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      admin: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginAdmin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginAdmin.fulfilled, (state, action) => {
          state.loading = false;
          state.admin = action.payload.admin;
          toast.success("Admin login successful");
        })
        .addCase(loginAdmin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload, { duration: 1500 });
        });
    },
  });
  
  export default adminSlice.reducer;
  