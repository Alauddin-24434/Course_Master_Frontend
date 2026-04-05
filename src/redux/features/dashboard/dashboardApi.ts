import baseApi from "@/redux/baseApi/baseApi";
import { IApiResponse } from "@/interfaces/course.interface";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardAnalytics: build.query<IApiResponse<any>, void>({
      query: () => `/dashboard/analytics`,
      providesTags: ["Course"],
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = dashboardApi;
