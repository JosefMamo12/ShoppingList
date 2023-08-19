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
  },
});

export const { incrementTotalItems } = totalItemsSlice.actions;
export default totalItemsSlice.reducer;
