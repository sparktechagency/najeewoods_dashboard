import { buildResponse } from "@/lib/api-response";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const moodsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMoods: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/moods`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        const rest = buildResponse(res);
        return rest;
      },
      providesTags: [tagTypes.moods],
    }),
    storeMoods: build.mutation({
      query: (data) => ({
        url: "/moods",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.moods],
    }),
    updateMoods: build.mutation({
      query: ({ id, data }) => ({
        url: `/moods/${id}`,
        method: "PATCH",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.moods],
    }),
    deleteMoods: build.mutation({
      query: (id) => ({
        url: `/moods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.moods],
    }),
  }),
});

export const {
  useGetMoodsQuery,
  useStoreMoodsMutation,
  useUpdateMoodsMutation,
  useDeleteMoodsMutation,
} = moodsApi;
