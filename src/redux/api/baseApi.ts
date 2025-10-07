import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { authKey, helpers } from "@/lib";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { arg }) => {
      const token = helpers.getAuthCookie(authKey);

      // Check if the request body is FormData and set the Content-Type accordingly
      if (arg instanceof FormData) {
        headers.set("Content-Type", "multipart/form-data");
      } else {
        headers.set("Content-Type", "application/json");
      }

      // Add authorization token if available
      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
