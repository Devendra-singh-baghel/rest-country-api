import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all countries or filter by region
export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async ({ region = 'All', fields }, { rejectWithValue }) => {
    try {
      let url = '';

      if (region !== 'All') {
        // Filter by region
        url = `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}?fields=${fields}`;
      } else {
        // Get all countries
        url = `https://restcountries.com/v3.1/all?fields=${fields}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch countries');
    }
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    data: [],       // Fetched data from API
    filtered: [],   // Search-based filtered data
    loading: false,
    error: null,
  },
  reducers: {
    searchCountries: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filtered = state.data.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
      );
    },
    resetSearch: (state) => {
      state.filtered = state.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filtered = action.payload; // initially filtered = all data
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { searchCountries, resetSearch } = countriesSlice.actions;
export default countriesSlice.reducer;
