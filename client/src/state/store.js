import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import totalItemsReducer from "./totalItemsSlice";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { storage } from "redux-persist/lib/storage";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    totalItems: totalItemsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);
