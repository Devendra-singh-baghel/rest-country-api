import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import themeReducer from './themeSlice';
import countryDetailsReducer from './countryDetailsSlice';

export const store = configureStore({
    reducer: {
        countries: countriesReducer,
        theme: themeReducer,
        countryDetails: countryDetailsReducer,
    },
});
