import { buildResponse } from "@/lib/api-response";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/auth/users`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        const rest = buildResponse(res);
        return rest;
      },
      providesTags: [tagTypes.users],
    }),
    singleUser: build.query({
      query: (id: string) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.moods],
    }),
  }),
});

export const { useGetUserQuery, useSingleUserQuery, useDeleteUserMutation } =userApi;
