import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  querySearch: string;
}

const initialState: uiState = {
  querySearch: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setQuerySearch: (state, action: PayloadAction<string>) => {
      state.querySearch = action.payload;
    },
    resetQuerySearch: (state) => {
      state.querySearch = initialState.querySearch;
    },
  },
});

export const { resetQuerySearch, setQuerySearch } = uiSlice.actions;
