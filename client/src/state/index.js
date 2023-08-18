import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: " " };
const globalSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    chooseCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { chooseCategory } = globalSlice.actions;
export default globalSlice;
