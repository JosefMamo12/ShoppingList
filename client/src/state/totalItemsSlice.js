import { createSlice } from "@reduxjs/toolkit";

export const totalItemsSlice = createSlice({
  name: "totalItems",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementTotalItems: (state) => {
      state.value += 1;
    },
    firstInitialize: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { incrementTotalItems, firstInitialize } = totalItemsSlice.actions;
export default totalItemsSlice.reducer;
