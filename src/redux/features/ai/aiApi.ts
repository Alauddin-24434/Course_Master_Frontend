import baseApi from "@/redux/baseApi/baseApi";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query({
      query: () => ({
        url: "/ai/recommendations",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    searchAi: builder.query({
      query: (searchTerm) => ({
        url: `/ai/search?query=${searchTerm}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRecommendationsQuery, useLazySearchAiQuery } = aiApi;
