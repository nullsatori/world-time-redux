import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CitiesState {
  cities: string[];
  searchTerm: string;
  suggestions: string[];
}

const initialState: CitiesState = {
  cities: [],
  searchTerm: "",
  suggestions: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
  },
});

export const { setCities, setSearchTerm, setSuggestions } = citiesSlice.actions;
export default citiesSlice.reducer;
