import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./state/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import categoryReducer from "./state/categorySlice";
import totalItemsReducer from "./state/totalItemsSlice";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    totalItems: totalItemsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
