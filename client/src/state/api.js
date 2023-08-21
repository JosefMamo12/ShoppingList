import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_LOCALHOST }),
  reducerPath: "adminApi",
  tagTypes: [
    "Categories",
    "AddItem",
    "getItems",
    "getTotalItems",
    "AddItemUsingIcon",
    "removeItemUsingIcon",
  ],
  endpoints: (build) => ({
    getCategory: build.query({
      query: () => ({
        url: "client/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    addItem: build.mutation({
      query: (item) => ({
        url: `client/addItem`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["AddItem"],
    }),
    addItemUsingIcon: build.mutation({
      query: (item) => ({
        url: `client/addItemIcon`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["AddItemUsingIcon"],
    }),
    RemoveItemUsingIcon: build.mutation({
      query: (item) => ({
        url: `client/removeItemIcon`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["RemoveItemUsingIcon"],
    }),
    getItems: build.query({
      query: () => ({
        url: "client/getItems",
        method: "GET",
      }),
      providesTags: ["getItems"],
    }),
    getTotalItems: build.query({
      query: () => ({
        url: "client/getTotalItems",
        method: "GET",
      }),
      providesTags: ["getTotalItems"],
    }),
  }),
});
export const {
  useGetCategoryQuery,
  useAddItemMutation,
  useGetItemsQuery,
  useGetTotalItemsQuery,
  useAddItemUsingIconMutation,
  useRemoveItemUsingIconMutation,
} = api;
