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
      providesTags: [tagTypes.moods],
      //   transformResponse: (res: any) => {
      //     return buildResponse(res?.data.videos);
      //   },
    }),
    storeMoods: build.mutation({
      query: (data) => {
        return {
          url: "/moods",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (res: any) => {
        console.log(res);
        return res;
      },
      invalidatesTags: [tagTypes.moods],
    }),
    updateMoods: build.mutation({
      query: ({ id, data }) => ({
        url: `/moods/about-us/${id}`,
        method: "POST",
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
