import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: " ",
  },
  reducers: {
    chooseCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { chooseCategory } = categorySlice.actions;
export default categorySlice.reducer;
