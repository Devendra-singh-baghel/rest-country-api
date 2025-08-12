import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountryDetails = createAsyncThunk(
    'countryDetails/fetchCountryDetails',
    async (countryName, { rejectWithValue }) => {
        try {
            const encodedName = encodeURIComponent(countryName);
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${encodedName}?fullText=true`
            );
            return response.data[0];
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch country details');
        }
    }
);


const countryDetailsSlice = createSlice({
    name: 'countryDetails',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountryDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCountryDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default countryDetailsSlice.reducer;
