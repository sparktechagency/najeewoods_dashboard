import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";
import { buildResponse } from "@/lib";
export const commonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/posts",
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        const rest = buildResponse(res);
        return rest;
      },
      providesTags: [tagTypes.post],
    }),
    storePost: build.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.post],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.post],
    }),
  }),
});

export const { useGetPostQuery, useStorePostMutation, useDeletePostMutation } =
  commonApi;
