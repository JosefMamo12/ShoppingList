import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  reducerPath: "adminApi",
  tagTypes: ["Categories", "AddItem", "getItems"],
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
    getItems: build.query({
      query: () => ({
        url: "client/getItems",
        method: "GET",
      }),
      providesTags: ["getItems"],
    }),
  }),
});
export const { useGetCategoryQuery, useAddItemMutation, useGetItemsQuery } =
  api;
