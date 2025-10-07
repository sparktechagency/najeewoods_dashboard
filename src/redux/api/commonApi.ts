import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";
export const commonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // getStates: build.query({
    //   query: (arg?: Record<string, any>) => ({
    //     url: "/states",
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.states],
    //   transformResponse: (res: any) => {
    //     return res?.data;
    //   },
    // }),
    // getCities: build.query({
    //   query: (id: string) => ({
    //     url: `/cities/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.cities],
    //   transformResponse: (res: any) => {
    //     return res?.data;
    //   },
    // }),
    // golbalSearch: build.query({
    //   query: (arg?: Record<string, any>) => ({
    //     url: `/global-search-videos`,
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.cities],
    //   transformResponse: (res: any) => {
    //     return buildResponse(res?.data.videos);
    //   },
    // }),
  }),
});

export const {} = commonApi;
