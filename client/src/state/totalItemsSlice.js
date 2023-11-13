import { createSlice } from "@reduxjs/toolkit";
import { useGetTotalItemsQuery } from "./api";


export const totalItemsSlice = createSlice({
  name: "totalItems",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementTotalItems: (state) => {
      state.value += 1;
    },
    decrementTotalItems: (state) => {
      state.value -= 1;
    },
    restartSignal: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementTotalItems, restartSignal, decrementTotalItems } =
  totalItemsSlice.actions;
export default totalItemsSlice.reducer;
