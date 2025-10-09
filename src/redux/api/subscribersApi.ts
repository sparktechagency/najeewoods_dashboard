import { buildResponse } from "@/lib/api-response";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const subscribersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscribers: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/plans/users`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (res: any) => {
        const rest = buildResponse(res);
        return rest;
      },
      providesTags: [tagTypes.users],
    }),
    getPlan: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/plans",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.plans],
    }),
  }),
});

export const { useGetPlanQuery } = subscribersApi;
