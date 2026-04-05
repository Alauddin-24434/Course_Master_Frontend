import baseApi from "../../baseApi/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    createReview: builder.mutation({
      query: (data: any) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
